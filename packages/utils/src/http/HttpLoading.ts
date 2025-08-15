import { useState } from 'react'
import { catchError, finalize, Observable, throwError } from 'rxjs'

export const HttpLoading = () => {
    const [loading, setLoading] = useState(false)

    const loadingOperator = <T>(source: Observable<T>): Observable<T> => {
        setLoading(true)
        return source.pipe(
            catchError((err) => {
                setLoading(false)
                return throwError(() => err)
            }),
            finalize(() => setLoading(false))
        )
    }

    return {
        loading,
        setLoading,
        loadingOperator
    }
}
