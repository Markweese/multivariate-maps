<template>
  <div class="selector-map">
    <div class="selector-map--controls">
      <button @click="$emit('deactivate')" class="button button-red" type="button" name="close map" @keydown="trapFocus($event, 'top')">Close Map X</button>
    </div>
    <div id="viewerMap" class="__mapbox-map">
    </div>
  </div>
</template>
<script>
  export default {
    props: [
      'points'
    ],

    data() {
      return {
        googleMap: null,
        pointSelected: false,
        mapOptions: {
          zoom:10
        },
        currentMarker: null,
        selectedLatLng: null,
        infoWindow: null
      }
    },

    mounted: function(){
      var bounds = new google.maps.LatLngBounds();
      const map = document.getElementById('viewerMap');
      this.infoWindow = new google.maps.InfoWindow();

      document.querySelector('button[name="close map"]').focus();
      this.googleMap = new google.maps.Map(map, this.mapOptions);

      if (this.points.length) {
        this.points.forEach(p => {
          const marker = new google.maps.Marker({
            map: this.googleMap,
            position: p.latLng,
            icon: p.icon ? p.icon : null
          });

          marker.place = p.place;

          marker.addListener('click', () => {
            let html = `<div class="__popup">
                  ${marker.place.name ? `<h2>${marker.place.name}</h2>` : ''}
                  ${marker.place.type ? `<p>Type: ${marker.place.name}</p>` : ''}
                  ${marker.place.incidentOccurred ? '<p>Incident Occurred</p>' : ''}
                  ${marker.place.comment ? `<p>${marker.place.comment}</p>` : ''}
                  ${marker.place.coordinates ? `<a target="_blank" href="https://www.google.com/maps/place/${marker.place.coordinates[0]},${marker.place.coordinates[1]}" class="text-button --blue" value="Get Directions">Get Directions</a>` : ''}
                </div>`;

            this.infoWindow.setContent(html);
            this.infoWindow.open(this.googleMap, marker);
          });

          bounds.extend(p.latLng);
        });

        this.googleMap.setCenter(bounds.getCenter());
        this.googleMap.fitBounds(bounds);
      }

      google.maps.event.addDomListener(map, 'keydown', (event) => {
        if(event.target.title === 'Zoom out') {
          this.trapFocus(event, 'bottom');
        }
      });
    },

    methods: {
      trapFocus(e, place) {
        if (place === 'top') {
          if (e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
          }
        }

        if (place === 'bottom') {
          if (!e.shiftKey && e.key === 'Tab') {
            e.preventDefault();
          }
        }
      },
    }
  }
</script>
