import styled from "styled-components";
import { Bubble, BubbleContext, BubbleProps } from "./Bubble";
import { useMergeData } from "./hooks/useMergeData";
import { useCallback, useEffect, useState } from "react";

const BubbleListWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  width: 60%;
  min-height: calc(100vh - 250px);
  min-width: 900px;
  max-width: 1400px;
`;

export interface BubbleDataType<T> extends BubbleProps<T> {
  key?: string;
  role: string;
}

export type RoleType<T> = Partial<Omit<BubbleProps<T>, "content">>;
export type RolesType<T> = Record<string, RoleType<T>>;

type Props<T> = {
  items: BubbleDataType<T>[];
  roles: RolesType<T>;
  autoScroll?: boolean;
  target?: HTMLElement;
  scrollStore?: any;
  loading?: boolean;
};

const TOLERANCE = 10;

const BubbleList = <T,>(props: Props<T>) => {
  const { items, roles, autoScroll, target, scrollStore } = props;

  const [count, setCount] = useState(0);
  const [scrollReactEnd, setScrollReachEnd] = useState(true);

  const { mergedData } = useMergeData({ items, roles });
  useEffect(() => {
    console.log(mergedData);
  }, []);

  const onInternalScroll = () => {
    const scrollTarget = target;
    if (!scrollTarget) {
      return;
    }
    // const target = e.elements().target;
    setScrollReachEnd(
      Math.abs(
        scrollTarget.scrollHeight -
          scrollTarget.scrollTop -
          scrollTarget.clientHeight
      ) <= TOLERANCE
    );
  };

  useEffect(() => {
    // console.log("check");
    onInternalScroll();
  }, [scrollStore?.clientHeight, scrollStore?.shouldScroll]);

  useEffect(() => {
    if (autoScroll && target && scrollReactEnd) {
      console.log("scroll");
      scrollStore?.toBottom(false);
    }
  }, [count, scrollReactEnd]);

  const onBubbleUpdate = useCallback(() => {
    if (scrollStore?.shouldScroll) {
      setCount((c) => c + 1);
    }
  }, [autoScroll, scrollStore?.shouldScroll]);

  const context = () => {
    return {
      onUpdate: onBubbleUpdate,
    };
  };

  return (
    <BubbleContext.Provider value={context()}>
      <BubbleListWrapper>
        {mergedData.map((item) => (
          <div key={item.key}>
            <Bubble<T>
              render={item.displayData.render}
              content={item.displayData.content}
            />
          </div>
        ))}
      </BubbleListWrapper>
    </BubbleContext.Provider>
  );
};

export { BubbleList };
