<template>
  <div v-if="user" class="report-creator">
    <div :class="{'report-creator__wrapper': 1, '--map-open': pointSelectorOpen}">
      <button v-if="user" v-on:click="closeReport" class="button button-red --narrow close-panel">X Scrap Report</button>
      <form action="index.html" method="post">
        <label for="title">Report Title</label>
        <input type="text" name="title" placeholder="title" v-model="title"></input>
        <label for="activity">Activity</label>
        <select placeholder="select activity" name="activity" v-model="activity">
          <option value="fish">Fish</option>
          <option value="float">Float</option>
          <option value="fishfloat">Both</option>
          <option value="other">Other</option>
        </select>
        <label v-if="activity.includes('other')" for="activitywritein">Activity</label>
        <input v-if="activity.includes('other')" type="text" name="activitywritein" placeholder="write activity here" v-model="activitywritein">
        <div class="section-header" v-if="activity.includes('fish')">
          <h3>Fishing Info</h3><button @click="showFishInfo = !showFishInfo" class="button button-blue --inline" type="button" aria-label="edit boat info">{{ showFishInfo ? 'Collapse ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('fish') && showFishInfo">
          <div v-if="activity.includes('fish')" class="item-editor">
            <button class="button button-green --narrow" v-on:click="addFish" type="button" name="add fish">+ Add Fish Description</button>
            <div v-for="(fish, index) in allFish" :key="fish.id" class="item-editor__inputs">
              <button class="button button-red --circular" v-on:click="removeFish(index)" type="button">x</button>
              <span v-if="!fish.opened" class="collapsed-label">
                Species: {{fish.species}} | Length: {{fish.length}}
              </span>
              <button class="button button-blue --inline" v-on:click="fish.opened = !fish.opened" type="button" aria-label="edit fish">{{ fish.opened? 'Collapse ˄' : 'Edit ˅'}}</button>
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
              <button class="button button-red --circular" v-on:click="removeFly(index)" type="button">x</button>
              <span v-if="!fly.opened" class="collapsed-label">
                Name: {{fly.name}} | color: {{fly.color}}
              </span>
              <button class="button button-blue --inline" v-on:click="fly.opened = !fly.opened" type="button" aria-label="edit fly">{{ fly.opened? 'Collapse ˄' : 'Edit ˅'}}</button>
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
          <h3>Boat Info</h3><button @click="showBoatInfo = !showBoatInfo" class="button button-blue --inline" type="button" aria-label="edit boat info">{{ showBoatInfo ? 'Collapse ˄' : 'Edit ˅'}}</button>
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
          <h3>Launch Info</h3><button @click="showLaunchInfo = !showLaunchInfo" class="button button-blue --inline" type="button" aria-label="edit launch info">{{ showLaunchInfo ? 'Collapse ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('float') && showLaunchInfo">
          <label for="putInName">Put In Name</label>
          <input  name="putInName" v-model="putInName"></input>
          <label for="putInLocation">Put In Location</label>
          <span v-if="putInLocation">{{`${putInLocation.lat}, ${putInLocation.lng}`}}</span><button type="button" class="button button-green --narrow" v-on:click="openPointSelector('putInLocation', 'Put In')" name="select point on map">{{putInLocation ? 'Change Put In Location' : '+ Add Put In On Map'}}</button>
          <label for="takeOutName">Take Out Name</label>
          <input name="takeOutName" v-model="takeOutName"></input>
          <label for="takeOutLocation">Take Out Location</label>
          <span v-if="takeOutLocation">{{`${takeOutLocation.lat}, ${takeOutLocation.lng}`}}</span><button type="button" class="button button-green --narrow" v-on:click="openPointSelector('takeOutLocation', 'Take Out')" name="select point on map">{{takeOutLocation ? 'Change Take Out Location' : '+ Add Take Out On Map'}}</button>
        </fieldset>
        <div class="section-header" v-if="activity.includes('float')">
          <h3>Rapid & Obstacle Info</h3><button @click="showObstacleInfo = !showObstacleInfo" class="button button-blue --inline" type="button" aria-label="edit obstacle info">{{ showObstacleInfo ? 'Collapse ˄' : 'Edit ˅'}}</button>
        </div>
        <fieldset v-if="activity.includes('float') && showObstacleInfo" class="item-editor">
          <button class="button button-green --narrow" v-on:click="addObstacle" type="button" name="add obstacle">+ Add Obstacle Description</button>
          <div v-for="(obstacle, index) in allObstacles" :key="obstacle.id" class="item-editor__inputs">
            <button class="button button-red --circular" v-on:click="removeObstacle(index)" type="button">x</button>
            <span v-if="!obstacle.opened" class="collapsed-label">
              Name: {{obstacle.name}}
            </span>
            <button class="button button-blue --inline" v-on:click="obstacle.opened = !obstacle.opened" type="button" aria-label="edit obstacle">{{ obstacle.opened? 'Collapse ˄' : 'Edit ˅'}}</button>
            <fieldset :class="{'--hidden' : !obstacle.opened}">
              <label for="name">Name</label>
              <input placeholder="optional" type="text" name="name" v-on:input="setObstacleField(index, 'name', $event)">
              <label for="type">Type</label>
              <select placeholder="select obstacle type" type="text" name="type" v-on:input="setObstacleField(index, 'type', $event)">
                <option class="placeholder">Select a type</option>
                <option value="rapid">Rapid</option>
                <option value="strainersweeper">Strainer/Sweeper</option>
                <option value="rockboulder">Rocks/Boulders</option>
                <option value="spillway">Dam/Spillway</option>
                <option value="wingdam">Wing Dam</option>
                <option value="manmadeobstruction">Manmade Obstruction</option>
                <option value="other">Other</option>
              </select>
              <label v-if="obstacle.type === 'other'" for="obstaclewritein">Obstacle Write In</label>
              <input v-if="obstacle.type === 'other'" type="text" name="obstaclewritein" v-on:input="setObstacleField(index, 'obstaclewritein', $event)" placeholder="write obstacle type here">
              <label for="name">Description</label>
              <textarea placeholder="describe the obstacle here" type="text" name="name" v-on:input="setObstacleField(index, 'description', $event)"></textarea>
              <label for="obstacle location">Obstacle Location</label>
              <span v-if="obstacle.location" class="lat-lng">{{`${obstacle.location.lat}, ${obstacle.location.lng}`}}</span><button type="button" class="button button-green --inline" v-on:click="openPointSelector('allObstacles', 'Obstacle', {index, field: 'location'})" name="select obstacle on map">{{obstacle.location ? 'Change Obstacle Location' : '+ Add Obstacle On Map'}}</button>
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
        <button class="button button-blue" type="submit" name="submit" v-on:click="submitReport">Log Your Report</button>
      </form>
      <PointSelector v-if="pointSelectorOpen" v-on:coordinateOut="logCoordinate" v-bind:coordinates="data.coordinates" v-bind:context="pointSelectorContext"></PointSelector>
    </div>
  </div>
</template>

<script>
  // dependencies
  import species from '../../../data/species';
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
        watercraft: null,
        watercraftwritein: null,
        watercraftlength: null,
        watercraftmake: null,
        watercraftmodel: null,
        putInName: null,
        putInLocation: null,
        takeOutName: null,
        takeOutLocation: null,
        activity: this.user.activity ? this.user.activity : '',
        activitywritein: null,
        species: species,
        isPrivate: false,
        rememberBoat: false,
        showFishInfo: false,
        showBoatInfo: false,
        showLaunchInfo: false,
        showObstacleInfo: false,
        pointSelectorOpen: false,
        pointSelectorContext: null
      }
    },

    methods: {
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
        this.allObstacles.push({id, type: null, obstaclewritein: null, description: null, incidentOccurred: false, opened: true})
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

        if (this.pointSelectorContext.deepWrite) {
          this[this.pointSelectorContext.dataset][this.pointSelectorContext.deepWrite.index][this.pointSelectorContext.deepWrite.field] = coordinate;
        } else {
          this[this.pointSelectorContext.dataset] = coordinate;
        }
      },
      submitReport(event) {
        event.preventDefault();
        console.log({
          title: this.title,
          author: this.user._id,
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
        })
      }
    },

    components: {
      PointSelector
    }
  }
</script>
