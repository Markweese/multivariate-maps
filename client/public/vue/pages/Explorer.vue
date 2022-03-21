<template>
  <div class="explorer">
    <div class="view-toggle">
      <button v-on:click="toggleView('map')" v-bind:class="{'button': true, 'button-small': true, 'toggle': true, '--toggle-active': isMap}" aria-label="toggle map">
        Map
      </button>
      <button v-on:click="toggleView('list')" v-bind:class="{'button': true, 'button-small': true, 'toggle': true, '--toggle-active': !isMap}" aria-label="toggle list">
        List
      </button>
    </div>
    <div class="filter-list">
      <button v-on:click="toggleStateDropdown()" class="button button-small __filter-drop" v-bind:aria-expanded='stateDropdownOpen'>
        <span v-if="activeState">{{activeState}} ▾</span>
        <span v-else>Select State ▾</span>
        <div v-bind:class="{'dropdown-content': true, '__filter-container': true, 'dropdown-content-open': stateDropdownOpen}" id="stateDropdown">
          <ul class="__states-list">
            <li v-for="state in states" v-on:click="filterByState(state)" class="__filter-item">
              {{state.name}}
            </li>
          </ul>
        </div>
      </button>
    </div>
    <div v-if="subset && !loading" class="data-display">
      <ExplorerMap v-if="isMap" v-bind:user="user" v-bind:selection="selection" v-bind:subset="subset"/>
      <ExplorerList v-if="!isMap" v-bind:user="user" v-bind:selection="selection" v-bind:subset="subset"/>
    </div>
  </div>
</template>
<script>
  // import map and list components for the explorer
  import axios from 'axios';
  import stateMap from '../../data/stateMap';
  import ExplorerMap from '../components/ExplorerMap.vue';
  import ExplorerList from '../components/ExplorerList.vue';

  export default {
    data() {
      return {
        user: null,
        subset: null,
        stations: null,
        selection: null,
        loading: false,
        currentView: 'map',
        activeState: null,
        stateDropdownOpen: false,
        searchResults: {rivers: [], reservoirs: [], stations: []}
      }
    },

    created: function(){
      this.fetchData();
    },

    computed: {
      anyResults() {
        return (
          (this.searchResults.rivers && this.searchResults.rivers.length)
          || (this.searchResults.reservoirs && this.searchResults.reservoirs.length)
          || (this.searchResults.stations && this.searchResults.stations.length)
        );
      },
      isMap() {
        if (this.currentView === 'map') {
          return true;
        } else {
          return false;
        }
      },

      showSearch() {
        if(this.activeState) {
          return true;
        }
      }
    },

    methods: {
      fetchData() {
        let user = document.querySelector('#dataPasser').dataset.user;
        this.user = user ? JSON.parse(user) : null;
      },

      toggleView(view) {
        this.currentView = view;
      },

      toggleStateDropdown() {
        if(this.stateDropdownOpen) {
          this.stateDropdownOpen = false;
        } else {
          this.stateDropdownOpen = true;
        }
      },

      filterByState(state) {
        this.loading = true;
        this.activeState = state.name;

        axios.get(`/api/stations/state/${state.fip}`).then(res => {
          this.loading = false;
          this.subset = res.data;
          this.selection = this.subset;
        });
      },

      searchWithText(event) {
        this.loading = true;

        axios.get('/api/search/all', {params: {term: event.target.value}}).then(res => {
          this.loading = false;
          this.searchResults = res.data;
        });
      },

      selectAsset(id) {
        this.searchResults = null;
        this.selection = this.subset.filter(station => station.stationNumber === id);
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
    },

    components: {
      ExplorerMap,
      ExplorerList
    }
  }
</script>
