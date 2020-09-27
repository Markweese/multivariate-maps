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
      <div v-bind:class="{'search': true, 'search--hidden': !showSearch}">
        <input v-on:input="filterByText($event)" v-on:keyup="executeByText($event)" class="search__input" type="text" placeholder="Search Rivers..." name="search" id="searchRiver" aria-expanded="false"/>
        <ul v-if="textDropdownResults" class="search__results">
          <li v-for="station in textDropdownResults" v-on:click="selectStation(station.stationNumber)" class="river-filter" tabindex="0">
            {{station.name}}
          </li>
        </ul>
      </div>
    </div>
    <div v-if="subset" class="data-display">
      <ExplorerMap v-if="isMap" v-bind:user="user" v-bind:selection="selection" v-bind:subset="subset"/>
      <ExplorerList v-if="!isMap" v-bind:user="user" v-bind:selection="selection" v-bind:subset="subset"/>
    </div>
    <div v-else class="instruction-prompt">
      <p>Please select a state to continue</p>
    </div>
  </div>
</template>
<script>
  // import map and list components for the explorer
  import states from '../../data/states';
  import ExplorerMap from '../components/ExplorerMap.vue';
  import ExplorerList from '../components/ExplorerList.vue';

  export default {
    data() {
      return {
        user: null,
        subset: null,
        states: states,
        stations: null,
        selection: null,
        currentView: 'map',
        activeState: null,
        stateDropdownOpen: false,
        textDropdownResults: null
      }
    },

    created: function(){
      this.fetchData();
    },

    computed: {
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
        let stations = document.querySelector('#dataPasser').dataset.stations;

        this.user = user ? JSON.parse(user) : null;
        this.stations = stations ? JSON.parse(stations) : null;
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
        this.subset = this.stations.filter(station => station.state === state.fip);
        this.selection = this.subset;
        this.activeState = state.name;
      },

      filterByText(event) {
        if(event.target.value) {
            this.textDropdownResults = this.subset.filter(station => station.name.toUpperCase().includes(event.target.value.toUpperCase()));
        } else {
          this.textDropdownResults = null;
        }
      },

      executeByText(event) {
          if(event.code === 'Enter') {
            if(event.target.value) {
              this.textDropdownResults = null;
              this.selection = this.subset.filter(station => station.name.toUpperCase().includes(event.target.value.toUpperCase()));
            } else {
              this.textDropdownResults = null;
            }
          }
      },

      selectStation(id) {
        this.textDropdownResults = null;
        this.selection = this.subset.filter(station => station.stationNumber === id);
      }
    },

    components: {
      ExplorerMap,
      ExplorerList
    }
  }
</script>
