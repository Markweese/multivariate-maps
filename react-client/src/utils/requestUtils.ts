export type AllowedLoadingStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export const monthMap = {
    "1m": 1,
    "6m": 6,
    "1y": 12,
    "5y": 60,
    "Max": 120
  };
  
  export type AllowedTimeRanges = keyof typeof monthMap;

  export type MultiVariateGeoJson = {
    features: Array<{
        geometry: {
          coordinates: [
            number,
            number
          ], 
          type: "Point"
        }, 
        properties: {
          growth: number, 
          regionName: string, 
          usdGrowth: number,
          zhvi: number,
        }, 
        type: "Feature"
      }> 
    };

export type MetroSummaryData = {
    data: [{
        RegionName: string, 
        growth: number, 
        lat: number, 
        lng: number, 
        usd_growth: number, 
        zhvi: number,
    }]
}

export type MetroSummaryStats = {
    growthP0?: number,
    growthP10?: number,
    growthP100?: number,
    growthP25?: number,
    growthP50?: number,
    growthP75?: number,
    growthP90?: number,
    usdGrowthP0?: number,
    usdGrowthP10?: number,
    usdGrowthP100?: number,
    usdGrowthP25?: number,
    usdGrowthP50?: number,
    usdGrowthP75?: number,
    usdGrowthP90?: number,
    zhivP0?: number,
    zhivP10?: number,
    zhivP100?: number,
    zhivP25?: number,
    zhivP50?: number,
    zhivP75?: number,
    zhivP90?: number,
}

  
  export type MultivariateResponse = {
      geoJson?: MultiVariateGeoJson, 
      summaryData: {
        data?: MetroSummaryData, 
        summaryStats?: MetroSummaryStats,
      }
  }
  