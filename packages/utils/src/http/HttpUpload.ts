import { HttpEventType } from '@ngify/http'
import { useHttp } from './HttpContext'
import { Observable, Subscription } from 'rxjs'

/**
 * @property `source` - DOMString containing a URL representing the object given in the parameter
 */
export type UploadFile<T = any> = {
    source: string
    name: string
    size: number
    file: File
    uploadFile?: T
    id: string
    status?: FileUploadStatus
    progress?: number
}

export interface FileUploadState {
    progress: number
    /**
     * rest time in s
     */
    restTime: number
    /**
     * upload speed in Byte/s
     */
    speed: number
}

export type FileUploadStatus = 'pending' | 'uploading' | 'processing' | 'success' | 'done' | 'error'

export type FileProcessStatus = 'pending' | 'chunking' | 'embedding' | 'success' | 'error'

export type OnProgress = (status: FileUploadStatus, state: FileUploadState) => void

export const createHttpUpload = () => {
    const http = useHttp()
    const uploadWithProgress = <T>(
        url: string,
        file: UploadFile,
        onProgress?: OnProgress,
        params?: Record<string, any>
    ) => {
        let startTime = Date.now()

        const formData = new FormData()
        formData.append('file', file.file)
        if (params) {
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key])
            })
        }

        return new Observable<T>((observer) => {
            http
                ?.post(url, formData, {
                    reportProgress: true,
                    observe: 'events'
                })
                .subscribe(
                    (event) => {
                        switch (event.type) {
                            case HttpEventType.UploadProgress:
                                const progress = Number(
                                    ((event.loaded / (event?.total || 0)) * 100).toFixed(1)
                                )

                                const speedInByte = event.loaded / ((Date.now() - startTime) / 1000)
                                onProgress?.('uploading', {
                                    // if the progress is 100, it means the file is uploaded
                                    // but the server is still processing it
                                    // so make it as 99.9 and let users think it's still uploading
                                    progress: progress === 100 ? 99.9 : progress,
                                    restTime: ((event.total || 0) - event.loaded) / speedInByte,
                                    speed: progress === 100 ? 0 : speedInByte
                                })
                                // observer.next(event);
                                break
                            case HttpEventType.Response:
                                onProgress?.('success', {
                                    progress: 100,
                                    restTime: 0,
                                    speed: file.size / ((Date.now() - startTime) / 1000)
                                })
                                observer.next(event.body)
                                observer.complete()
                                // console.log("Finished uploading!");
                                break
                        }
                    },
                    (error) => {
                        onProgress?.('error', {
                            progress: 0,
                            restTime: 0,
                            speed: 0
                        })
                        observer.error(error)
                        observer.complete()
                    }
                )
        })
    }
    return {
        uploadWithProgress
    }
}

export const createHttpUploadPromise = () => {
    const http = useHttp()

    const uploadWithProgress = <T>(
        url: string,
        file: UploadFile,
        onProgress?: OnProgress,
        params?: Record<string, any>
    ) => {
        let startTime = Date.now()
        const formData = new FormData()
        formData.append('file', file.file)
        if (params) {
            Object.keys(params).forEach((key) => {
                formData.append(key, params[key])
            })
        }

        // 返回一个包含 promise 和 cancel 方法的对象
        const subscription = new Subscription()

        const promise = new Promise<T>((resolve, reject) => {
            const sub = http
                ?.post(url, formData, {
                    reportProgress: true,
                    observe: 'events'
                })
                .subscribe({
                    next: (event) => {
                        switch (event.type) {
                            case HttpEventType.UploadProgress:
                                const progress = Number(
                                    ((event.loaded / (event?.total || 0)) * 100).toFixed(1)
                                )

                                const speedInByte = event.loaded / ((Date.now() - startTime) / 1000)
                                onProgress?.('uploading', {
                                    // if the progress is 100, it means the file is uploaded
                                    // but the server is still processing it
                                    // so make it as 99.9 and let users think it's still uploading
                                    progress: progress === 100 ? 99.9 : progress,
                                    restTime: ((event.total || 0) - event.loaded) / speedInByte,
                                    speed: progress === 100 ? 0 : speedInByte
                                })
                                // observer.next(event);
                                break
                            case HttpEventType.Response:
                                onProgress?.('success', {
                                    progress: 100,
                                    restTime: 0,
                                    speed: file.size / ((Date.now() - startTime) / 1000)
                                })
                                resolve(event.body)
                                // console.log("Finished uploading!");
                                break
                        }
                    },
                    error: (error) => {
                        onProgress?.('error', {
                            progress: 0,
                            restTime: 0,
                            speed: 0
                        })
                        reject(error)
                    }
                    // complete: () => {
                    //   resolve(event.body);
                    // }
                })

            subscription.add(sub)
        })

        return {
            promise,
            cancel: () => subscription.unsubscribe()
        }
    }

    return {
        uploadWithProgress
    }
}
