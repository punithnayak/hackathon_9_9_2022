import * as React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from '@mui/material/Link';

import { useNavigate } from "react-router-dom";
const drawerWidth = 240;
const navItems = ['ABout Team', 'MOdel-Info', 'Model'];

function HeaderComponent(props) {
  let navigate = useNavigate();
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Typography variant="h1" sx={{ my: 2 }}>
        Team Name
      </Typography>
      <Divider />
      <List>
        
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }} >
              <ListItemText><Link href="" variant="body2">
              Info
            </Link></ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText  ><Link href="/about" variant="body2">
              About
            </Link>t</ListItemText>
            </ListItemButton>
          </ListItem>
          <ListItem  disablePadding>
            <ListItemButton sx={{ textAlign: 'center' }}>
              <ListItemText  ><Link href="/model" variant="body2">
              Model
            </Link></ListItemText>
            </ListItemButton>
          </ListItem>
        
      </List>
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  const navigateabout=()=>{
    navigate('/about');
  }
  const navigateinfo=()=>{
    navigate('/');
  }
  const navigatemodel=()=>{
    navigate('/model');
  }
  return (
    
    <Box sx={{ display: 'flex' }}>
      <AppBar component="nav">
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            Team name
          </Typography>
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
              <Button  sx={{ color: '#fff' }} onClick={navigateinfo}>Info</Button>
              <Button  sx={{ color: '#fff' }} onClick={navigateabout}>About</Button>
              <Button  sx={{ color: '#fff' }} onClick={navigatemodel}>Model</Button>
           
          </Box>
        </Toolbar>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
      <Box component="main" sx={{ p: 3 }}>
        <Toolbar />
       
      </Box>
    </Box>
    
  );
}



export default HeaderComponent;
