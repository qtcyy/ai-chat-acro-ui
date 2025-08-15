import { ReactNode } from "react";
import { MessageListProps } from "./MessageList";
import { MessageType } from "../layout/Chat";

export type MergedDataType<T> = {
  message: T;
  render: (content: T, id?: string) => ReactNode;
};

export const useMergeData = <T>(props: MessageListProps<T>) => {
  const { messages, renderer } = props;

  const mergedData: MergedDataType<T>[] = messages.map((message) => {
    const messageType = (message as MessageType).type;
    if (messageType === "human") {
      return {
        message: message,
        render: renderer["query"].render,
      };
    } else if (messageType === "start") {
      return {
        message: message,
        render: renderer["start"].render,
      };
    } else {
      return {
        message: message,
        render: renderer["response"].render,
      };
    }
  });

  return { mergedData };
};
