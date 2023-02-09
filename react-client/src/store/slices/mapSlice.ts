import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import axios from 'axios'
import { Map } from 'mapbox-gl';
import { monthMap, AllowedTimeRanges, AllowedLoadingStatus, MultivariateResponse, MetroSummaryData } from "../../utils/requestUtils";

// Define a type for the slice state
interface MapState {
  mapInstance?: Map,
  mapData: MultivariateResponse,
  mapDataStatus: AllowedLoadingStatus,
  mapDataError?: string
}

// Define the initial state using that type
const initialState: MapState = {
  mapData: {
    geoJson: undefined,
    summaryData: {},

  },
  mapDataStatus: 'idle',
  mapDataError: undefined,
}

export const mapbox = createSlice({
  name: 'mapbox',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchMapData.pending, (state, action) => {
        if (state.mapDataStatus !== 'loading') {
          state.mapDataStatus = 'loading';
        }
      })
      .addCase(fetchMapData.fulfilled, (state, action) => {
        if (state.mapDataStatus === 'loading') {
          state.mapDataStatus = 'succeeded'
          state.mapData = action.payload;
        }
      })
      .addCase(fetchMapData.rejected, (state, action) => {
        if (state.mapDataStatus === 'loading') {
          state.mapDataStatus = 'failed';
          state.mapDataError = action.error.message;
        }
      })
  },
})

export const {} = mapbox.actions;

export default mapbox.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectMapData = (state: RootState) => state.mapbox.mapData;
export const selectMapDataStatus = (state: RootState) => state.mapbox.mapDataStatus;

export const fetchMapData = createAsyncThunk(
  'map/fetchMapData',
  async (timeRange: AllowedTimeRanges, { signal }) => {
    const start_month = new Date();
    let end_month = new Date();
    end_month.setMonth(end_month.getMonth() - monthMap[timeRange]);

    /* Add signal to async request
     * This allows the request to be aborted
     * In the event that a subsequent call is made that negates the old req
     * The call can be aborted by storing the fetchMapData dispatch as a promise
     * you can then call promise.abort() on it, at which point to callback will shut it down
     */
    const source = axios.CancelToken.source()
    signal.addEventListener('abort', () => {
      source.cancel()
    })

    const response = await axios.get("/api/regions/all", {
        params: {
            start_month: end_month.toISOString().split('T')[0],
            end_month: start_month.toISOString().split('T')[0],
        },
        cancelToken: source.token
    })

    return response.data.response as MultivariateResponse;
  }
)