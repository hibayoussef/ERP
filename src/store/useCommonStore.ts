import { create } from "zustand";
import type { TimeZone } from "../types/common";

interface Store {
  zipCode: string | null;
  timeZone: TimeZone | null;
  setZipCode: (zipCode: string) => void;
  setTimeZone: (timeZone: TimeZone | null) => void;
}

export const useCommonStore = create<Store>((set) => ({
  zipCode: null,
  timeZone: null,
  setZipCode: (zipCode) => set({ zipCode }),
  setTimeZone: (timeZone) => set({ timeZone }),
}));
