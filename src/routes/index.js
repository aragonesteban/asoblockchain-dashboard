import Users from '../pages/Users'
import People from '@mui/icons-material/People';
import Settings from '../pages/Settings';
import SettingsIcon from '@mui/icons-material/Settings';

const routes = [
  {
    path: '/',
    name: 'Users',
    icon: <People />,
    component: <Users/>
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <SettingsIcon />,
    component: <Settings/>
  },
]

export { routes } 