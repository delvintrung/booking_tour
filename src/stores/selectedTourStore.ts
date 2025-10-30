import { create } from "zustand";

import type { Tour, TourDetail } from "../types";
interface SelectedTourState {
  tourSelected: Tour | null;
  tourDetailSelected: TourDetail | null;
  setTour: (tour: Tour) => void;
  setTourDetail: (tourDetail: TourDetail) => void;
  clearTour: () => void;
  clearTourDetail: () => void;
}

export const useSelectedTourStore = create<SelectedTourState>((set) => ({
  tourSelected: null,
  tourDetailSelected: null,
  setTour: (tour: Tour) => set({ tourSelected: tour }),
  setTourDetail: (tourDetail: TourDetail) =>
    set({ tourDetailSelected: tourDetail }),
  clearTour: () => set({ tourSelected: null }),
  clearTourDetail: () => set({ tourDetailSelected: null }),
}));
