<template>
  <div class="map">
    <div id="map" class="__google-map">
    </div>
  </div>
</template>
<script>
  import axios from 'axios';
  import { FlashUtils } from '../mixins/flashUtils.js';

  export default {
    props: [
      'user',
      'subset',
      'selection'
    ],

    data() {
      return {
        addedStates: [],
        googleMap: null,
        mapOptions: {
          zoom:10,
          center: {
            lat: 39.827408,
            lng: -98.573850
          }
        },
        allMarkers: null,
        flashMessages: document.querySelector('.flash-messages')
      }
    },

    // add track station to global context for google maps access
    created() {
      window.trackStation = (id, name) => {
          this.trackStation(id, name)
      }
    },

    mounted: function(){
      this.googleMap = new google.maps.Map(document.getElementById('map'), this.mapOptions);
      this.renderPins();
    },

    watch: {
      subset: function() {
        this.renderPins();
      },
      selection: function() {
        this.refreshPins();
      }
    },

    methods: {
      renderPins() {
        let mapAlias = this.googleMap;
        const infoWindow = new google.maps.InfoWindow();
        const bounds = new google.maps.LatLngBounds();

        // keep track of which states we've added to avoid double loading
        if(!this.addedStates.includes(this.subset[0].state)) {
          this.addedStates.push(this.subset[0].state);
        } else {
          return;
        }

        this.allMarkers = this.subset.map(station => {
          const position = { lat: station.coordinates[0], lng: station.coordinates[1] };
          const marker = new google.maps.Marker({map: mapAlias, position});

          bounds.extend(position);
          marker.place = station;

          return marker;
        });

        //orient the map
        this.googleMap.setCenter(bounds.getCenter());
        this.googleMap.fitBounds(bounds);

        this.allMarkers.forEach(marker => marker.addListener('click', () => {
          let html;

          if(this.checkCFS(marker.place.cfs)) {
            html = `<div class="__popup">
                  <h2> ${marker.place.name} </h2>
                  <a class="button button-blue button-full __popup--view-button" href="/site/${marker.place.stationNumber}">View Page</a>
                  ${ this.isTracked(marker.place.stationNumber) ? '' : `<a class="button button-green button-full" href="/explorer/${marker.place.stationNumber}" class="button"/>+ Add To List</a>`}
                </div>`;
          } else if (this.user) {
            html = `<div class="__popup">
                <h2> ${marker.place.name} </h2>
                <p class="no-info-block"> We're not currently tracking this station. Would you like us to?</p>
                <button onclick="trackStation('${marker.place.stationNumber}', '${marker.place.name}')" class="button button-green button-full" aria-label="Begin Tracking ${marker.place.stationNumber}" class="button"/>+ Begin Tracking</button>
              </div>`;
          } else {
            html =`<h2> ${marker.place.name} </h2>
              <p class="no-info-block">
                Our system is not currently tracking this station. Please <a href="/login">log in</a> or <a href="/signup">sign up</a> to request tracking, or visit the <a href="https://waterdata.usgs.gov/nwis/uv?site_no=${marker.place.stationNumber}&agency_cd=USGS">USGS page</a> for more information
              </p>
              <a href="/login" class="button button-blue button-infowindow" value="Log In" class="button">Log In</a>
              <a href="/signup" class="button button-blue button-infowindow" value="Sign Up" class="button">Sign Up</a>`
          }

          infoWindow.setContent(html);
          infoWindow.open(this.googleMap, marker);
        }));
      },

      refreshPins() {
        const bounds = new google.maps.LatLngBounds();

        this.allMarkers.forEach(marker => {
          if(this.selection.filter(station => station.stationNumber === marker.place.stationNumber).length > 0) {
            marker.setVisible(true);
          } else {
            marker.setVisible(false);
          }
        });

        this.selection.forEach(station => {
          bounds.extend({lat: station.coordinates[0], lng: station.coordinates[1]});
        });

        this.googleMap.fitBounds(bounds);
        this.googleMap.setCenter(bounds.getCenter());
      },

      trackStation(id, name) {
        let errorMessage = this.generateFlashMessage(id, name, 'error');
        let compileMessage = this.generateFlashMessage(id, name, 'pending');
        let successMessage = this.generateFlashMessage(id, name, 'success');

        this.flashMessages.appendChild(compileMessage);

        axios.get(`/api/station/new/${id}`, {
          headers: {
            'user': this.user.email,
            'token': this.user.sessionToken
          }
        })
          .then(res => {
            compileMessage.remove();
            this.flashMessages.appendChild(successMessage);
          }).catch(e => {
            compileMessage.remove();
            this.flashMessages.appendChild(errorMessage);
          });
      },

      checkCFS(cfs) {
        let today = new Date;
        let dateCompare = `${today.getMonth() + 1}/${today.getDate()}`;
        return cfs.length > 0 && cfs[cfs.length - 1].date === dateCompare;
      },

      isTracked(station) {
        return this.user && this.user.stations.includes(station);
      }
    },

    mixins: [
      FlashUtils
    ]
  }
</script>
