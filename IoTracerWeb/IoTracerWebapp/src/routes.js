import { Navigate } from 'react-router-dom';
import DashboardLayout from 'src/components/DashboardLayout';
import MainLayout from 'src/components/MainLayout';
import Account from 'src/pages/Account';
import LogHistory from 'src/pages/LogHistory';
import UserList from 'src/pages/UserList';
import Forecast from 'src/pages/Forecast';
import Login from 'src/pages/Login';
import NotFound from 'src/pages/NotFound';
import LocationList from 'src/pages/LocationList';
import Register from 'src/pages/Register';
import Settings from 'src/pages/Settings';
import AddEditVaccinatedUser from 'src/components/users/AddEditVaccinatedUser';
import AddEditUserList from 'src/components/users/AddEditUserList';
import VaccinatedUsers from './pages/VaccinatedUsers';

const routes = [
  {
    path: 'app',
    element: <DashboardLayout />,
    children: [
      { path: 'account', element: <Account /> },
      { path: 'loghistory', element: <LogHistory /> },
      { path: 'userlist', element: <UserList /> },
      { path: 'vaccinatedusers', element: <VaccinatedUsers /> },
      { path: 'vaccinatedusers/add', element: <AddEditVaccinatedUser /> },
      { path: 'vaccinatedusers/edit/:id', element: <AddEditVaccinatedUser /> },
      { path: 'userlist/add', element: <AddEditUserList /> },
      { path: 'userlist/edit/:id', element: <AddEditUserList /> },
      { path: 'forecast', element: <Forecast /> },
      { path: 'locationlists', element: <LocationList /> },
      { path: 'settings', element: <Settings /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  },
  {
    path: '/',
    element: <MainLayout />,
    children: [
      { path: 'login', element: <Login /> },
      { path: 'register', element: <Register /> },
      { path: '404', element: <NotFound /> },
      { path: '/', element: <Navigate to="/login" /> },
      { path: '*', element: <Navigate to="/404" /> }
    ]
  }
];

export default routes;
