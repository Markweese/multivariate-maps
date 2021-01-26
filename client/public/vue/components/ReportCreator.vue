<template>
  <div v-if="user" class="report-creator">
    <div class="report-creator__wrapper">
      <button v-if="user" v-on:click="closeReport" class="button button-red --narrow close-panel">X Scrap Report</button>
      <form action="index.html" method="post">
        <label for="title">Report Title</label>
        <input type="text" name="title" placeholder="title" v-model="title"></input>
        <label for="author">Author</label>
        <input type="text" name="author" v-bind:value="user.name" readonly></input>
        <label for="activity">Activity</label>
        <select name="activity" v-model="activity">
          <option value="fish">Fish</option>
          <option value="float">Float</option>
          <option value="fish,float">Both</option>
          <option value="other">Other</option>
        </select>
        <label v-if="activity.includes('other')" for="activitywritein">Activity</label>
        <input v-if="activity.includes('other')" type="activitywritein" name="activitywritein" placeholder="write activity here..." v-model="activitywritein">
        <label v-if="activity.includes('fish')" for="numcaught">Number of Fish Caught</label>
        <input v-if="activity.includes('fish')" type="number" name="numcaught" min="0" value="0" v-model="numCaught">
        <div v-if="activity.includes('fish')" class="item-editor">
          <button class="button button-green --narrow --hollow" v-on:click="addFish" type="button" name="add fish">+ Add Fish Description</button>
          <div v-for="(fish, index) in allFish" :key="fish.id" class="item-editor__inputs">
            <button class="button button-red" v-on:click="removeFish(index)" type="button">x</button>
            <div class="item-editor--writein-block">
              <label for="species">Species</label>
              <select name="species" v-on:input="setFishField(index, 'species', $event)">
                <option value="other">write in species</option>
                <option v-for="s in species" v-bind:value="s.name">{{s.name}}</option>
              </select>
              <input v-if="allFish[index].species && allFish[index].species === 'other'" type="text" name="specieswritein" placeholder="write species here..." v-on:input="setFishField(index, 'species', $event)">
            </div>
            <label for="length">Length</label>
            <input type="number" min="0" name="length" v-on:input="setFishField(index, 'length', $event)">
            <label for="weight">Weight</label>
            <input type="number" min="0" name="weight" v-on:input="setFishField(index, 'weight', $event)">
          </div>
        </div>
        <div v-if="activity.includes('fish')" class="item-editor">
          <button class="button button-green --narrow --hollow" v-on:click="addFly" type="button" name="add fly">+ Add Fly Description</button>
          <div v-for="(fly, index) in allFlys" :key="fly.id" class="item-editor__inputs">
            <button class="button button-red" v-on:click="removeFly(index)" type="button">x</button>
            <label for="method">Type</label>
            <select type="method" name="method" v-on:input="setFlyField(index, 'method', $event)">
              <option value="nymph">Nymph</option>
              <option value="emerger">Emerger</option>
              <option value="dry">Dry Fly</option>
              <option value="terrestrial">Terrestrial(hopper, ants, etc)</option>
              <option value="streamer">Streamer</option>
            </select>
            <label for="name">Name</label>
            <input type="text" name="name" v-on:input="setFlyField(index, 'name', $event)">
            <label for="color">Color</label>
            <input type="text" name="color" v-on:input="setFlyField(index, 'color', $event)">
            <label for="size">Size</label>
            <input type="number" name="size" v-on:input="setFlyField(index, 'size', $event)">
          </div>
        </div>
        <label v-if="activity.includes('float')" for="watercraft">Boat Type</label>
        <select v-if="activity.includes('float')" name="watercraft" v-model="watercraft">
          <option value="drift">Drift Boat</option>
          <option value="raft">Raft</option>
          <option value="wwkayak">Whitewater Kayak</option>
          <option value="ifkayak">Inflatable Kayak</option>
          <option value="genkayak">Kayak</option>
          <option value="canoe">Canoe</option>
          <option value="motorized">Motorized Boat</option>
          <option value="other">Other</option>
        </select>
        <label v-if="watercraft === 'other'" for="watercraftwritein">Boat Type</label>
        <input v-if="watercraft === 'other'" type="watercraftwritein" name="watercraftwritein" placeholder="write activity here..." v-model="watercraftwritein">
        <label v-if="activity.includes('float')" for="watercraftmake">Boat Make</label>
        <input v-if="activity.includes('float')" type="watercraftmake" name="watercraftmake" placeholder="write boat make here (EG: NRS, Clackacraft, Kokatat)..." v-model="watercraftmake">
        <label for="comments">Comments</label>
        <textarea name="comments" rows="8" cols="80" maxlength="255" v-model="comment"></textarea>
        <button class="button button-blue --narrow" type="submit" name="submit" v-on:click="submitReport">Log Your Report</button>
      </form>
    </div>
  </div>
</template>

<script>
  // dependencies
  import species from '../../../data/species';

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
        activity: [],
        activitywritein: null,
        numCaught: null,
        species: species
      }
    },

    methods: {
      closeReport() {
        this.$emit('deactivate', false);
      },
      addFly() {
        const id = Math.random().toString(36).substring(7);
        this.allFlys.push({id, method: null, name: null, size: null, color: null})
      },
      addFish() {
        const id = Math.random().toString(36).substring(7);
        this.allFish.push({id, species: null, length: null, weight: null})
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
          watercraft: this.watercraftwritein ? this.watercraftwritein : this.watercraft
        })
      }
    }
  }
</script>
