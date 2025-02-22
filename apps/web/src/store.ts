import { create } from "zustand";

type StoreType = {
  waitSendQuestion: string | undefined;
  setWaitSendQuestion: (value: string | undefined) => void;
};

export const useStore = create<StoreType>((set) => ({
  waitSendQuestion: undefined,
  setWaitSendQuestion(value: string | undefined) {
    set({ waitSendQuestion: value });
  },
}));
