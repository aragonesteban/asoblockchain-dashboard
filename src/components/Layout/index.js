import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import logoColor from '../../assets/logo_color.png'
import logoLettersWhite from '../../assets/logo_letters_white.png'
import { routes } from '../../routes';
import { useLocation, NavLink, Outlet } from 'react-router-dom'

const drawerWidth = 240;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginLeft: `-${drawerWidth}px`,
        ...(open && {
            transition: theme.transitions.create('margin', {
                easing: theme.transitions.easing.easeOut,
                duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
        }),
    }),
);

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    transition: theme.transitions.create(['margin', 'width'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        width: `calc(100% - ${drawerWidth}px)`,
        marginLeft: `${drawerWidth}px`,
        transition: theme.transitions.create(['margin', 'width'], {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'center',
    position: 'relative'
}));

const LayoutAsoblochain = ({ children }) => {
    const [open, setOpen] = React.useState(true);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const location = useLocation();

    const isActiveRoute = (routeName) => location.pathname === routeName;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />

            <AppBar position="fixed" open={open}>
                <Toolbar sx={{ justifyContent: 'center' }}>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        sx={{ mr: 2, position: 'absolute', left: '2%', ...(open && { display: 'none' }) }}>
                        <MenuIcon />
                    </IconButton>
                    <img className='w-[8em]' src={logoLettersWhite} alt="/" />
                </Toolbar>
            </AppBar>

            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={open}>

                <DrawerHeader>
                    <img className='w-[2em]' src={logoColor} alt="/" />
                    <IconButton onClick={handleDrawerClose} sx={{ position: 'absolute', right: 0 }}>
                        <ChevronLeftIcon />
                    </IconButton>
                </DrawerHeader>

                <Divider />

                <List>
                    {routes.map((route) => (
                        <ListItem key={route.path} disablePadding>
                            <NavLink to={route.path} className='w-full'>
                                <ListItemButton>
                                    <ListItemIcon sx={{ color: isActiveRoute(route.path) && '#00b707' }}>
                                        {route.icon}
                                    </ListItemIcon>
                                    <ListItemText primary={route.name} sx={{ color: isActiveRoute(route.path) && '#00b707' }} />
                                </ListItemButton>
                            </NavLink>
                        </ListItem>
                    ))}
                </List>
            </Drawer>

            <Main open={open}>
                <DrawerHeader />
                <Outlet />
            </Main>

        </Box>
    );
}

export default LayoutAsoblochain