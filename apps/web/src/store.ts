import { create } from "zustand";

type StoreType = {
  waitSendQuestion: string | undefined;
  waitSendProps: string | undefined;
  selectedModel: string;
  insertText: string;
  loginId: string | undefined;
  loginUsername: string | undefined;
  reloadSignal: number;
  chatLoadSignal: number;
  scrollTarget: HTMLElement | undefined;
  setWaitSendQuestion: (value: string | undefined) => void;
  setWaitSendProps: (value: string | undefined) => void;
  setSelectedModel: (value: string) => void;
  setInsertText: (value: string) => void;
  setLoginId: (value: string | undefined) => void;
  setLoginUsername: (value: string | undefined) => void;
  setReloadSignal: (value: number) => void;
  setChatLoadSignal: (value: number) => void;
  setScrollTarget: (value: HTMLElement | undefined) => void;
};

export const useStore = create<StoreType>((set) => ({
  waitSendQuestion: undefined,
  waitSendProps: undefined,
  selectedModel: "deepseek-r1",
  insertText: "",
  loginId: undefined,
  loginUsername: undefined,
  reloadSignal: 0,
  chatLoadSignal: 0,
  scrollTarget: undefined,
  setWaitSendQuestion(value: string | undefined) {
    set({ waitSendQuestion: value });
  },
  setWaitSendProps(value: string | undefined) {
    set({ waitSendProps: value });
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
  setScrollTarget(value: HTMLElement | undefined) {
    set({ scrollTarget: value });
  },
}));
