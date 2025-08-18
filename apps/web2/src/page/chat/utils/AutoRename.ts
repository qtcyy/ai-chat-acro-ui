import { HttpLoading, useHttp } from "utils";
import { UUIDTypes } from "uuid";

type AutoRenameProps = {
  setName: (name: string) => void;
};

export const useAutoRename = (props: AutoRenameProps) => {
  const { setName } = props;
  const http = useHttp();
  const { loading, loadingOperator } = HttpLoading();

  const getName = (id: UUIDTypes) => {
    http
      ?.post(`http://localhost:8000/chat/name/${id}`)
      .pipe(loadingOperator)
      .subscribe({
        next: (value) => {
          setName(value.title);
        },
        error(err) {
          console.error(err);
        },
      });
  };

  return { loading, getName };
};
