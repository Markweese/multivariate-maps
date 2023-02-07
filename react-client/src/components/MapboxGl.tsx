import * as React from 'react';
import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { selectMapData, fetchMapData } from '../store/slices/mapSlice'
import { RootState } from '../store/store';

export const MapboxGl = () => {
  const dispatch = useDispatch();
  const mapData = useSelector(selectMapData);
  const mapDataStatus = useSelector((state: RootState) => state.mapbox.mapDataStatus);

  useEffect(() => {
    if (mapDataStatus === 'idle') {
      dispatch(fetchMapData("1y"))
    }
  }, [mapDataStatus, dispatch])
  
  return (
    <div>
        <div id="map"></div>
        <div id="color-legend" className="legend">
          <h4>Market Growth (%)</h4>
          <div><span style={{backgroundColor: "#de5842"}}></span>{mapData.summaryStats.growthP100}</div>
          <div><span style={{backgroundColor: "#fcd059"}}></span>{mapData.summaryStats.growthP90}</div>
          <div><span style={{backgroundColor: "#ededea"}}></span>{mapData.summaryStats.growthP50}</div>
          <div><span style={{backgroundColor: "#bfe1bf"}}></span>{mapData.summaryStats.growthP10}</div>
          <div><span style={{backgroundColor: "#a2d7d8"}}></span>{mapData.summaryStats.growthP0}</div>
        </div>
        <div id="color-legend" className="legend --bottom">
          <h4>ZHVI (Typical value)</h4>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "30px", height: "30px"}}></span>{mapData.summaryStats.zhivP100}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "20px", height: "20px"}}></span>{mapData.summaryStats.zhivP90}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "15px", height: "15px"}}></span>{mapData.summaryStats.zhivP50}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "10px", height: "10px"}}></span>{mapData.summaryStats.zhivP10}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "5px", height: "5px"}}></span>{mapData.summaryStats.zhivP0}</div>
        </div>
    </div>
  );
}