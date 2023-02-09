import { error } from 'console';
import mapboxgl from 'mapbox-gl';
import { Map,  } from 'mapbox-gl';
import { MetroSummaryStats } from './requestUtils';

export const mountMap = (id: HTMLElement) => {
  mapboxgl.accessToken = 'pk.eyJ1IjoibWFya2JyZXdlciIsImEiOiJja3hkdGpvNHQxYTdyMnF0aHl0emsyajltIn0.oNkq4DvIu2A68CEE0lPFkw';
  return new mapboxgl.Map({
    container: id,
    style: 'mapbox://styles/mapbox/outdoors-v11',
    center: [-101.299591, 47.116386],
    zoom: 3
  });
}

export const addMapboxSource = async (map: Map, sourceName: string, sourceData: any): Promise<Map> => {
  if (map.getLayer('metro-growth') !== undefined) map.removeLayer('metro-growth');
  if (map.getSource(sourceName) !== undefined) map.removeSource(sourceName);
  const promise = await map.addSource(sourceName, {
    type: 'geojson',
    data: sourceData
  });

  return promise;
}

export const addMetroLayer = async (map: Map, summaryData: MetroSummaryStats): Promise<Map> => {
  if (map.getLayer('metro-growth') !== undefined) map.removeLayer('metro-growth');

  // Refresh layers
  const promise = await map.addLayer({
    'id': 'metro-growth',
    'source': 'metros',
    'type': 'circle',
    'paint': {
      'circle-color': [
          'interpolate',
          ['linear'],
          ['get', 'growth'],
          summaryData.growthP0,
          '#a2d7d8',
          summaryData.growthP10,
          '#bfe1bf',
          summaryData.growthP50,
          '#ededea',
          summaryData.growthP90,
          '#fcd059',
          summaryData.growthP100,
          '#de5842'
        ],
        'circle-radius': [
          'interpolate', ['linear'], ['get', 'zhvi'],
          summaryData.zhivP0, 5,
          summaryData.zhivP100, 30,
        ],
      'circle-blur': .50,
    }
  });

  return promise;
}

export const addMetroPopups = (map: Map) => {
  // Create a popup, but don't add it to the map yet.
  const popup = new mapboxgl.Popup({
    closeButton: false,
    closeOnClick: false
  });

  map.on('mouseenter', 'metro-growth', (e: any) => {
    // Change the cursor style as a UI indicator.
    map.getCanvas().style.cursor = 'pointer';

    // Copy coordinates array.
    const name = e.features[0].properties.regionName;
    const growth = e.features[0].properties.growth;
    const zhvi = e.features[0].properties.zhvi;
    const usdGrowth = e.features[0].properties.usdGrowth;
    const coordinates = e.features[0].geometry.coordinates.slice();
    const description = `<div class='tooltip'><h2>${name}</h2>
      <p><span>ZHVI:</span> ${zhvi}</p>
      <p><span>Growth(%):</span> ${growth}</p>
      <p><span>Growth($):</span> ${usdGrowth}</p></div>`;

    // Ensure that if the map is zoomed out such that multiple
    // copies of the feature are visible, the popup appears
    // over the copy being pointed to.
    while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
      coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
    }

    // Populate the popup and set its coordinates
    // based on the feature found.
    popup.setLngLat(coordinates).setHTML(description).addTo(map);
  });

  map.on('mouseleave', 'metro-growth', () => {
    map.getCanvas().style.cursor = '';
    popup.remove();
  });

  return map
}