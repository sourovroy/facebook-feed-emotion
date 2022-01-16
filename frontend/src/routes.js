import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import UserDataDeletion from './pages/UserDataDeletion';

const routes = [
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/privacy-policy",
    element: <PrivacyPolicy />
  },
  {
    path: "/user-data-deletion",
    element: <UserDataDeletion />
  },
];

export default routes;
