<template id="">
  <div class="toolbar">
    <img alt="logo" :src="icon" class="logo" />
    <h2>{{title}}</h2>
    <div class="button-block">
      <button
        :disabled="analysisType === 'forecasted'"
        :class="{'btn-active': timeRange ==='1m'}"
        value="1m"
        @click="$emit('update:time-range', '1m')"
      >
          1 Mo
      </button>
      <button
        :disabled="analysisType === 'forecasted'"
        :class="{'btn-active': timeRange ==='6m'}"
        value="6m"
        @click="$emit('update:time-range', '6m')"
      >
        6 Mo
      </button>
      <button
        :disabled="analysisType === 'forecasted'"
        :class="{'btn-active': timeRange ==='1y'}"
        value="1y"
        @click="$emit('update:time-range', '1y')"
      >
        1 Yr
      </button>
      <button
        :disabled="analysisType === 'forecasted'"
        :class="{'btn-active': timeRange ==='5y'}"
        value="5y"
        @click="$emit('update:time-range', '5y')"
      >
        5 Yr
      </button>
      <button
        :disabled="analysisType === 'forecasted'"
        :class="{'btn-active': timeRange ==='Max'}"
        value="Max"
        @click="$emit('update:time-range', 'Max')"
      >
        Max
      </button>
    </div>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    analysisType: String,
    title: String,
    icon: String,
    timeRange: String
  },
}
</script>
<style scoped>
.toolbar {
  width: 100%;
  padding: 10px;
  text-align: left;
  display: flex;
  align-items: baseline;
  background-color: white;
  box-shadow:0px 1px 1px #dddd;
}
.logo {
  margin-right: 5px;
}
button {
  padding: 10px 20px;
  background-color: #fff;
  border: 1px solid #efefef;
  border-radius: 0px;
}
.btn-active {
  color: white;
  background-color: #406ade;
}
.button-block {
  margin-left: 150px;
}
</style>
