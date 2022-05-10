import axios from 'axios';

const DataHandlers = {
  methods: {
    isStationTracked(stationNumber) {
      axios.get('/api/stations/tracked').then(res => {
        return res.data.includes(stationNumber);
      });
    },

    getTrackedStations() {
      axios.get('/api/stations/tracked').then(res => {
        this.trackedStations = res.data
      });
    },

    isTrackedByUser(stationNumber) {
      return this.user && this.user.stations.includes(stationNumber);
    },

    flagStationInactive(stationNumber) {
      axios.post(`/station/flag/${stationNumber}`);
    },

    addStationToList(stationNumber) {
      axios.post(`/station/add/${stationNumber}`);
    },

    getTrackingStatus(stationNumber) {
      axios.get('/api/stations/tracked').then(res => {
        this.isTracked = res.data.includes(stationNumber)
      });
    },

    trackStation(stationNumber, stationName) {
      let errorMessage = this.generateFlashMessage(stationNumber, stationName, 'error');
      let compileMessage = this.generateFlashMessage(stationNumber, stationName, 'pending');
      let successMessage = this.generateFlashMessage(stationNumber, stationName, 'success');

      this.flashMessages.appendChild(compileMessage);

      axios.get(`/api/station/new/${stationNumber}`, {
        headers: {
          'user': this.user.email,
          'token': this.user.sessionToken
        }
      })
      .then(res => {
        compileMessage.remove();

        if (res.data.code === 0 || !res.data.response[0].cfs.length) {
          this.usgsData.flagged = true;
          this.flashMessages.appendChild(errorMessage);
          this.flagStationInactive(stationNumber);
        } else {
          this.flashMessages.appendChild(successMessage);
          this.addStationToList(stationNumber);
        }
      }).catch(e => {
        compileMessage.remove();
        this.flashMessages.appendChild(errorMessage);
      });
    },
  }
}

export {
  DataHandlers
}
