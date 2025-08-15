import { HttpRequest, HttpHandlerFn, HttpEvent, HttpErrorResponse, HttpResponse } from '@ngify/http'

import { catchError, mergeMap, Observable, of, throwError } from 'rxjs'
import { HASH_ROUTES_PROVIDER } from '../pages/Routes'
import { environment } from '../../environments/environment'
import { Message } from '@arco-design/web-react'

export function ErrorInterceptor(
    req: HttpRequest<unknown>,
    next: HttpHandlerFn
): Observable<HttpEvent<unknown>> {
    return next(req).pipe(
        mergeMap((event) => {
            if (event instanceof HttpResponse) {
                // 检查是否为blob响应类型，如果是则跳过业务逻辑检查
                const contentType = event.headers.get('content-type') || ''
                const isBlob =
                    contentType.includes('application/octet-stream') ||
                    contentType.includes('application/pdf') ||
                    contentType.includes('image/') ||
                    contentType.includes('video/') ||
                    contentType.includes('audio/') ||
                    event.body instanceof Blob ||
                    event.body instanceof ArrayBuffer

                // 如果是blob类型响应，只检查HTTP状态码
                if (isBlob) {
                    if (event.status !== 200) {
                        return throwError(() => event)
                    }
                    return of(event)
                }

                // 对于非blob响应，进行原有的业务逻辑检查
                try {
                    //@ts-ignore
                    if (!event.body.success) {
                        let body = event.body
                        if (typeof body === 'string') {
                            body = JSON.parse(body)
                        }

                        //@ts-ignore
                        Message.error(event.body.errDetail)

                        //@ts-ignore
                        if (body.errCode === '401') {
                            if (environment.type === 'prod') {
                                HASH_ROUTES_PROVIDER.navigate('/login', {
                                    replace: true
                                })
                            } else {
                                HASH_ROUTES_PROVIDER.navigate('/authentication', {
                                    replace: true
                                })
                            }
                        }

                        if (
                            // @ts-ignore
                            body.errCode &&
                            // @ts-ignore
                            body.errCode === '401'
                        ) {
                        }
                        return throwError(() => event)
                    }
                } catch (error) {
                    // 如果无法解析响应体（可能是二进制数据），则跳过业务逻辑检查
                    console.warn('无法解析响应体，可能是二进制数据:', error)
                }

                if (event.status !== 200) {
                    return throwError(() => event)
                }
            }
            return of(event)
        }),
        catchError((err: HttpErrorResponse) => {
            if (err.error && err.error.status !== 200) {
                switch (err.error.status) {
                    case 401:
                    // Toast.show({
                    //     icon: 'fail',
                    //     content: 'token过期或者暂无访问权限'
                    // })

                    default:
                    // Toast.show({
                    //     icon: 'fail',
                    //     content: '出错了'
                    // })
                }
            }

            return throwError(() => err)
        })
    )
}
