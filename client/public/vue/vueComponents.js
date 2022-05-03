import Explorer from './pages/Explorer.vue';
import TagPage from './pages/TagPage.vue';
import UserPage from './pages/UserPage.vue';
import RiverPage from './pages/RiverPage.vue';
import ReportPage from './pages/ReportPage.vue';
import StationList from './pages/StationList.vue';
import StationPage from './pages/StationPage.vue';


const routes = {
  '/tag': TagPage,
  '/user': UserPage,
  '/list': StationList,
  '/site': StationPage,
  '/report': ReportPage,
  '/explorer': Explorer,
  '/river': RiverPage
}

module.exports.routes = routes;
