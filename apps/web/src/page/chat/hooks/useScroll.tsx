import { createContext, ReactNode, useContext } from "react";

type ScrollContextType = {
  target: React.RefObject<null>;
  toTop: () => void;
  toBottom: () => void;
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

  const toTop = () => {
    //@ts-ignore
    if (!ref.current.getScrollElement()) {
      return;
    }
    //@ts-ignore
    const target = ref.current.getScrollElement();
    if (target) {
      target.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    }
  };

  const toBottom = () => {
    //@ts-ignore
    if (!ref.current.getScrollElement()) {
      return;
    }
    //@ts-ignore
    const target = ref.current.getScrollElement();
    if (target) {
      target.scrollTo({
        top: target.scrollHeight,
        behavior: "smooth",
      });
    }
  };

  return (
    <ScrollContext.Provider value={{ target: ref, toTop, toBottom }}>
      {children}
    </ScrollContext.Provider>
  );
};

export { ScrollProvider };
