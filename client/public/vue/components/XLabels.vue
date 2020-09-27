<template>
  <div class='x-labels'>
    <span class='x-label' v-for='label in labels'>
      {{label}}
    </span>
  </div>
</template>
<script>
  export default {
    props: [
      'labels'
    ]
  }
</script>
