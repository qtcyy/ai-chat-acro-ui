import styled from "styled-components";
import { MessageRenderer, MessageRendererContext } from "./MessageRenderer";
import { ReactNode } from "react";
import { RoleType } from "../layout/Chat";
import { useMergeData } from "./useMergeData";

export type MessageListProps<T> = {
  messages: T[];
  renderer: RenderersType<T>;
};

export type RendererType<T> = {
  render: (content: T, id?: string) => ReactNode;
};

export type RenderersType<T> = Record<RoleType, RendererType<T>>;

export const MessageList = <T,>(props: MessageListProps<T>) => {
  const { messages, renderer } = props;

  const { mergedData } = useMergeData({ messages, renderer });

  const onUpdate = () => {};

  return (
    <MessageRendererContext.Provider value={{ onUpdate }}>
      <MessageListWrapper>
        {mergedData.map((data, i) => (
          <MessageRenderer<T>
            key={i}
            //@ts-ignore
            id={data.message.id ?? String(i)}
            render={data.render}
            content={data.message}
          />
        ))}
      </MessageListWrapper>
    </MessageRendererContext.Provider>
  );
};

const MessageListWrapper = styled.div``;
