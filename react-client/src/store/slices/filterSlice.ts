import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import { AllowedTimeRanges } from "../../utils/requestUtils";
import { fetchMapData } from './mapSlice';

// Define a type for the slice state
interface FilterState {
  timeRange: AllowedTimeRanges,
  selectedMetros: Array<string>,
  analysisType: "forecasted" | "historical"
}

// Define the initial state using that type
const initialState: FilterState = {
  timeRange: "1y",
  selectedMetros: [],
  analysisType: "historical"
}

export const filter = createSlice({
  name: 'filter',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.fulfilled, (state, action) => {
        state.timeRange = action.meta.arg
      })
  },
})

export const {} = filter.actions;

export default filter.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectTimeRange = (state: RootState) => state.filter.timeRange;
export const selectAnalysisType = (state: RootState) => state.filter.analysisType;
export const selectSelectedMetros = (state: RootState) => state.filter.selectedMetros;

export const setTimeRange = createAsyncThunk(
  'filter/setTimeRange',
  async (timeRange: AllowedTimeRanges, { dispatch }) => {
    dispatch(fetchMapData(timeRange))
  }
)