<template id="">
  <div class="toolbar">
    <img alt="logo" :src="icon" class="logo" />
    <h2>{{title}}</h2>
  </div>
</template>
<script>
export default {
  name: 'PageHeader',
  props: {
    title: String,
    icon: String,
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
}
.logo {
  margin-right: 5px;
}
</style>
