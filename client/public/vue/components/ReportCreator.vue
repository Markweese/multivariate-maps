<template>
  <div v-if="user" class="report-creator">
    <div :class="{'report-creator__wrapper': 1, '--map-open': pointSelectorOpen}">
      <button v-if="user" v-on:click="closeReport" class="button button-red --narrow close-panel">X Scrap Report</button>
      <form action="index.html" method="post">
        <label for="title">Report Title</label>
        <input type="text" name="title" placeholder="title" v-model="title"></input>
        <label for="activity">Activity</label>
        <select placeholder="select activity" name="activity" v-model="activity">
          <option class="placeholder">Select An Activity</option>
          <option value="fish">Fish</option>
          <option value="float">Float</option>
          <option value="fish,float">Both</option>
          <option value="other">Other</option>
        </select>
        <label v-if="activity.includes('other')" for="activitywritein">Activity</label>
        <input v-if="activity.includes('other')" type="activitywritein" name="activitywritein" placeholder="write activity here" v-model="activitywritein">
        <label v-if="activity.includes('fish')" for="numcaught">Number of Fish Caught</label>
        <input v-if="activity.includes('fish')" type="number" name="numcaught" min="0" value="0" v-model="numCaught">
        <div v-if="activity.includes('fish')" class="item-editor">
          <button class="button button-green --narrow --hollow" v-on:click="addFish" type="button" name="add fish">+ Add Fish Description</button>
          <div v-for="(fish, index) in allFish" :key="fish.id" class="item-editor__inputs">
            <button class="button button-red --circular" v-on:click="removeFish(index)" type="button">x</button>
            <span v-if="!fish.opened" class="collapsed-label">
              Species: {{fish.species}} | Length: {{fish.length}} | Weight: {{fish.weight}}
            </span>
            <button class="button button-blue --inline" v-on:click="fish.opened = !fish.opened" type="button" aria-label="expand fish">{{ fish.opened? 'Collapse ˄' : 'Expand ˅'}}</button>
            <fieldset :class="{'--hidden': !fish.opened}">
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
          <button class="button button-green --narrow --hollow" v-on:click="addFly" type="button" name="add fly">+ Add Fly Description</button>
          <div v-for="(fly, index) in allFlys" :key="fly.id" class="item-editor__inputs">
            <button class="button button-red --circular" v-on:click="removeFly(index)" type="button">x</button>
            <span v-if="!fly.opened" class="collapsed-label">
              Name: {{fly.name}} | color: {{fly.color}} | size: {{fly.size}}
            </span>
            <button class="button button-blue --inline" v-on:click="fly.opened = !fly.opened" type="button" aria-label="expand fly">{{ fly.opened? 'Collapse ˄' : 'Expand ˅'}}</button>
            <fieldset :class="{'--hidden': !fly.opened}">
              <label for="method">Type</label>
              <select placeholder="select type" type="method" name="method" v-on:input="setFlyField(index, 'method', $event)">
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
        <fieldset v-if="activity.includes('float')">
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
          <input v-if="watercraft === 'other'" type="watercraftwritein" name="watercraftwritein" placeholder="write boat type here (EG: kayak, canoe, raft)" v-model="watercraftwritein">
          <label for="watercraftmake">Boat Make</label>
          <input type="watercraftmake" name="watercraftmake" placeholder="write boat make here (EG: NRS, Clackacraft, Kokatat)" v-model="watercraftmake">
          <label for="watercraftmodel">Boat Model</label>
          <input type="watercraftmodel" name="watercraftmodel" placeholder="write boat model here" v-model="watercraftmodel">
        </fieldset>
        <fieldset v-if="activity.includes('float')">
          <label for="putInName">Put In Name</label>
          <input  name="putInName" v-model="putInName"></input>
          <label for="putInLocation">Put In Location</label>
          <span v-if="putInLocation">{{`${putInLocation.lat}, ${putInLocation.lng}`}}</span><button type="button" class="button button-green --narrow --hollow" v-on:click="openPointSelector('putInLocation', 'Put In')" name="select point on map">{{putInLocation ? 'Change Put In Location' : '+ Add Put In On Map'}}</button>
          <label for="takeOutName">Take Out Name</label>
          <input name="takeOutName" v-model="takeOutName"></input>
          <label for="takeOutLocation">Take Out Location</label>
          <span v-if="takeOutLocation">{{`${takeOutLocation.lat}, ${takeOutLocation.lng}`}}</span><button type="button" class="button button-green --narrow --hollow" v-on:click="openPointSelector('takeOutLocation', 'Take Out')" name="select point on map">{{takeOutLocation ? 'Change Take Out Location' : '+ Add Take Out On Map'}}</button>
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
        title: null,
        comment: null,
        watercraft: null,
        watercraftwritein: null,
        watercraftmake: null,
        watercraftmodel: null,
        putInName: null,
        putInLocation: null,
        takeOutName: null,
        takeOutLocation: null,
        activity: [],
        activitywritein: null,
        numCaught: null,
        species: species,
        isPrivate: false,
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
        this.allFish.push({id, species: null, length: null, weight: null, opened: true})
      },
      setFlyField(i, field, event) {
        this.allFlys[i][field] = event.target.value;
      },
      setFishField(i, field, event) {
        this.allFish[i][field] = event.target.value;
      },
      removeFly(i) {
        this.allFlys.splice(i, 1);
      },
      removeFish(i) {
        this.allFish.splice(i, 1);
      },
      openPointSelector(context, name) {
        this.pointSelectorOpen = true;
        this.pointSelectorContext = {
            dataset: context,
            name: name
          };
      },
      logCoordinate(coordinate) {
        this.pointSelectorOpen = false;

        this[this.pointSelectorContext.dataset] = coordinate;
      },
      submitReport(event) {
        event.preventDefault();
        console.log({
          title: this.title,
          author: this.user._id,
          activity: this.activitywritein ? [this.activitywritein] : this.activity.split(','),
          numCaught: this.numCaught,
          fish: this.allFish,
          flys: this.allFlys,
          comment: this.comment,
          watercraft: this.watercraftwritein ? this.watercraftwritein : this.watercraft,
          watercraftmake: this.watercraftmake,
          watercraftmodel: this.watercraftmodel,
          putIn: this.putIn,
          takeOut: this.takeOut,
          isPrivate: this.isPrivate
        })
      }
    },

    components: {
      PointSelector
    }
  }
</script>
