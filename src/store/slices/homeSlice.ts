import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HomeSection from "src/entities/HomeSection/HomeSection";
import DefaultFocusInterface from "./defaultFocusInterface";

type SectionType = ReturnType<HomeSection["toJson"]>;

interface HomeStateInterface extends DefaultFocusInterface {
  carouselSection: SectionType | null;
  citySection: SectionType | null;
  ottSection: SectionType | null;
  favoriteSection: SectionType | null;
  dealSection: SectionType | null;
  featureSection: SectionType | null;
  curationSection: SectionType | null;
  countrySection: SectionType | null;
}

const initialState: HomeStateInterface = {
  lastFocused: null,

  carouselSection: null,
  citySection: null,
  ottSection: null,
  favoriteSection: null,
  dealSection: null,
  featureSection: null,
  curationSection: null,
  countrySection: null,
};

export const homeSlice = createSlice({
  name: "home",
  initialState,
  reducers: {
    setLastFocusedToNull: (state) => {
      state.lastFocused = null;
    },
    setLastFocused: (state, action: PayloadAction<string>) => {
      state.lastFocused = action.payload;
    },

    setCitySection: (state, action: PayloadAction<HomeSection>) => {
      state.citySection = action.payload.toJson();
    },
  },
});

export const { setLastFocusedToNull, setLastFocused, setCitySection } =
  homeSlice.actions;
