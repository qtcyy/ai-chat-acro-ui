import { createContext, ReactNode, useContext, useEffect } from "react";

type ScrollContextType = {
  target: React.RefObject<null>;
  toTop: (smooth?: boolean) => void;
  toBottom: (smooth?: boolean) => void;
  shouldScroll: boolean;
  scrollTop?: number;
  clientHeight?: number;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);

export const useScroll = () => {
  return useContext(ScrollContext);
};

type Props = {
  children: ReactNode;
  ref: React.RefObject<null>;
  shouldScroll: boolean;
  scrollTop?: number;
  clientHeight?: number;
};

const ScrollProvider = (props: Props) => {
  const { children, ref, shouldScroll, scrollTop, clientHeight } = props;

  useEffect(() => {
    if (ref.current) {
      //@ts-ignore
      console.log(ref.current.getScrollElement().scrollTop);
    }
  }, [ref.current]);

  const toTop = (smooth?: boolean) => {
    //@ts-ignore
    if (!ref.current.getScrollElement()) {
      return;
    }
    //@ts-ignore
    const target = ref.current.getScrollElement();
    if (target) {
      if (smooth) {
        target.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      } else {
        target.scrollTo({
          top: 0,
        });
      }
    }
  };

  const toBottom = (smooth?: boolean) => {
    //@ts-ignore
    if (!ref.current.getScrollElement()) {
      return;
    }
    //@ts-ignore
    const target = ref.current.getScrollElement();
    if (target) {
      if (smooth) {
        target.scrollTo({
          top: target.scrollHeight,
          behavior: "smooth",
        });
      } else {
        target.scrollTo({
          top: target.scrollHeight,
        });
      }
    }
  };

  return (
    <ScrollContext.Provider
      value={{
        target: ref,
        toTop,
        toBottom,
        shouldScroll,
        scrollTop,
        clientHeight,
      }}
    >
      {children}
    </ScrollContext.Provider>
  );
};

export { ScrollProvider };
