import { createContext, ReactNode, useContext } from "react";

type ScrollContextType = {
  target: React.RefObject<null>;
  toTop: (smooth?: boolean) => void;
  toBottom: (smooth?: boolean) => void;
};

export const ScrollContext = createContext<ScrollContextType | undefined>(
  undefined
);

export const useScroll = () => {
  return useContext(ScrollContext);
};

type Props = { children: ReactNode; ref: React.RefObject<null> };

const ScrollProvider = (props: Props) => {
  const { children, ref } = props;

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
    <ScrollContext.Provider value={{ target: ref, toTop, toBottom }}>
      {children}
    </ScrollContext.Provider>
  );
};

export { ScrollProvider };
