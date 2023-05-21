import Users from '../pages/Users'
import People from '@mui/icons-material/People';
import Settings from '../pages/Settings';
import SettingsIcon from '@mui/icons-material/Settings';
import DocumentScanner from '@mui/icons-material/DocumentScanner';
import PolicyPrivacy from '../pages/PolicyPrivacy';

const routes = [
  {
    path: '/',
    name: 'Users',
    icon: <People />,
    component: <Users />
  },
  {
    path: '/policy-and-privacy',
    name: 'Politica de privacidad',
    icon: <DocumentScanner />,
    component: <PolicyPrivacy />
  },
  {
    path: '/settings',
    name: 'Settings',
    icon: <SettingsIcon />,
    component: <Settings />
  },
]

export { routes } 