import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../public/Acadmylogo.png';
import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';

const kidsLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
const adultsLevels = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1'];
const categories = ['Kids', 'Adults'];

export default function NavBar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const drawer = (
    <Box sx={{ width: 250 }} role="presentation" onClick={() => setDrawerOpen(false)}>
      <List>
        {categories.map((cat) => (
          <React.Fragment key={cat}>
            <ListItem disablePadding>
              <ListItemButton component={RouterLink} to={`/category/${cat.toLowerCase()}`}>
                <ListItemText primary={cat} />
              </ListItemButton>
            </ListItem>
            {(cat === 'Kids' ? kidsLevels : adultsLevels).map((level) => (
              <ListItem key={cat + level} disablePadding sx={{ pl: 3 }}>
                <ListItemButton component={RouterLink} to={`/category/${cat.toLowerCase()}/level/${level}`}>
                  <ListItemText primary={level} />
                </ListItemButton>
              </ListItem>
            ))}
            <Divider sx={{ my: 1 }} />
          </React.Fragment>
        ))}
      </List>
    </Box>
  );

  return (
    <AppBar position="static" color="primary">
      <Toolbar sx={{ flexWrap: { xs: 'wrap', sm: 'nowrap' }, px: { xs: 1, sm: 2 } }}>
        <img src={logo} alt="Native Fluency Academy Logo" style={{ height: 40, marginRight: 10, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))', maxWidth: 60 }} />
        <Typography variant="h6" sx={{ flexGrow: 1, fontSize: { xs: 16, sm: 22 }, minWidth: 120 }}>
          Native Fluency Academy
        </Typography>
        {isMobile ? (
          <>
            <IconButton color="inherit" edge="end" onClick={() => setDrawerOpen(true)}>
              <MenuIcon />
            </IconButton>
            <Drawer anchor="right" open={drawerOpen} onClose={() => setDrawerOpen(false)}>
              {drawer}
            </Drawer>
          </>
        ) : (
          <Box sx={{ display: 'flex', gap: { xs: 0.5, sm: 1 }, flexWrap: { xs: 'wrap', sm: 'nowrap' }, alignItems: 'center', width: { xs: '100%', sm: 'auto' }, mt: { xs: 1, sm: 0 } }}>
            {categories.map((cat) => (
              <Box key={cat} sx={{ display: 'flex', alignItems: 'center', gap: 0.5, flexWrap: 'wrap' }}>
                <Button
                  color="inherit"
                  component={RouterLink}
                  to={`/category/${cat.toLowerCase()}`}
                  sx={{ fontSize: { xs: '0.9em', sm: '1em' }, px: { xs: 0.5, sm: 1 } }}
                >
                  {cat}
                </Button>
                {(cat === 'Kids' ? kidsLevels : adultsLevels).map((level) => (
                  <Button
                    key={cat + level}
                    color="inherit"
                    component={RouterLink}
                    to={`/category/${cat.toLowerCase()}/level/${level}`}
                    sx={{ fontSize: { xs: '0.8em', sm: '0.95em' }, minWidth: 0, px: { xs: 0.5, sm: 1 }, mx: { xs: 0.25, sm: 0.75 } }}
                  >
                    {level}
                  </Button>
                ))}
              </Box>
            ))}
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
} 