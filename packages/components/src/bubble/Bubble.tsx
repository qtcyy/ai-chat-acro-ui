import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
} from "react";

export interface BubbleProps<ContentType extends any>
  extends Omit<HTMLAttributes<HTMLDivElement>, "content"> {
  render?: (content?: ContentType) => ReactNode;
  content?: ContentType;
}

type Props<ContentType extends any> = {
  render?: (content?: ContentType) => ReactNode;
  content?: ContentType;
};

type BubbleContextType = {
  onUpdate?: () => void;
};

export const BubbleContext = createContext<BubbleContextType>({});

const Bubble = <T,>(props: BubbleProps<T>) => {
  const { render, content } = props;

  const { onUpdate } = useContext(BubbleContext);

  useEffect(() => {
    if (onUpdate) {
      onUpdate();
    }
  }, [content]);

  return <div className="flex flex-row">{render ? render(content) : null}</div>;
};

export { Bubble };
