<template>
  <div class="search">
    <div class="nav">
      <button class="dropbtn" @click="showSearch = !showSearch">
        <img src="/images/icons/magnifying-glass.png" :style="iconStyle">
        <span v-if="!isMobile" style="font-size: 14pt;">{{showSearch ? 'Close' : 'Search'}}</span>
      </button>
    </div>
    <div v-if="showSearch" class="search-interface">
      <div class="search-bar">
        <div class="search">
          <input v-on:input="searchWithText($event)" class="search__input" type="text" placeholder="Search Rivers..." name="search" id="searchRiver"/>
        </div>
      </div>
      <div class="search-panel">
        <div v-if='loading' class='station-list__loader'><p>Loading Results</p><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div><div class="dots"></div></div>
        <div style="display: flex; flex-wrap: wrap;" v-else-if="anyResults">
          <div v-if="searchResults.rivers.length" class="search__results--category">
            <h3>Rivers</h3>
            <ul>
              <li v-for="river in searchResults.rivers" tabindex="0">
                <a class="search__results--item" :href="`/river/${river.gnisId}`"><img src="/images/icons/river_result_icon.png" alt="river icon"/>{{river.name}} - {{getStateObj(river.states)}}</a>
              </li>
            </ul>
          </div>
          <div v-if="searchResults.stations.length" class="search__results--category">
            <h3>Gages</h3>
            <ul>
              <li v-for="station in searchResults.stations" tabindex="0">
                <a class="search__results--item" :href="`/site/${station.stationNumber}`"><img src="/images/icons/station_result_icon.png" alt="station icon"/>{{station.name}}</a>
              </li>
            </ul>
          </div>
          <div v-if="searchResults.reservoirs.length" class="search__results--category">
            <h3>Reservoirs</h3>
            <ul>
              <li v-for="reservoir in searchResults.reservoirs" tabindex="0">
                <a class="search__results--item" :href="`/reservoir/${reservoir.resId}`"><img src="/images/icons/reservoir_result_icon.png" alt="reservoir icon"/>{{reservoir.name}}</a>
              </li>
            </ul>
          </div>
        </div>
        <p v-else>Search for rivers, stations, reservoir, rapids, reports...</p>
      </div>
    </div>
  </div>
</template>
<script>
  // import map and list components for the explorer
  import axios from 'axios';
  import stateMap from '../../data/stateMap';

  export default {
    data() {
      return {
        user: null,
        subset: null,
        stations: null,
        selection: null,
        loading: false,
        showSearch: false,
        searchResults: {rivers: [], reservoirs: [], stations: []}
      }
    },
    props: [
      'isMobile'
    ],
    computed: {
      iconStyle() {
        if (this.isMobile) return 'width: 45px; margin-right: 10px;'
        else return 'width: 14px; margin-right: 10px;'
      },
      anyResults() {
        return (
          (this.searchResults.rivers && this.searchResults.rivers.length)
          || (this.searchResults.reservoirs && this.searchResults.reservoirs.length)
          || (this.searchResults.stations && this.searchResults.stations.length)
        );
      },
    },

    methods: {
      searchWithText(event) {
        this.loading = true;

        axios.get('/api/search/all', {params: {term: event.target.value}}).then(res => {
          this.loading = false;
          this.searchResults = res.data;
        });
      },

      getStateObj(states) {
        const seen = [];

        return states.map(s => {
          s = s.length < 2 ? `0${s}` : s;

          if (seen.includes(s)) {
            return;
          } else {
            seen.push(s);
          }

          if (stateMap[s]) return stateMap[s].abbr.toUpperCase();
          else return;
        }).join(', ');
      }
    }
  }
</script>
