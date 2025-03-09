import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {

    const {openSignIn} = useClerk();
    const {user} = useUser();

  return (
    <Box sx={{ boxShadow: 1, py: 4 }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mx: 'auto',
          px: 4,
          maxWidth: '1200px', // You can adjust the max width as needed
        }}
      >
        <img src="path_to_your_image" alt="Logo" />
        {
            user
            ?<Box className="flex items-center gap-3">
                <Link to="/applications">Applied Jobs</Link>
                <p>|</p>
                <p>Hi, {user.firstName+" "+user.lastName}</p>
                <UserButton/>
            </Box>
            :<Box>
            <Button variant="contained" sx={{ marginRight: 2 }}>Recruiter Login</Button>
            <Button onClick={ e => openSignIn()} variant="outlined">Login</Button>
          </Box>
        }
      </Box>
    </Box>
  );
};
