import * as React from 'react';
import { useEffect, useRef } from 'react';
import { Map } from "mapbox-gl";
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/MapboxGl.css';
import { addMapboxSource, addMetroLayer, addMetroPopups, mountMap } from '../utils/mapUtils';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectTimeRange } from '../store/slices/filterSlice'
import { selectMapData, fetchMapData, selectMapDataStatus } from '../store/slices/mapSlice'
import { RootState } from '../store/store';
import { configure } from '@testing-library/react';

export const MapboxGl = () => {
  const dispatch = useAppDispatch();
  const mapContainer = useRef(null);
  const map: React.MutableRefObject<Map | null> = useRef(null);
  const mapData = useAppSelector(selectMapData);
  const timeRange = useAppSelector(selectTimeRange);
  const mapDataStatus = useAppSelector(selectMapDataStatus);

  const configureMap = async () => {
    if(map.current && mapData.summaryData.summaryStats) {
      await addMapboxSource(map.current, "metros", mapData.geoJson);
      await addMetroLayer(map.current, mapData?.summaryData?.summaryStats);
      addMetroPopups(map.current);
    }
  }

  useEffect(() => {
    /* Only on first load will mapDataStatus be idle
     * the component shouldn't respond until another request is issued from elsewhere in the app
     */
    if (mapDataStatus === 'idle') {
      dispatch(fetchMapData(timeRange))
    }
  });

  useEffect(() => {
    /* recursive map render
     * once map.current is static function stops calling
     */
    if (map.current) {
      configureMap();
    }
    else if (mapContainer.current) {
      map.current = mountMap(mapContainer.current);
    }
  });
  
  return (
    <div>
        <div ref={mapContainer}></div>
        <div id="color-legend" className="legend">
          <h4>Market Growth (%)</h4>
          <div><span style={{backgroundColor: "#de5842"}}></span>{mapData.summaryData.summaryStats?.growthP100}</div>
          <div><span style={{backgroundColor: "#fcd059"}}></span>{mapData.summaryData.summaryStats?.growthP90}</div>
          <div><span style={{backgroundColor: "#ededea"}}></span>{mapData.summaryData.summaryStats?.growthP50}</div>
          <div><span style={{backgroundColor: "#bfe1bf"}}></span>{mapData.summaryData.summaryStats?.growthP10}</div>
          <div><span style={{backgroundColor: "#a2d7d8"}}></span>{mapData.summaryData.summaryStats?.growthP0}</div>
        </div>
        <div id="color-legend" className="legend --bottom">
          <h4>ZHVI (Typical value)</h4>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "30px", height: "30px"}}></span>{mapData.summaryData.summaryStats?.zhivP100}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "20px", height: "20px"}}></span>{mapData.summaryData.summaryStats?.zhivP90}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "15px", height: "15px"}}></span>{mapData.summaryData.summaryStats?.zhivP50}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "10px", height: "10px"}}></span>{mapData.summaryData.summaryStats?.zhivP10}</div>
          <div className="radius-circle-wrapper"><span className="radius-circle" style={{width: "5px", height: "5px"}}></span>{mapData.summaryData.summaryStats?.zhivP0}</div>
        </div>
    </div>
  );
}