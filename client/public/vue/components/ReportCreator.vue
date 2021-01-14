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
          <option>None Specified</option>
          <option value="fish">Fish</option>
          <option value="float">Float</option>
          <option value="float">Both</option>
          <option value="other">Other</option>
        </select>
        <label v-if="activity === 'fish'" for="numcaught">Number of Fish Caught</label>
        <input v-if="activity === 'fish'" type="number" name="numcaught" min="0" value="0" v-model="numCaught">
        <div v-if="activity === 'fish'" class="item-editor">
          <button class="button button-green --narrow --hollow" v-on:click="addFish" type="button" name="add fish">+ Add Fish Description</button>
          <div v-for="fish in allFish" class="item-editor__inputs">
            <button class="button button-red" v-on:click="removeFish(fish.id)" type="button">x</button>
            <label for="species">Species</label>
            <select name="species" v-on:input="setFishField(fish.id, 'species', $event)">
              <option>None Selected</option>
              <option v-for="s in species" v-bind:value="s.name">{{s.name}}</option>
            </select>
            <label for="length">Length</label>
            <input type="number" min="0" name="length" v-on:input="setFishField(fish.id, 'length', $event)">
            <label for="weight">Weight</label>
            <input type="number" min="0" name="weight" v-on:input="setFishField(fish.id, 'weight', $event)">
          </div>
        </div>
        <div v-if="activity === 'fish'" class="item-editor">
          <button class="button button-green --narrow --hollow" v-on:click="addFly" type="button" name="add fly">+ Add Fly Description</button>
          <div v-for="fly in allFlys" class="item-editor__inputs">
            <button class="button button-red" v-on:click="removeFly(fly.id)" type="button">x</button>
            <label for="method">Type</label>
            <select type="method" name="method" v-on:input="setFlyField(fly.id, 'method', $event)">
              <option>None Specified</option>
              <option value="nymph">Nymph</option>
              <option value="emerger">Emerger</option>
              <option value="dry">Dry Fly</option>
              <option value="terrestrial">Terrestrial(hopper, ants, etc)</option>
              <option value="streamer">Streamer</option>
            </select>
            <label for="name">Name</label>
            <input type="text" name="name" v-on:input="setFlyField(fly.id, 'name', $event)">
            <label for="color">Color</label>
            <input type="text" name="color" v-on:input="setFlyField(fly.id, 'color', $event)">
            <label for="size">Size</label>
            <input type="number" name="size" v-on:input="setFlyField(fly.id, 'size', $event)">
          </div>
        </div>
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
        activity: null,
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
      setFlyField(id, field, event) {
        const i = this.allFlys.findIndex(f => f.id === id);
        this.allFlys[i][field] = event.target.value;
      },
      setFishField(id, field, event) {
        const i = this.allFish.findIndex(f => f.id === id);
        this.allFish[i][field] = event.target.value;
      },
      removeFly(id) {
        const i = this.allFlys.findIndex(f => f.id === id);
        this.allFlys.splice(i, 1);
      },
      removeFish(id) {
        const i = this.allFish.findIndex(f => f.id === id);
        this.allFish.splice(i, 1);
      },
      submitReport(event) {
        event.preventDefault();
        console.log({
          title: this.title,
          author: this.user._id,
          activity: this.activity,
          numCaught: this.numCaught,
          fish: this.allFish,
          flys: this.allFlys,
          comment: this.comment
        })
      }
    }
  }
</script>
