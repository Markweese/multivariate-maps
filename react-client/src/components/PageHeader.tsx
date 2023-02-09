import * as React from 'react';
import { useEffect } from 'react';
import 'mapbox-gl/dist/mapbox-gl.css';
import '../styles/PageHeader.css';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { selectTimeRange, selectAnalysisType, setTimeRange } from '../store/slices/filterSlice'

export const PageHeader = (props: {title: string, icon: string}) => {
  const dispatch = useAppDispatch();
  const timeRange = useAppSelector(selectTimeRange);
  const analysisType = useAppSelector(selectAnalysisType);

  return (
    <div className="toolbar">
      <img alt="logo" src={props.icon} className="logo" />
      <h2>{props.title}</h2>
      <div className="button-block">
        <button
          disabled={analysisType === 'forecasted'}
          className={timeRange ==='1m' ? 'btn-active' : ''}
          value="1m"
          onClick={() => dispatch(setTimeRange("1m"))}
        >
            1 Mo
        </button>
        <button
          disabled={analysisType === 'forecasted'}
          className={timeRange ==='6m' ? 'btn-active' : ''}
          value="6m"
          onClick={() => dispatch(setTimeRange("6m"))}
        >
          6 Mo
        </button>
        <button
          disabled={analysisType === 'forecasted'}
          className={timeRange ==='1y' ? 'btn-active' : ''}
          value="1y"
          onClick={() => dispatch(setTimeRange("1y"))}
        >
          1 Yr
        </button>
        <button
          disabled={analysisType === 'forecasted'}
          className={timeRange ==='5y' ? 'btn-active' : ''}
          value="5y"
          onClick={() => dispatch(setTimeRange("5y"))}
        >
          5 Yr
        </button>
        <button
          disabled={analysisType === 'forecasted'}
          className={timeRange ==='Max' ? 'btn-active' : ''}
          value="Max"
          onClick={() => dispatch(setTimeRange("Max"))}
        >
          Max
        </button>
      </div>
    </div>
  );
}