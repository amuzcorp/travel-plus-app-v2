import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import HomeSection from "../../entities/HomeSection/HomeSection";
import DefaultFocusInterface from "./defaultFocusInterface";

type SectionType = ReturnType<HomeSection["toJson"]>;

interface HomeStateInterface extends DefaultFocusInterface {
  carouselSection: SectionType | null;
  citySection: SectionType | null;
  ottSection: SectionType | null;
  favoriteSection: SectionType | null;
  dealSection: SectionType | null;
  panoramaSection: SectionType | null;
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
  panoramaSection: null,
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
    setCarouselSection: (state, action: PayloadAction<HomeSection>) => {
      state.carouselSection = action.payload.toJson();
    },
    setCitySection: (state, action: PayloadAction<HomeSection>) => {
      state.citySection = action.payload.toJson();
    },
    setOttSection: (state, action: PayloadAction<HomeSection>) => {
      state.ottSection = action.payload.toJson();
    },
    setFavoriteSection: (state, action: PayloadAction<HomeSection>) => {
      state.favoriteSection = action.payload.toJson();
    },
    setDealSection: (state, action: PayloadAction<HomeSection>) => {
      state.dealSection = action.payload.toJson();
    },
    setPanoramaSection: (state, action: PayloadAction<HomeSection>) => {
      state.panoramaSection = action.payload.toJson();
    },
    setFeatureSection: (state, action: PayloadAction<HomeSection>) => {
      state.featureSection = action.payload.toJson();
    },
    setCurationSection: (state, action: PayloadAction<HomeSection>) => {
      state.curationSection = action.payload.toJson();
    },
    setCountrySection: (state, action: PayloadAction<HomeSection>) => {
      state.countrySection = action.payload.toJson();
    },
  },
});

export const {
  setLastFocusedToNull,
  setLastFocused,
  setCarouselSection,
  setCitySection,
  setOttSection,
  setFavoriteSection,
  setDealSection,
  setPanoramaSection,
  setFeatureSection,
  setCurationSection,
  setCountrySection,
} = homeSlice.actions;
