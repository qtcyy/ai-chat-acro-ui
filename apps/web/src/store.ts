import { create } from "zustand";

type StoreType = {
  waitSendQuestion: string | undefined;
  selectedModel: string;
  setWaitSendQuestion: (value: string | undefined) => void;
  setSelectedModel: (value: string) => void;
};

export const useStore = create<StoreType>((set) => ({
  waitSendQuestion: undefined,
  selectedModel: "deepseek-r1-250120",
  setWaitSendQuestion(value: string | undefined) {
    set({ waitSendQuestion: value });
  },
  setSelectedModel(value: string) {
    set({ selectedModel: value });
  },
}));
