import { create } from "zustand";

type StoreType = {
  waitSendQuestion: string | undefined;
  selectedModel: string;
  insertText: string;
  loginId: string | undefined;
  loginUsername: string | undefined;
  reloadSignal: number;
  chatLoadSignal: number;
  setWaitSendQuestion: (value: string | undefined) => void;
  setSelectedModel: (value: string) => void;
  setInsertText: (value: string) => void;
  setLoginId: (value: string | undefined) => void;
  setLoginUsername: (value: string | undefined) => void;
  setReloadSignal: (value: number) => void;
  setChatLoadSignal: (value: number) => void;
};

export const useStore = create<StoreType>((set) => ({
  waitSendQuestion: undefined,
  selectedModel: "deepseek-r1",
  insertText: "",
  loginId: undefined,
  loginUsername: undefined,
  reloadSignal: 0,
  chatLoadSignal: 0,
  setWaitSendQuestion(value: string | undefined) {
    set({ waitSendQuestion: value });
  },
  setSelectedModel(value: string) {
    set({ selectedModel: value });
  },
  setInsertText(value: string) {
    set({ insertText: value });
  },
  setLoginId(value: string | undefined) {
    set({ loginId: value });
  },
  setLoginUsername(value: string | undefined) {
    set({ loginUsername: value });
  },
  setReloadSignal(value: number) {
    set({ reloadSignal: value });
  },
  setChatLoadSignal(value: number) {
    set({ chatLoadSignal: value });
  },
}));
