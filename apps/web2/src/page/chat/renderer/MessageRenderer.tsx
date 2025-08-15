import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export type MessageRendererProps<ContentType extends any> = Omit<
  HTMLAttributes<HTMLDivElement>,
  "content"
> & {
  id?: string;
  render?: (content: ContentType, id?: string) => ReactNode;
  content: ContentType;
};

type MessageRendererContextType = {
  onUpdate?: () => void;
};

export const MessageRendererContext = createContext<MessageRendererContextType>(
  {}
);

export const MessageRenderer = <T,>(props: MessageRendererProps<T>) => {
  const { id, render, content } = props;

  const { onUpdate } = useContext(MessageRendererContext);

  useEffect(() => {
    if (onUpdate) {
      onUpdate();
    }
  }, [content]);

  return <div>{render ? render(content, id) : null}</div>;
};
