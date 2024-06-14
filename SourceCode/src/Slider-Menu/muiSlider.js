import * as React from 'react';
import { useState } from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import List from '@mui/material/List';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import CssBaseline from '@mui/material/CssBaseline';
// import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
// import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import AddIcon from '@mui/icons-material/Add';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import DirectionsBoatSharpIcon from '@mui/icons-material/DirectionsBoatSharp';
import CardTravelSharpIcon from '@mui/icons-material/CardTravelSharp';
import AssessmentSharpIcon from '@mui/icons-material/AssessmentSharp';
import Collapse from '@mui/material/Collapse'; // Add this import
import Button from 'react-bootstrap/Button';
import Button1 from '@mui/material/Button';
import '../Slider-Menu/muiSlider.css'
import SLiderManus from '../Slider-Menu/SLiderManus';
import TmsRouting from '../Tms-Routes/tmsRouting';
import {Link} from 'react-router-dom';
import RemoveIcon from '@mui/icons-material/Remove';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const drawerWidth = 240;

const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);

export default function MiniDrawer() {
    const theme = useTheme();
    const [open, setOpen] = React.useState(false);
    const [openOperationSubMenu, setOpenOperationSubMenu] = useState(false);
    const [openBillingSubMenu, setOpenBillingSubMenu] = useState(false);
    const [openMasterSubMenu, setOpenMasterSubMenu] = useState(false);
    const [activeMenuItem, setActiveMenuItem] = useState('');
    const [iconcolor, seticoncolor] = useState('');
    const [chnageicon, updateicon] = useState(false);
    const [chnageiconmodule, updatechnageiconmodule] = useState('');
    const [openUserSubMenu, setOpenUserSubMenu] = useState(false);
    const [openSubmenu, setSubmenu] = useState(false);

    // Function to toggle the state of the submenu for "User" ListItem
    const handleUserSubMenuToggle = (text) => {
        setOpenUserSubMenu(!openUserSubMenu);
        setSubmenu(text);
    };

    const handleDrawerOpen = () => {
        setOpen(!open);
    };
    const handleIconColur = (text) => {
        seticoncolor(text);
    };
    const handleIcon = (text) => {
        updateicon(!chnageicon);
        updatechnageiconmodule(text);
    };

    const handleMenuItemClick = (text) => {

        setActiveMenuItem(text);

    };

    const handleDrawerClose = () => {
        setOpen(!open);
        setOpenOperationSubMenu(false);
        setOpenBillingSubMenu(false);
        setOpenMasterSubMenu(false);
    };

    const handleOperationSubMenuToggle = () => {
        setOpenOperationSubMenu(!openOperationSubMenu);
        setOpenBillingSubMenu(false);
        setOpenMasterSubMenu(false);

    };

    const handleBillingSubMenuToggle = () => {
        setOpenBillingSubMenu(!openBillingSubMenu);
        setOpenOperationSubMenu(false);
        setOpenMasterSubMenu(false);
    };
    const handleMasterSubMenuToggle = () => {
        setOpenMasterSubMenu(!openMasterSubMenu);
        setOpenOperationSubMenu(false);
        setOpenBillingSubMenu(false);

    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>
                <CssBaseline />
                {/* <AppBar position="fixed" open={open}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={{
              marginRight: 5,
              ...(open && { display: 'none' }),
            }}
          >
            <MenuIcon />
          </IconButton>
       
        </Toolbar>
      </AppBar> */}

                <Drawer variant="permanent" open={open}>
                    <DrawerHeader>
                        {/* <IconButton onClick={handleDrawerClose}>
      {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
    </IconButton> */}
                    </DrawerHeader>
                    <Divider />
                    <List>
                        {/* Dashboard */}
                        {/* <ListItem disablePadding sx={{ display: 'block' }}>
                        <ListItem>

                            <ListItem>
                                <IconButton
                                    color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{
                                        marginBottom: 0,
                                        ...(open && { display: 'none' }),
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <MenuIcon />
                                </IconButton>
                                <ListItemText primary="  " />
                                <IconButton onClick={handleDrawerClose}>
                                    {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
                                </IconButton>
                            </ListItem>

                        </ListItem>

                        <ListItemButton
                            sx={{
                                minHeight: 48,
                                justifyContent: open ? 'initial' : 'center',
                                px: 2.5,
                            }}
                        >
                            <ListItemIcon
                                sx={{
                                    minWidth: 0,
                                    mr: open ? 3 : 'auto',
                                    justifyContent: 'center',
                                }}
                            >
                                <MailIcon />
                            </ListItemIcon>
                            <ListItemText primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                        </ListItemButton>
                    </ListItem> */}

                        {/* MANU */}
                        <ListItem

                            disablePadding sx={{ display: 'block', backgroundColor: activeMenuItem === 'Operation' ? '' : 'transparent' }} onClick={() => {
                                handleDrawerClose();
                                handleMenuItemClick('Operation');
                                handleIconColur('Menu');
                            }}>
                            <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                <ListItemIcon color="inherit"
                                    aria-label="open drawer"
                                    onClick={handleDrawerOpen}
                                    edge="start"
                                    sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                    <MenuIcon style={{ color: iconcolor === 'Menu' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Menu' ? '#8DC300' : '#1A005D' }} primary="Menu" sx={{ opacity: open ? 1 : 0 }} />


                                {open ? <ChevronLeftIcon /> : ""}

                            </ListItemButton>
                        </ListItem>

                        {/* Dashboard */}
                        <Link to="/Dashboard" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <ListItem disablePadding
                                onClick={() => {
                                    // handleMasterSubMenuToggle();
                                    handleIconColur('Dashboard');

                                }}
                                sx={{ display: 'block' }}>
                                <ListItemButton sx={{ minHeight: 48, justifyContent: open ? 'initial' : 'center', px: 2.5, }}>
                                    <ListItemIcon sx={{ minWidth: 0, mr: open ? 3 : 'auto', justifyContent: 'center' }} >
                                        <DashboardIcon style={{ color: iconcolor === 'Dashboard' ? '#8DC300' : '#1A005D' }} />
                                    </ListItemIcon >

                                    <ListItemText style={{ color: iconcolor === 'Dashboard' ? '#8DC300' : '#1A005D' }} primary="Dashboard" sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        </Link>





                        {/* Master */}
                        {/* Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master Master  */}

                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                onClick={() => {
                                    handleMasterSubMenuToggle();
                                    handleIconColur('master');
                                    handleIcon('master');

                                }}


                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AdminPanelSettingsIcon style={{ color: iconcolor === 'master' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'master' ? '#8DC300' : '#1A005D' }} primary="Master" sx={{ opacity: open ? 1 : 0 }} />



                                {open && chnageiconmodule === 'master' && chnageicon ? < RemoveIcon fontSize="small" /> : open ? < AddIcon fontSize="small" /> : ""}

                            </ListItemButton>

                            <Collapse in={openMasterSubMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('UserMaster')}>

                                        <ListItemText primary="User Masters" />
                                        {openUserSubMenu&&openSubmenu==='UserMaster' ? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                        <Collapse in={openUserSubMenu&&openSubmenu==='UserMaster'} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {/* Add submenu items here */}

                                                <Link to="Master/User" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Add User" />
                                                </ListItem>
                                                </Link>

                                                 <Link to="Master/AssignMenus" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Assign Menu" />
                                                </ListItem>
                                                </Link> 

                                    


                                            </List>
                                        </Collapse>


                                        <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('BranchMaster')}>
                                        <ListItemText primary="Branch Master" />
                                        {openUserSubMenu &&openSubmenu==='BranchMaster'? <ExpandLess /> : <ExpandMore />}
                                       </ListItem>
                                       <Collapse in={openUserSubMenu&&openSubmenu==='BranchMaster'} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {/* Add submenu items here */}

                                                <Link to="Master/Branch" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Branch" />
                                                </ListItem>
                                                </Link>


                                                <Link to="Master/SubBranch" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="SubBranch" />
                                                </ListItem>
                                                </Link>
                                            </List>
                                        </Collapse>




                                        <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('CustomerMaster')}>
                                        <ListItemText primary="Customer Master" />
                                        {openUserSubMenu &&openSubmenu==='CustomerMaster'? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openUserSubMenu&&openSubmenu==='CustomerMaster'} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {/* Add submenu items here */}

                                                <Link to="Master/Customer" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Customer" />
                                                </ListItem>
                                                </Link>


                                                <Link to="Master/Consignor" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Consignor/Consignee" />
                                                </ListItem>
                                                </Link>



                                                {/* <Link to="Master/Product" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText  className='menuname' primary="Product Master" />
                                                </ListItem>
                                                </Link> */}



                                                <Link to="Master/Commercial" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Commercial Updates" />
                                                </ListItem>
                                                </Link>
                                            </List>

                                        </Collapse>




                                        <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('Vendor/CarrierMaster')}>
                                        <ListItemText primary="Carrier Master" />
                                        {openUserSubMenu &&openSubmenu==='Vendor/CarrierMaster'? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openUserSubMenu&&openSubmenu==='Vendor/CarrierMaster'} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {/* Add submenu items here */}



                                                <Link to="Master/AddCarrier" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Carrier/vendor" />
                                                </ListItem>
                                                </Link>
                                                <Link to="Master/Vehicle" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Vehicle" />
                                                </ListItem>
                                                </Link>



                                                <Link to="Master/CommercialUpdates" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText  className='menuname' primary="Commercial Updates" />
                                                </ListItem>
                                                </Link>
                                            </List>

                                        </Collapse>







                                        <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('LocationMaster')}>
                                        <ListItemText primary="Location Master" />
                                        {openUserSubMenu &&openSubmenu==='LocationMaster'? <ExpandLess /> : <ExpandMore />}
                                    </ListItem>
                                    <Collapse in={openUserSubMenu&&openSubmenu==='LocationMaster'} timeout="auto" unmountOnExit>
                                            <List component="div" disablePadding>
                                                {/* Add submenu items here */}
                                                <Link to="Master/AddLocation" style={{ textDecoration: 'none' }}>
                                                <ListItem button sx={{ pl: 5 }}>
                                                    <ListItemText className='menuname' primary="Add Location" />
                                                </ListItem>
                                                </Link>
                                            </List>
                                        </Collapse>


                                        


                                </List>
                            </Collapse>

                        </ListItem>






                        {/* Operation Operation Operation Operation Operation Operation Operation Operation Operation Operation Operation Operation Operation */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                handleOperationSubMenuToggle();
                                handleIconColur('Operation');
                                handleIcon('Operation');

                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <DirectionsBoatSharpIcon style={{ color: iconcolor === 'Operation' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>

                                <ListItemText style={{ color: iconcolor === 'Operation' ? '#8DC300' : '#1A005D' }} primary="Operation" sx={{ opacity: open ? 1 : 0 }} />
                                {/* {open ? < AddIcon  fontSize="small" /> : ""} */}
                                {open && chnageiconmodule === 'Operation' && chnageicon ? < RemoveIcon fontSize="small" /> : open ? < AddIcon fontSize="small" /> : ""}

                            </ListItemButton>

                            <Collapse in={openOperationSubMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    {/* <ListItem button sx={{ pl: 4 }}> */}
                                      
                                        {/* <ListItemText primary="LTL" />
                                        {open ? < ChevronRightIcon fontSize="small" /> : ""}
                                    </ListItem>


                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemText primary="FTL" />
                                        {open ? < ChevronRightIcon fontSize="small" /> : ""}
                                    </ListItem>



                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemText primary="Tracking " />
                                        {open ? < ChevronRightIcon fontSize="small" /> : ""}
                                    </ListItem> */}

  <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('LTL')}>
<ListItemText primary="LTL" />
{openUserSubMenu&&openSubmenu==='LTL' ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openUserSubMenu&&openSubmenu==='LTL'} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        {/* Add submenu items here */}

        <Link to="LTL/Booking" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="LTL Booking" />
        </ListItem>
        </Link>

        <Link to="LTL/Closure" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="LTL Closure" />
        </ListItem>
        </Link>
    </List>
</Collapse>

  <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('FTL')}>
<ListItemText primary="FTL" />
{openUserSubMenu&&openSubmenu==='FTL' ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openUserSubMenu&&openSubmenu==='FTL'} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        {/* Add submenu items here */}

        <Link to="FTL/Booking" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="FTL Booking" />
        </ListItem>
        </Link>

        <Link to="FTL/Closure" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="Closure" />
        </ListItem>
        </Link>
    </List>
</Collapse>


  <ListItem button sx={{ pl: 4 }} onClick={() => handleUserSubMenuToggle('Tracking')}>
<ListItemText primary="Tracking" />
{openUserSubMenu&&openSubmenu==='Tracking' ? <ExpandLess /> : <ExpandMore />}
</ListItem>
<Collapse in={openUserSubMenu&&openSubmenu==='Tracking'} timeout="auto" unmountOnExit>
    <List component="div" disablePadding>
        {/* Add submenu items here */}

        <Link to="Master/User" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="FTL" />
        </ListItem>
        </Link>

        <Link to="Master/Menu" style={{ textDecoration: 'none' }}>
        <ListItem button sx={{ pl: 8 }}>
            <ListItemText className='menuname' primary="LTL" />
        </ListItem>
        </Link>
    </List>
</Collapse>








                                </List>
                            </Collapse>

                        </ListItem>






                        {/* Billing Billing Billing Billing Billing Billing Billing Billing Billing Billing Billing Billing Billing Billing */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                handleBillingSubMenuToggle();
                                handleIconColur('Billing');
                                handleIcon('Billing');

                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <CardTravelSharpIcon style={{ color: iconcolor === 'Billing' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Billing' ? '#8DC300' : '#1A005D' }} primary="Billing" sx={{ opacity: open ? 1 : 0 }} />
                                {/* {open ? < AddIcon  fontSize="small" /> : ""} */}
                                {open && chnageiconmodule === 'Billing' && chnageicon ? < RemoveIcon fontSize="small" /> : open ? < AddIcon fontSize="small" /> : ""}

                            </ListItemButton>
                            <Collapse in={openBillingSubMenu} timeout="auto" unmountOnExit>
                                <List component="div" disablePadding>
                                    <ListItem button sx={{ pl: 4 }}>
                                        {/* Add your submenu items here */}
                                        <ListItemText primary="Billinu Item 1" />
                                    </ListItem>
                                    <ListItem button sx={{ pl: 4 }}>
                                        <ListItemText primary="Bill Item 2" />
                                    </ListItem>
                                </List>
                            </Collapse>
                        </ListItem>

                        {/* Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports Reports */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton onClick={() => {
                                //handleMasterSubMenuToggle();
                                handleIconColur('Reports');
                                handleIcon('Reports');

                            }}
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <AssessmentSharpIcon style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} primary="Reports" sx={{ opacity: open ? 1 : 0 }} />
                                {/* {open ? < AddIcon  fontSize="small" /> : ""} */}
                                {open && chnageiconmodule === 'Reports' && chnageicon ? < RemoveIcon fontSize="small" /> : open ? < AddIcon fontSize="small" /> : ""}

                            </ListItemButton>
                        </ListItem>
                    </List>
                    <Divider />
                    {/* Remaining List Items */}
                    <List>
                        {/* All mail */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <InboxIcon style={{ color: iconcolor === 'Almail' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} primary="All mail" sx={{ opacity: open ? 1 : 0 }} />

                            </ListItemButton>
                        </ListItem>

                        {/* Trash */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon style={{ color: iconcolor === 'report' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} primary="Trash" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>

                        {/* Spam */}
                        <ListItem disablePadding sx={{ display: 'block' }}>
                            <ListItemButton
                                sx={{
                                    minHeight: 48,
                                    justifyContent: open ? 'initial' : 'center',
                                    px: 2.5,
                                }}
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <MailIcon style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} />
                                </ListItemIcon>
                                <ListItemText className='customListItemText' style={{ color: iconcolor === 'Reports' ? '#8DC300' : '#1A005D' }} primary="Spam" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>

                <Box component="main" sx={{ flexGrow: 1, p: 3 ,py:8}}>


                    <TmsRouting />
                    

{/* 
                    <h1 >this is app component </h1>

                    <SLiderManus />
                    <Button variant="outline-primary">Primary</Button>{''}
                    <Button variant="outline-primary">Primary</Button>{''}
                    <Button variant="outline-primary">Primary</Button>{''}
                    <Button1 variant="contained" disableElevation>

                    </Button1>
                    <Button1 variant="contained" disableElevation>

                    </Button1> */}

                </Box>
            </Box>

        </>
    );
}