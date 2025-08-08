import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ClientState {
  page: number;
  selectedClient: string | null;
  dashboardTab: string;
  esgCategory: string;
  stakeholderSelections: Record<string, boolean>;
  esgComments: Record<string, string>;
  dualEssentialityStep: number;
}

const initialState: ClientState = {
  page: 1,
  selectedClient: null,
  dashboardTab: 'esg-check',
  esgCategory: 'Umwelt',
  stakeholderSelections: {},
  esgComments: {},
  dualEssentialityStep: 0,
};

const clientSlice = createSlice({
  name: "client",
  initialState,
  reducers: {
    setCurrentPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setSelectedClient: (state, action: PayloadAction<string | null>) => {
      state.selectedClient = action.payload;
    },
    setDashboardTab: (state, action: PayloadAction<string>) => {
      state.dashboardTab = action.payload;
    },
    setEsgCategory: (state, action: PayloadAction<string>) => {
      state.esgCategory = action.payload;
    },
    setStakeholderSelection: (state, action: PayloadAction<{ stakeholderId: string; selected: boolean }>) => {
      state.stakeholderSelections[action.payload.stakeholderId] = action.payload.selected;
    },
    setStakeholderSelections: (state, action: PayloadAction<Record<string, boolean>>) => {
      state.stakeholderSelections = action.payload;
    },
    setEsgComment: (state, action: PayloadAction<{ key: string; comment: string }>) => {
      state.esgComments[action.payload.key] = action.payload.comment;
    },
    setEsgComments: (state, action: PayloadAction<Record<string, string>>) => {
      state.esgComments = action.payload;
    },
    setDualEssentialityStep: (state, action: PayloadAction<number>) => {
      state.dualEssentialityStep = action.payload;
    },
    resetClientDashboard: (state) => {
      state.selectedClient = null;
      state.dashboardTab = 'esg-check';
      state.esgCategory = 'Umwelt';
      state.stakeholderSelections = {};
      state.esgComments = {};
      state.dualEssentialityStep = 0;
    },
  },
});

export const {
  setCurrentPage,
  setSelectedClient,
  setDashboardTab,
  setEsgCategory,
  setStakeholderSelection,
  setStakeholderSelections,
  setEsgComment,
  setEsgComments,
  setDualEssentialityStep,
  resetClientDashboard,
} = clientSlice.actions;

export default clientSlice.reducer;