import Explorer from './pages/Explorer.vue';
import ReportPage from './pages/ReportPage.vue';
import StationList from './pages/StationList.vue';
import StationPage from './pages/StationPage.vue';


const routes = {
  '/list': StationList,
  '/site': StationPage,
  '/report': ReportPage,
  '/explorer': Explorer
}

module.exports.routes = routes;
