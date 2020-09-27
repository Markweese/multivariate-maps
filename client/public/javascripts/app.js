import Vue from 'vue';
import '../sass/style.scss';
import './modules/modules.js';
const routes = require('../vue/vueComponents.js').routes;

// initialize vue root
if (document.getElementById('vue')) {
  new Vue({
    el: '#vue',
    data: {
      currentRoute: window.location.pathname
    },
    computed: {
      ViewComponent () {
        let routeRoot = '/' + this.currentRoute.split('/')[1];

        return routes[routeRoot] || NotFound;
      }
    },
    render (h){ return h(this.ViewComponent) }
  });
}
