import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { Link as RouterLink } from 'react-router-dom';
import Box from '@mui/material/Box';
import logo from '../public/Acadmylogo.png';

const kidsLevels = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'];
const adultsLevels = ['A1', 'A2', 'B1', 'B1+', 'B2', 'C1'];
const categories = ['Kids', 'Adults'];

export default function NavBar() {
  return (
    <AppBar position="static" color="primary">
      <Toolbar>
        <img src={logo} alt="Native Fluency Academy Logo" style={{ height: 56, marginRight: 20, filter: 'drop-shadow(0 2px 6px rgba(0,0,0,0.12))' }} />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Native Fluency Academy
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          {categories.map((cat) => (
            <Box key={cat} sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <Button
                color="inherit"
                component={RouterLink}
                to={`/category/${cat.toLowerCase()}`}
              >
                {cat}
              </Button>
              {(cat === 'Kids' ? kidsLevels : adultsLevels).map((level) => (
                <Button
                  key={cat + level}
                  color="inherit"
                  component={RouterLink}
                  to={`/category/${cat.toLowerCase()}/level/${level}`}
                  sx={{ fontSize: '0.95em', minWidth: 0, px: 1, mx: 0.75 }}
                >
                  {level}
                </Button>
              ))}
            </Box>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
} 