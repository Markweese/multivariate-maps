<template>
  <div v-if="user" class="report-creator">
    <div :class="{'report-creator__wrapper': 1, '--map-open': pointSelectorOpen}">
      <button v-if="user" v-on:click="closeReport" v-on:keydown="trapFocus($event, 'top')" class="button button-red --narrow close-panel">X Scrap Report</button>
      <div class="flash-messages"></div>
      <form v-bind:action="`/site/${data.stationNumber}/report`" method="post">
        <label for="title">Report Title</label>
        <input type="text" name="title" placeholder="title" v-model="title"></input>
        <label for="date">Start Date</label>
        <input type="date" name="date" placeholder="date" v-model="date" v-bind:max="new Date().toISOString().split('T')[0]"></input>
        <label for="multiday">Multiday Trip</label>
        <label class="switch">
          <input name="multiday" type="checkbox" v-model="multiday">
          <span class="slider"></span>
        </label>
        <label v-if="multiday" for="endDate">End Date</label>
        <input v-if="multiday" type="date" name="endDate" placeholder="date" v-model="endDate" v-bind:max="new Date().toISOString().split('T')[0]"></input>
        <label for="activity">Activity</label>
        <select required placeholder="select activity" name="activity" v-model="activity">
          <option value="fish">Fish</option>
          <option value="float">Float</option>
          <option value="fishfloat">Both</option>
          <option value="other">Other</option>
        </select>
        <label v-if="activity.includes('other')" for="activitywritein">Activity</label>
        <input v-if="activity.includes('other')" type="text" name="activitywritein" placeholder="write activity here" v-model="activitywritein">
        <div class="section-header" v-if="activity.includes('fish')">
          <h3>Fishing Info</h3><button @click="showFishInfo = !showFishInfo" class="button button-blue --inline" type="button" aria-label="edit boat info">{{ showFishInfo ? 'Close ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('fish') && showFishInfo">
          <div v-if="activity.includes('fish')" class="item-editor">
            <button class="button button-green --narrow" v-on:click="addFish" type="button" name="add fish">+ Add Fish Description</button>
            <div v-for="(fish, index) in allFish" :key="fish.id" class="item-editor__inputs">
              <div class="item-editor__controls">
                <p class="collapsed-label">
                  {{index + 1}}. <span :class="{'--empty': !fish.species}">{{fish.species ? trimLabel(fish.species) : '--'}}</span>
                </p>
                <div class="control-buttons">
                  <button class="button button-blue --inline" v-on:click="fish.opened = !fish.opened" type="button" aria-label="edit fish">{{ fish.opened? 'Close ˄' : 'Edit ˅'}}</button>
                  <button class="button button-red --circular" v-on:click="removeFish(index)" type="button">x</button>
                </div>
              </div>
              <fieldset :class="{'--hidden' : !fish.opened}">
                <label for="species">Species</label>
                <select placeholder="select species" name="species" v-on:input="setFishField(index, 'species', $event)">
                  <option class="placeholder">Select a species</option>
                  <option v-for="s in species" v-bind:value="s.name">{{s.name}}</option>
                  <option value="other">Other</option>
                </select>
                <label v-if="fish.species === 'other'" for="specieswritein">Species Write In</label>
                <input v-if="fish.species === 'other'" type="text" name="specieswritein" v-on:input="setFishField(index, 'specieswritein', $event)" placeholder="write species here">
                <label for="length">Length</label>
                <input type="number" min="0" name="length" v-on:input="setFishField(index, 'length', $event)">
                <label for="weight">Weight</label>
                <input type="number" min="0" name="weight" v-on:input="setFishField(index, 'weight', $event)">
              </fieldset>
            </div>
          </div>
          <div v-if="activity.includes('fish')" class="item-editor">
            <button class="button button-green --narrow" v-on:click="addFly" type="button" name="add fly">+ Add Fly Description</button>
            <div v-for="(fly, index) in allFlys" :key="fly.id" class="item-editor__inputs">
              <div class="item-editor__controls">
                <p class="collapsed-label">
                  {{index + 1}}. <span :class="{'--empty': !fly.name}">{{fly.name ? trimLabel(fly.name) : '--'}}</span>
                </p>
                <div class="control-buttons">
                  <button class="button button-blue --inline" v-on:click="fly.opened = !fly.opened" type="button" aria-label="edit fly">{{ fly.opened? 'Close ˄' : 'Edit ˅'}}</button>
                  <button class="button button-red --circular" v-on:click="removeFly(index)" type="button">x</button>
                </div>
              </div>
              <fieldset :class="{'--hidden' : !fly.opened}">
                <label for="method">Type</label>
                <select placeholder="select type" type="text" name="method" v-on:input="setFlyField(index, 'method', $event)">
                  <option class="placeholder">Select A Type</option>
                  <option value="nymph">Nymph</option>
                  <option value="emerger">Emerger</option>
                  <option value="dry">Dry Fly</option>
                  <option value="terrestrial">Terrestrial(hopper, ants, etc)</option>
                  <option value="streamer">Streamer</option>
                  <option value="stimulator">Stimulator</option>
                </select>
                <label for="name">Name</label>
                <input type="text" name="name" v-on:input="setFlyField(index, 'name', $event)">
                <label for="color">Color</label>
                <input type="text" name="color" v-on:input="setFlyField(index, 'color', $event)">
                <label for="size">Size</label>
                <input type="number" name="size" v-on:input="setFlyField(index, 'size', $event)">
              </fieldset>
            </div>
          </div>
        </fieldset>
        <div class="section-header" v-if="activity.includes('float')">
          <h3>Boat Info</h3><button @click="showBoatInfo = !showBoatInfo" class="button button-blue --inline" type="button" aria-label="edit boat info">{{ showBoatInfo ? 'Close ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('float') && showBoatInfo">
          <label for="watercraft">Boat Type</label>
          <select placeholder="select type" v-if="activity.includes('float')" name="watercraft" v-model="watercraft">
            <option class="placeholder">Select A Type</option>
            <option value="drift">Drift Boat</option>
            <option value="raft">Raft</option>
            <option value="wwkayak">Whitewater Kayak</option>
            <option value="ifkayak">Inflatable Kayak</option>
            <option value="genkayak">Kayak</option>
            <option value="canoe">Canoe</option>
            <option value="motorized">Motorized Boat</option>
            <option value="other">Other</option>
          </select>
          <label v-if="watercraft === 'other'" for="watercraftwritein">Boat Type Write In</label>
          <input v-if="watercraft === 'other'" type="text" name="watercraftwritein" placeholder="write boat type here (EG: kayak, canoe, raft)" v-model="watercraftwritein">
          <label for="watercraftmake">Boat Make</label>
          <input type="text" name="watercraftmake" placeholder="write boat make here (EG: NRS, Clackacraft, Kokatat)" v-model="watercraftmake">
          <label for="watercraftmodel">Boat Model</label>
          <input type="text" name="watercraftmodel" placeholder="write boat model here" v-model="watercraftmodel">
          <label for="watercraftlength">Boat Length</label>
          <input type="number" name="watercraftlength" placeholder="write boat model here" v-model="watercraftlength">
          <label for="remember boat">Remember My Boat Info</label>
          <label class="switch">
            <input name="remember boat" type="checkbox" v-model="rememberBoat">
            <span class="slider"></span>
          </label>
        </fieldset>
        <div class="section-header" v-if="activity.includes('float')">
          <h3>Launch Info</h3><button @click="showLaunchInfo = !showLaunchInfo" class="button button-blue --inline" type="button" aria-label="edit launch info">{{ showLaunchInfo ? 'Close ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('float') && showLaunchInfo">
          <label for="putInName">Put In Name</label>
          <input  name="putInName" v-model="putInName"></input>
          <label for="putInLocation">Put In Location</label>
          <span v-if="putInLocation">{{`${putInLocation[0]}, ${putInLocation[1]}`}}</span><button type="button" class="button button-green --narrow" v-on:click="openPointSelector('putInLocation', 'Put In')" data-out-target="putInLocation" name="select point on map">{{putInLocation ? 'Change Put In Location' : '+ Add Put In On Map'}}</button>
          <label for="takeOutName">Take Out Name</label>
          <input name="takeOutName" v-model="takeOutName"></input>
          <label for="takeOutLocation">Take Out Location</label>
          <span v-if="takeOutLocation">{{`${takeOutLocation[0]}, ${takeOutLocation[1]}`}}</span><button type="button" data-out-target="takeOutLocation" class="button button-green --narrow" v-on:click="openPointSelector('takeOutLocation', 'Take Out')" name="select point on map">{{takeOutLocation ? 'Change Take Out Location' : '+ Add Take Out On Map'}}</button>
        </fieldset>
        <div class="section-header" v-if="activity.includes('float')">
          <h3>Rapid & Obstacle Info</h3><button @click="showObstacleInfo = !showObstacleInfo" class="button button-blue --inline" type="button" aria-label="edit obstacle info">{{ showObstacleInfo ? 'Close ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('float') && showObstacleInfo" class="item-editor">
          <button class="button button-green --narrow" v-on:click="addObstacle" type="button" name="add obstacle" data-out-target="allObstacles">+ Add Obstacle Description</button>
          <div v-for="(obstacle, index) in allObstacles" :key="obstacle.id" class="item-editor__inputs">
            <div class="item-editor__controls">
              <p class="collapsed-label">
                {{index + 1}}. <span :class="{'--empty': !obstacle.name}">{{obstacle.name ? trimLabel(obstacle.name) : '--'}}</span>
              </p>
              <div class="control-buttons">
                <button class="button button-blue --inline" v-on:click="obstacle.opened = !obstacle.opened" type="button" aria-label="edit obstacle">{{ obstacle.opened? 'Close ˄' : 'Edit ˅'}}</button>
                <button class="button button-red --circular" v-on:click="removeObstacle(index)" type="button">x</button>
              </div>
            </div>
            <fieldset :class="{'--hidden' : !obstacle.opened}">
              <label for="name">Name</label>
              <input placeholder="optional" type="text" name="name" v-on:input="setObstacleField(index, 'name', $event)">
              <label for="obstacle">Type</label>
              <select placeholder="select obstacle type" type="text" name="obstacle" v-on:input="setObstacleField(index, 'obstacle', $event)">
                <option class="placeholder">Select a type</option>
                <option value="rapid">Rapid</option>
                <option value="strainersweeper">Strainer/Sweeper</option>
                <option value="rockboulder">Rocks/Boulders</option>
                <option value="spillway">Dam/Spillway</option>
                <option value="wingdam">Wing Dam</option>
                <option value="manmadeobstruction">Manmade Obstruction</option>
                <option value="other">Other</option>
              </select>
              <label v-if="obstacle.obstacle === 'other'" for="write in">Obstacle Write In</label>
              <input v-if="obstacle.obstacle === 'other'" type="text" name="write in" v-on:input="setObstacleField(index, 'writein', $event)" placeholder="write obstacle type here">
              <label for="name">Description</label>
              <textarea placeholder="describe the obstacle here" type="text" name="name" v-on:input="setObstacleField(index, 'description', $event)"></textarea>
              <label for="obstacle location">Obstacle Location</label>
              <span v-if="obstacle.coordinates" class="lat-lng">{{`${obstacle.coordinates[0]}, ${obstacle.coordinates[1]}`}}</span><button type="button" class="button button-green --inline" v-on:click="openPointSelector('allObstacles', 'Obstacle', {index, field: 'coordinates'})" name="select obstacle on map">{{obstacle.coordinates ? 'Change Obstacle Location' : '+ Add Obstacle On Map'}}</button>
              <label for="incident occurred">Incident Occurred (flipped, pinned, or person thrown overboard)</label>
              <label class="switch">
                <input v-on:input="setObstacleField(index, 'incidentOccurred', $event)" name="incident occurred" type="checkbox">
                <span class="slider"></span>
              </label>
            </fieldset>
          </div>
        </fieldset>
        <label for="comments">Trip Notes</label>
        <textarea name="comments" rows="8" cols="80" maxlength="30000" v-model="comment"></textarea>
        <label for="private">Make Report Private</label>
        <label class="switch">
          <input name="private" type="checkbox" v-model="isPrivate">
          <span class="slider"></span>
        </label>
        <button class="button button-blue" type="submit" name="submit" v-on:click="submitReport" v-on:keydown="trapFocus($event, 'bottom')">Log Your Report</button>
      </form>
      <PointSelector v-if="pointSelectorOpen" v-on:coordinateOut="logCoordinate" v-bind:coordinates="data.coordinates" v-bind:context="pointSelectorContext"></PointSelector>
    </div>
  </div>
</template>

<script>
  // dependencies
  import axios from 'axios';
  import species from '../../../data/species';
  import { FlashUtils } from '../mixins/flashUtils.js';
  import PointSelector from '../components/PointSelector.vue';

  export default {
    props: [
      'data',
      'user'
    ],

    data() {
      return {
        allFish: [],
        allFlys: [],
        allObstacles: [],
        title: null,
        comment: null,
        date: null,
        multiday: false,
        startDate: this.date,
        endDate: null,
        watercraft: this.user.waterCraft ? this.user.waterCraft.category : null,
        watercraftwritein: this.user.waterCraft ? this.user.waterCraft.writein : null,
        watercraftlength: this.user.waterCraft ? this.user.waterCraft.length : null,
        watercraftmake: this.user.waterCraft ? this.user.waterCraft.make : null,
        watercraftmodel: this.user.waterCraft ? this.user.waterCraft.model : null,
        putInName: null,
        putInLocation: null,
        takeOutName: null,
        takeOutLocation: null,
        activity: this.user.activity ? this.user.activity : '',
        activitywritein: null,
        species: species,
        isPrivate: false,
        rememberBoat: this.user.waterCraft.category ? true : false,
        showFishInfo: false,
        showBoatInfo: false,
        showLaunchInfo: false,
        showObstacleInfo: false,
        pointSelectorOpen: false,
        pointSelectorContext: null,
        flashMessages: document.querySelector('.flash-messages')
      }
    },

    mounted() {
      document.querySelector('input[name="title"]').focus()
    },

    computed: {
      registeredPH() {
        if (this.date && this.data.ph && this.data.ph.length) {
          const startDate = new Date(this.date);
          const day = startDate.getDay() + 1;
          const month = startDate.getMonth() + 1;
          const result = this.data.ph.filter(ph => {ph.date === `${month}/${day}`});

          return result.length ? result[0].reading : null
        } else {
          return null;
        }
      },
      registeredCFS() {
        if (this.date && this.data.cfs && this.data.cfs.length) {
          const startDate = new Date(this.date);
          const day = startDate.getDate() + 1;
          const month = startDate.getMonth() + 1;
          const result = this.data.cfs.filter(cfs => cfs.date === `${month}/${day}`);

          return result.length ? result[0].reading : null
        } else {
          return null;
        }
      },
      registeredTemp() {
        if (this.date && this.data.temp && this.data.temp.length) {
          const startDate = new Date(this.date);
          const day = startDate.getDay() + 1;
          const month = startDate.getMonth() + 1;
          const result = this.data.temp.filter(temp => {temp.date === `${month}/${day}`});

          return result.length ? result[0].reading : null
        } else {
          return null;
        }
      },
      registeredConductance() {
        if (this.date && this.data.conductance && this.data.conductance.length) {
          const startDate = new Date(this.date);
          const day = startDate.getDay() + 1;
          const month = startDate.getMonth() + 1;
          const result = this.data.conductance.filter(conductance => {conductance.date === `${month}/${day}`});

          return result.length ? result[0].reading : null
        } else {
          return null;
        }
      }
    },

    methods: {
      trimLabel(s) {
        if (window.innerWidth < 650) {
          return `${s.substring(0, 5)}...`;
        } else {
            return `${s.substring(0, 25)}...`;
        }
      },
      trapFocus(e, place) {
        if (place === 'top') {
          if (e.shiftKey && event.key === 'Tab') {
            e.preventDefault();
          }
        }

        if (place === 'bottom') {
          if (!e.shiftKey && event.key === 'Tab') {
            e.preventDefault();
          }
        }
      },
      closeReport() {
        this.$emit('deactivate', false);
      },
      addFly() {
        const id = Math.random().toString(36).substring(7);
        this.allFlys.forEach(f => f.opened = false);
        this.allFlys.push({id, method: null, name: null, size: null, color: null, opened: true})
      },
      addFish() {
        const id = Math.random().toString(36).substring(7);
        this.allFish.forEach(f => f.opened = false);
        this.allFish.push({id, species: null, specieswritein: null, length: null, weight: null, opened: true})
      },
      addObstacle() {
        const id = Math.random().toString(36).substring(7);
        this.allObstacles.forEach(o => o.opened = false);
        this.allObstacles.push({id, obstacle: null, writein: null, description: null, incidentOccurred: false, opened: true})
      },
      setFlyField(i, field, event) {
        this.allFlys[i][field] = event.target.value;
      },
      setFishField(i, field, event) {
        this.allFish[i][field] = event.target.value;
      },
      setObstacleField(i, field, event) {
        if (event.target.type === 'checkbox') {
          this.allObstacles[i][field] = event.target.checked;
        } else {
            this.allObstacles[i][field] = event.target.value;
        }
      },
      removeFly(i) {
        this.allFlys.splice(i, 1);
      },
      removeFish(i) {
        this.allFish.splice(i, 1);
      },
      removeObstacle(i) {
        this.allObstacles.splice(i, 1);
      },
      openPointSelector(context, name, deepWrite) {
        this.pointSelectorOpen = true;
        this.pointSelectorContext = {
            dataset: context,
            name: name,
            deepWrite: deepWrite ? deepWrite : null
          };
      },
      logCoordinate(coordinate) {
        this.pointSelectorOpen = false;
        document.querySelector(`*[data-out-target="${this.pointSelectorContext.dataset}"]`).focus();

        if (this.pointSelectorContext.deepWrite) {
          this[this.pointSelectorContext.dataset][this.pointSelectorContext.deepWrite.index][this.pointSelectorContext.deepWrite.field] = coordinate;
        } else {
          this[this.pointSelectorContext.dataset] = coordinate;
        }
      },
      submitReport(event) {
        event.preventDefault();

        axios({
          method: 'post',
          url: `/site/${this.data.stationNumber}/report`,
          data: {
            stationNumber: this.data.stationNumber,
            title: this.title,
            startDate: this.date,
            endDate: this.endDate,
            conditions: {
              cfs: this.registeredCFS,
              temp: this.registeredTemp,
              ph: this.registeredPH,
              conductance: this.registeredConductance
            },
            author: this.user.name,
            authorId: this.user._id,
            state: this.data.state,
            created: new Date().toJSON().slice(0,10).replace(/-/g,'/'),
            activity: this.activity === 'fishfloat' ? 'both' : this.activity,
            activitywritein: this.activitywritein,
            numCaught: this.allFish.length,
            fish: this.allFish,
            flys: this.allFlys,
            comment: this.comment,
            watercraft: this.watercraft,
            watercraftwritein: this.watercraftwritein,
            watercraftmake: this.watercraftmake,
            watercraftmodel: this.watercraftmodel,
            watercraftlength: this.watercraftlength,
            putInName: this.putInName,
            putInLocation: this.putInLocation,
            obstacles: this.allObstacles,
            takeOutName: this.takeOutName,
            takeOutLocation: this.takeOutLocation,
            isPrivate: this.isPrivate,
            rememberBoat: this.rememberBoat
          }
        })
        .then(res => {
          if (res.data.status === 200) {
            this.flashMessages.appendChild(this.generateSuccess('Successfully created report, <a href="/reports">view your reports</a>'));
            this.closeReport();
          } else if (res.data.errors.length) {

             res.data.errors.forEach(e => {
                document.querySelector('.report-creator .flash-messages').appendChild(this.generateError(e.msg));
              });

              document.querySelector('.report-creator .flash-messages').scrollIntoView();

          }
        });
      }
    },

    components: {
      PointSelector
    },

    mixins: [
      FlashUtils
    ]
  }
</script>
