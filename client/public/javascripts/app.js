import Vue from 'vue';
import '../sass/style.scss';
import './modules/modules.js';
import searchBar from '../vue/mixins/searchBar.vue';
const routes = require('../vue/vueComponents.js').routes;

// initialize vue mixins for static html
new Vue({
  el: '#searchBar',
  render (h){ return h(searchBar, {
    props: {
      isMobile: false
    }
  })}
});
new Vue({
  el: '#searchBarMobile',
  render (h){ return h(searchBar, {
    props: {
      isMobile: true
    }
  })}
});

// initialize vue root for single pages
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
