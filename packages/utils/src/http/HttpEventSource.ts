import { Observable, Subscriber, Subscription } from "rxjs";
import { useHttp } from "./HttpContext";
import { HttpDownloadProgressEvent, HttpEventType } from "@ngify/http";

import {
  createEventStreamProcessor,
  EventSourceMessage,
  getLines,
  getMessages,
} from "./parse";
import { useRef, useState } from "react";

export type CreateEventSourceOptions = {
  api: string;
  body?: any;
  headers?: Record<string, string>;
  onMessage?: (event: EventSourceMessage, completion?: string) => any;
  onOpen?: (body: any) => any;
  isFinal?: (event: EventSourceMessage) => boolean;
  onError?: () => any;
  onFinal?: () => any;
};

export const createEventSource = (options: CreateEventSourceOptions) => {
  const http = useHttp();
  const cancelRef = useRef<Subscription>();

  const [completion, setCompletion] = useState<string>();
  const [loading, setLoading] = useState<boolean>(false);

  const onmessage = (
    event: EventSourceMessage,
    observer: Subscriber<unknown>
  ) => {
    const _completion = options.onMessage?.(event, completion);
    if (_completion) {
      setCompletion(_completion);
    }
    if (options.isFinal?.(event)) {
      setLoading(false);
      observer.next(event);
      observer.complete();
      setCompletion(undefined);
      cancel();
      return;
    }
  };

  const complete = (body: any) => {
    const processStream = createEventStreamProcessor();
    let offset = 0;
    let buf = "";
    return new Observable((observer) => {
      setLoading(true);
      options.onOpen?.(body);
      const _cancel = http
        ?.post(
          options.api,
          Array.isArray(body)
            ? body
            : {
                ...options.body,
                ...body,
              },
          {
            observe: "events",
            responseType: "text",
            reportProgress: true,
          }
        )
        .subscribe({
          next: (event) => {
            switch (event.type) {
              case HttpEventType.DownloadProgress:
                const progressEvent = { ...event } as HttpDownloadProgressEvent;
                const chunk = progressEvent?.partialText?.slice(offset);
                offset = progressEvent?.partialText?.length || 0;
                buf += chunk;
                let pos = 0;

                while ((pos = buf.indexOf("\n\n")) >= 0) {
                  // 提取一个完整的事件
                  const eventText = buf.slice(0, pos);
                  buf = buf.slice(pos + 2);

                  // 处理事件
                  const lines = eventText.split("\n");
                  let data = "";

                  for (const line of lines) {
                    if (line.startsWith("data:")) {
                      data = line.slice(5).trim();
                      if (data) {
                        try {
                          const event = JSON.parse(data);
                          onmessage(
                            {
                              data: data,
                              event: "",
                              id: "",
                              retry: undefined,
                            },
                            observer
                          );
                        } catch (error) {
                          console.warn("Invalid JSON in event stream:", data);
                        }
                      }
                    }
                  }
                }

                // processStream(
                //   progressEvent?.partialText || "",
                //   getLines(
                //     getMessages(
                //       (id) => {
                //         if (id) {
                //           // store the id and send it back on the next retry:
                //           // headers[LastEventId] = id;
                //         } else {
                //           // don't send the last-event-id header anymore:
                //           // delete headers[LastEventId];
                //         }
                //       },
                //       (retry) => {
                //         // retryInterval = retry;
                //       },
                //       (e) => onmessage(e, observer)
                //     )
                //   )
                // );
                break;
              case HttpEventType.Response:
                setLoading(false);
                observer.next(event);
                setCompletion(undefined);
                observer.complete();
                break;
              // case HttpEventType.UploadProgress:
              //   console.log("f");
              //   break;
            }
          },
          error: (error) => {
            if (error.body && typeof error.body === "string") {
              try {
                let body = JSON.parse(error.body);
                setLoading(false);

                if (body.errCode != 200) {
                  // cancel();
                  observer.error({
                    ...error,
                    body: body,
                  });
                  options.onError?.();
                }

                options.onFinal?.();

                observer.next(body);
                setCompletion(undefined);
                observer.complete();
              } catch (error) {}
            }

            if (error.status === 200) {
              options.onFinal?.();
            } else {
              setLoading(false);
              observer.error(error);
              options.onError?.();
              setCompletion(undefined);
              observer.complete();
            }
            setLoading(false);
            setCompletion(undefined);

            cancel();
          },

          complete: () => {
            console.log("complete");
            options.onError?.();
            setLoading(false);
            setCompletion(undefined);
            observer.complete();
            cancelRef.current?.unsubscribe();
          },
        });

      cancelRef.current = _cancel;
    });
  };
  const cancel = () => {
    setLoading(false);

    cancelRef.current?.unsubscribe();
  };

  return {
    complete,
    cancel,
    completion,
    loading,
  };
};
