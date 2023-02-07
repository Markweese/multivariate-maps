import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { RootState } from '../../store/store'
import axios from 'axios'
import { monthMap, AllowedTimeRanges, AllowedLoadingStatus } from "../../utils/requestUtils";

// Define a type for the slice state
interface MapState {
  mapData: Array<Object>,
  mapDataStatus: AllowedLoadingStatus,
  mapDataError?: string
}

// Define the initial state using that type
const initialState: MapState = {
  mapData: [],
  mapDataStatus: 'idle',
  mapDataError: undefined,
}

export const mapbox = createSlice({
  name: 'mapbox',
  initialState,
  reducers: {
    dataAdded: {
        reducer(state, action: PayloadAction<MapState>) {
            state.mapData.push(action.payload)
        },
        prepare: ()=> {
            return {
                payload: {
                    mapData: [],
                    mapDataStatus: 'loading' as AllowedLoadingStatus,
                    mapDataError: undefined
                }
            };
        }
    },
  },
})

export const { dataAdded } = mapbox.actions;

export default mapbox.reducer;

// Other code such as selectors can use the imported `RootState` type
export const selectMapData = (state: RootState) => state.mapbox.mapData;

export const fetchMapData = createAsyncThunk(
  'map/fetchMapData',
  async (timeRange: AllowedTimeRanges) => {
    const start_month = new Date();
    let end_month = new Date();
    end_month.setMonth(end_month.getMonth() - monthMap[timeRange]);

    const response = await axios.get("/api/regions/all", {
        params: {
            start_month: end_month.toISOString().split('T')[0],
            end_month: start_month.toISOString().split('T')[0],
        }
    })
    
    return response.data;
  }
)