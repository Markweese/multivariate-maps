<template id="">
  <h2>{{title}}</h2>
</template>
<script>
export default {
  name: 'SummaryTable',
  props: {
    activeItem: String,
    tableData: Array,
  },
}
</script>
