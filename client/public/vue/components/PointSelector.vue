<template>
  <div class="selector-map">
    <div id="selectorMap" class="__google-map">
    </div>
    <div class="selector-map--controls">
      <button v-if="pointSelected" @click="$emit('coordinateOut', selectedLatLng)" class="button button-green button-green--large" type="button" name="add point">Add {{context.name}} Point +</button>
      <button @click="$emit('coordinateOut', null)" class="button button-red" type="button" name="close map">Close Map X</button>
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'context',
      'coordinates'
    ],

    data() {
      return {
        googleMap: null,
        mapOptions: {
          zoom:10,
          mapTypeId: 'satellite',
          center: {
            lat: this.coordinates[0],
            lng: this.coordinates[1]
          }
        },
        pointSelected: false,
        currentMarker: null,
        selectedLatLng: null
      }
    },

    mounted: function(){
      this.googleMap = new google.maps.Map(document.getElementById('selectorMap'), this.mapOptions);
      this.addPin(this.mapOptions.center);

      google.maps.event.addListener(this.googleMap, 'click', (event) => {
        let position = {
          lat: event.latLng.lat(),
          lng: event.latLng.lng()
        };

        this.pointSelected = true;
        this.selectedPoint = position;
        this.addPin(position);
      });
    },

    methods: {
      addPin(position) {
        let mapAlias = this.googleMap;

        if (this.currentMarker) {
          this.currentMarker.setMap(null);
        }

        this.selectedLatLng = [position.lat, position.lng];
        this.currentMarker = new google.maps.Marker({map: mapAlias, position});
      }
    }
  }
</script>
