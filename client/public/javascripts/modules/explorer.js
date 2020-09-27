import axios from 'axios';
import states from '../../data/states';
import { dropdownUtils } from '../utils/dropdownUtils';

const explorer = (() => {
  let map;
  let checkbox;
  let searchBar;
  let mapSelect;
  let listSelect;
  let allMarkers;
  let outputBox;
  let mapOptions;
  let stateButton;
  let stationData;
  let stationList;
  let filterButton;
  let mapContainer;
  let stateDropdown;
  let activeStations;
  let currentSelection;
  let stationListItems;

  const init = () => {
    mapContainer = document.getElementById('map');
    checkbox = document.getElementById('checkbox');
    mapSelect = document.getElementById('mapToggle');
    listSelect = document.getElementById('listToggle');
    searchBar = document.getElementById('searchRiver');
    outputBox = document.getElementById('searchResults');
    stateButton = document.getElementById('stateButton');
    stationList = document.getElementById('stationList');
    filterButton = document.querySelector('.__states-list');
    stateDropdown = document.getElementById('stateDropdown');
    mapOptions = {center: { lat: 39.827408, lng: -98.573850}, zoom:10};
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    stationListItems = Array.from(document.querySelectorAll('.station-list__item'));
    stationData = JSON.parse(document.getElementById('dataPasser').dataset.stations);
    activeStations = stationData;

    //populate filters list
    states.forEach(item => {
      filterButton.innerHTML += `<li class='.__filter-item' tabindex='0' id='${item.fip}'>${item.name}</li>`;
    });

    dropdownUtils.trapFocus(filterButton);

    const filters = Array.from(document.getElementsByClassName('.__filter-item'));

    //build out the Filters array
    if(filters.length) {
        activateFilters(filters);
    }

    drawMarkers();
    activateViewToggles();
    searchBar.addEventListener('input', filterRivers);
  };

  //filter the array by site name
  const filterRivers = (e) => {
    let results = [];
    let search = e.target.value;

    if(!search){
      outputBox.style.display = 'none';
    } else {
      outputBox.style.display = 'block';
      outputBox.innerHTML = '';
      results = activeStations.filter(station => station.name.toUpperCase().includes(search.toUpperCase()));

      results.forEach(result => {
        outputBox.innerHTML += `<li class='river-filter' tabindex='0' data-stationid=${result.stationNumber}>${result.name.toUpperCase()}</li>`;
      });

      dropdownUtils.trapFocus(outputBox);

      if(results.length) {
        Array.from(document.querySelectorAll('.river-filter')).forEach(filter => {
          filter.addEventListener('click', select);
          filter.addEventListener('keydown', (e) => {
            if(e.code === 'Enter') {
              select(e);
            }
          });
        });
      } else {
        outputBox.innerHTML = `<li class='river-filter'>none matching '${search}'</li>`;
      }
    }
  };

  //add event listeners to filter list
  const activateFilters = (filters) => {
    stateButton.addEventListener('click', () => {
      toggleStateDropdown();
    });

    if(checkbox) {
      checkbox.addEventListener('click', () => {
        filterActive();
      });
    }

    filters.forEach(filter => {
      filter.addEventListener('click', () => {
        filterState(filter.id, filter.innerHTML)
      });

      filter.addEventListener('keydown', (e) => {
        if(e.code === 'Enter') {
          filterState(filter.id, filter.innerHTML);
        }
      });
    });
  };

  //update query and markers based on state location
  const filterState = (stateFip, name) => {
    const bounds = new google.maps.LatLngBounds();

    if(checkbox) {
        checkbox.classList.remove('--active');
    }

    document.getElementById('indicator').innerHTML = name + ' ▾';
    document.getElementById('indicator').dataset.activeState = stateFip;
    document.getElementById('searchBar').classList.remove('search--hidden');
    activeStations = stationData.filter(station => station.state === stateFip);

    refreshList();
    refreshMarkers();
  };

  //reload map and zoom to station
  const select = (e) => {
    const bounds = new google.maps.LatLngBounds();
    let selection = stationData.filter(station => station.stationNumber === e.target.dataset.stationid);

    outputBox.style.display = 'none';
    searchBar.value = '';

    refreshList(selection);
    refreshMarkers(selection);
  };

  //Draw Markers
  const drawMarkers = (data = activeStations) => {
    const infoWindow = new google.maps.InfoWindow();
    const bounds = new google.maps.LatLngBounds();

    allMarkers = data.map(station => {
      const position = { lat: station.coordinates[0], lng: station.coordinates[1] };
      const marker = new google.maps.Marker({map, position});

      bounds.extend(position);
      marker.place = station;

      return marker;
    });

    //orient the map
    map.setCenter(bounds.getCenter());
    map.fitBounds(bounds);

    allMarkers.forEach(marker => marker.addListener('click', () => {
      const html = marker.place.cfs.length > 0 ? `
      <div class="__popup">
          <h2> ${marker.place.name} </h2>
          <a class="button button-blue button-full __popup--view-button" href="/site/${marker.place.stationNumber}">View Page</a>
          <a class="button button-green button-full" href="/explorer/${marker.place.stationNumber}" class="button"/>+ Add To List</a>
      </div>` :
      `
      <div class="__popup">
          <h2> ${marker.place.name} </h2>
          <a class="button button-green button-full" value="+ ADD TO LIST" class="button"/>+ Add To List</a>
      </div>`;

      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    }));
  };

  const refreshMarkers = (data = activeStations) => {
    const bounds = new google.maps.LatLngBounds();

    allMarkers.forEach(marker => {
      if(data.filter(station => station.stationNumber === marker.place.stationNumber).length > 0) {
        marker.setVisible(true);
      } else {
        marker.setVisible(false);
      }
    });

    data.forEach(station => {
      bounds.extend({lat: station.coordinates[0], lng: station.coordinates[1]});
    });

    map.fitBounds(bounds);
    map.setCenter(bounds.getCenter());
  }

  const activateViewToggles = () => {
    mapSelect.addEventListener('click', () => {
      toggleMap();
    });
    listSelect.addEventListener('click', () => {
      toggleList();
    });
  };

  const toggleStateDropdown = () => {
    if(stateDropdown.classList.contains('dropdown-content-open')) {
      stateDropdown.setAttribute('aria-expanded', 'false');
      stateDropdown.classList.remove('dropdown-content-open');
    } else {
      document.querySelector('.__states-list').focus();
      stateDropdown.setAttribute('aria-expanded', 'true');
      stateDropdown.classList.add('dropdown-content-open');
    }
  }

  const toggleMap = () => {
    mapSelect.classList.add('--toggle-active');
    listSelect.classList.remove('--toggle-active');
    mapContainer.classList.remove('map--hidden');
    stationList.classList.add('station-list--hidden');
    refreshMarkers(currentSelection);
  };

  const toggleList = () => {
    mapSelect.classList.remove('--toggle-active');
    listSelect.classList.add('--toggle-active');
    mapContainer.classList.add('map--hidden');
    stationList.classList.remove('station-list--hidden');
  };

  const refreshList = (data = activeStations) => {
    stationListItems.forEach(item => {
      let anchors = Array.from(item.querySelectorAll('a'));

      anchors.forEach(anchor => {
        anchor.setAttribute('tabindex', '-1');
      });

      item.classList.add('station-list__item--removed');
    });

    data.forEach(station => {
      const el = document.getElementById(`${station.stationNumber}`);

      if(el) {
        let anchors = Array.from(el.querySelectorAll('a'));

        anchors.forEach(anchor => {
          anchor.setAttribute('tabindex', '0');
        });

        el.classList.remove('station-list__item--removed');
      }
    });
  };

  const filterActive = () => {
    const bounds = new google.maps.LatLngBounds();
    let isActive = document.getElementById('checkbox').classList.contains('--active');

    if(isActive) {
      let activeStateFip = document.getElementById('indicator').dataset.activeState;
      let activeStateName = document.getElementById('indicator').innerHTML.split(' ')[0];

      checkbox.classList.remove('--active');
      filterState(activeStateFip, activeStateName);
    } else {

      if(activeStations[0].cfs) {
        activeStations = activeStations.filter(station => station.cfs.length > 0);

        refreshList();
        refreshMarkers();
        checkbox.classList.add('--active');
      }
    }
  }

  return {
    init
  };

})();

export { explorer };
