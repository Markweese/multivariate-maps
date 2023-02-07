export type AllowedLoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export const monthMap = {
    "1m": 1,
    "6m": 6,
    "1y": 12,
    "5y": 60,
    "Max": 120
  };
  
  export type AllowedTimeRanges = keyof typeof monthMap;

  export type MapDataResponse = {
    geoJson: Object,
    summaryData: {
        data: Array<any>
        summaryStats: {
            zhivP0: number,
            zhivP10: number,
            zhivP25: number,
            zhivP50: number,
            zhivP75: number,
            zhivP90: number,
            zhivP100: number,
            growthP0: number,
            growthP10: number,
            growthP25: number,
            growthP50: number,
            growthP75: number,
            growthP90: number,
            growthP100: number,
            usdGrowthP0: number,
            usdGrowthP10: number,
            usdGrowthP25: number,
            usdGrowthP50: number,
            usdGrowthP75: number,
            usdGrowthP90: number,
            usdGrowthP100: number,
        }
    }
}