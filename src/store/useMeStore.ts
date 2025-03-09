import { create } from "zustand";
import { IMeResponse } from "../types/me";

interface MeStore {
  me: IMeResponse | null;
  setMe: (data: IMeResponse) => void;
  clearMe: () => void;
}

export const useMeStore = create<MeStore>((set) => ({
  me: null,
  setMe: (data) => set({ me: data }),
  clearMe: () => set({ me: null }),
}));
