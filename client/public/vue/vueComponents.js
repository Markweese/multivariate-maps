import Explorer from './pages/Explorer.vue';
import StationList from './pages/StationList.vue';
import StationPage from './pages/StationPage.vue';


const routes = {
  '/list': StationList,
  '/site': StationPage,
  '/explorer': Explorer
}

module.exports.routes = routes;
