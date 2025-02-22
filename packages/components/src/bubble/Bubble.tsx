import {
  createContext,
  HTMLAttributes,
  ReactNode,
  useContext,
  useEffect,
} from "react";
import { useRequest } from "ahooks";

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

  const onContentUpdate = async () => {
    if (onUpdate) {
      onUpdate();
    }
  };

  const { run } = useRequest(onContentUpdate, {
    debounceWait: 50,
    manual: true,
  });

  useEffect(() => {
    run();
  }, [content]);

  return <div className="flex flex-row">{render ? render(content) : null}</div>;
};

export { Bubble };
