import { BubbleDataType, BubbleProps, RolesType } from "..";

type Props<T> = {
  items: BubbleDataType<T>[];
  roles: RolesType<T>;
};

export type MergedDataType<ContentType> = {
  key: string;
  displayData: Partial<BubbleProps<ContentType>>;
};

const useMergeData = <T>(props: Props<T>) => {
  const { items, roles } = props;

  const mergedData: MergedDataType<T>[] = items.map((item, idx) => {
    const bubbleData = {
      ...roles[item.role],
      content: item.content,
    };
    return {
      key: item.key ?? String(idx),
      displayData: bubbleData,
    };
  });

  return { mergedData };
};

export { useMergeData };
