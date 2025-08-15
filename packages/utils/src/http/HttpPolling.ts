import {
  delay,
  expand,
  filter,
  from,
  Observable,
  Subscriber,
  take,
  takeWhile,
} from "rxjs";

interface RetryOptions<T = any> {
  try: Observable<T>;
  retryUntil: (response: T, index?: number) => boolean;
  maxTimes?: number;
  tick?: number;
}

export const HTTP_POLLING_INFINITE = -1;

/**轮询请求 */
export const HttpPolling = <T = any>(options: RetryOptions<T>) => {
  options = Object.assign(
    {
      maxTimes: 20,
      tick: 1000,
    },
    options
  );
  let count = 0;
  const request$ = new Observable((subscriber: Subscriber<T>) => {
    if (
      options.maxTimes !== HTTP_POLLING_INFINITE &&
      //@ts-ignore
      count >= options.maxTimes
    ) {
      return subscriber.error(new Error("超过最大轮询次数"));
    }
    options.try.subscribe({
      next: (response) => {
        subscriber.next(response);
        count++;
      },
      error: (err) => {
        subscriber.error(err);
      },
    });
  });

  return from(request$).pipe(
    expand(() => request$.pipe(delay(options!.tick || 1000))),
    takeWhile((value, index) => {
      return !options.retryUntil(value, index);
    }, true) // true 参数表示包含结束条件的最后一个值
  );
};
