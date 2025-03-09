import React from 'react';
import { Box, Button, Typography } from '@mui/material';
import { useClerk, UserButton, useUser } from '@clerk/clerk-react';
import { Link } from 'react-router-dom';

export const Navbar = () => {
  const { openSignIn } = useClerk();
  const { user } = useUser();

  return (
    <Box
      sx={{
        boxShadow: 1,
        backgroundColor: '#fff',
        py: 2, // Adjust top & bottom padding for header height
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          maxWidth: '1200px',
          mx: 'auto',
          px: 4,
        }}
      >
        {/* Left side: Logo or Brand */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {/* If you have a logo image, place it here */}
          <img
            src="path_to_your_image"
            alt="Logo"
            style={{ maxHeight: '40px' }}
          />
          {/* Or if you prefer text-based branding, you can do:
            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
              Insiderjobs
            </Typography>
          */}
        </Box>

        {/* Right side: Logged-in vs. Logged-out */}
        {user ? (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {/* "Applied Jobs" link */}
            <Typography
              component={Link}
              to="/applications"
              sx={{
                textDecoration: 'none',
                color: 'inherit',
                fontWeight: 500,
                '&:hover': { textDecoration: 'underline' },
              }}
            >
              Applied Jobs
            </Typography>
            {/* Vertical bar */}
            <Typography component="span" sx={{ color: 'grey.600' }}>
              |
            </Typography>
            {/* "Hi, FirstName LastName" */}
            <Typography component="span" sx={{ fontWeight: 500 }}>
              Hi, {user.firstName} {user.lastName}
            </Typography>
            {/* Clerk's User Button (avatar, etc.) */}
            <UserButton />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Button variant="contained">Recruiter Login</Button>
            <Button variant="outlined" onClick={() => openSignIn()}>
              Login
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};
