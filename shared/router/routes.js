import SongList from '../../client/components/SongList';
import Home from '../../client/components/Home';
const routes = [
  {
    path: '/songs',
    exact: true,
    component: SongList
  },
  {
    path: '/',
    exact: true,
    component: Home
  }
];
export default routes;