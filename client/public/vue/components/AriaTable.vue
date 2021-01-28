<template>
  <div>
    <table
     role="table"
     cellspacing=0
     class="aria-table"
     v-bind:aria-label="data.name"
     aria-describedby="table_desc">
      <caption class="aria-table__desc" id="table_desc">
        All {{data.context}} readings for {{name}} ({{duration}} day)
      </caption>
      <thead>
        <tr role="row">
          <th role="columnheader" v-for="(key, i) in Object.keys(data[0])" v-if="i !== 1">
            {{key}}
          </th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="row in data" role="row">
          <td v-for="(cell, i) in Object.keys(row)" role="cell" v-if="i !== 2">
            {{i === 1 ? correctDate(row[cell]) : row[cell]}}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
  export default {
    props: [
      'name',
      'data',
      'context',
      'duration'
    ],

    methods: {
      correctDate(date) {
        date = new Date(date);
        date.setFullYear(new Date().getFullYear());

        return date;
      }
    }
 }
</script>
