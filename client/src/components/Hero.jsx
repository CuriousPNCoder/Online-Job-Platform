import React, { useContext, useRef } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import { AppContext } from '../context/AppContext';

const Hero = () => {

    const {setSearchFilter, searchFilter} = useContext(AppContext);

    const titleRef = useRef(null);
    const locationRef = useRef(null);

    const onSerach = () => {
    
    }

  return (
    <>
      {/* HERO SECTION WITH PURPLE GRADIENT */}
      <Box
        sx={{
          width: '100%',
          background: 'linear-gradient(to right, #6B21A8, #3B0764)',
          py: { xs: 8, md: 10 },
        }}
      >
        <Container maxWidth="md" sx={{ textAlign: 'center' }}>
          {/* Heading */}
          <Typography
            variant="h3"
            sx={{
              fontWeight: 'bold',
              color: '#fff',
              mb: 2,
            }}
          >
            Over 10,000+ jobs to apply
          </Typography>

          {/* Subheading */}
          <Typography
            variant="subtitle1"
            sx={{
              color: '#fff',
              mb: 5,
            }}
          >
            Your Next Big Career Move Starts Right Here – Explore the Best Job Opportunities
            and Take the First Step toward Your Future!
          </Typography>

          {/* Search Box Container */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: 2,
              px: { xs: 2, md: 3 },
              py: { xs: 1, md: 2 },
              maxWidth: '100%',
              margin: '0 auto',
            }}
          >
            {/* Search Field */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
              }}
            >
              <SearchIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <TextField
                variant="standard"
                placeholder="Search for jobs"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                ref={titleRef}
              />
            </Box>

            {/* Location Field */}
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                flex: 1,
                ml: { xs: 1, md: 2 },
              }}
            >
              <LocationOnIcon sx={{ color: 'text.secondary', mr: 1 }} />
              <TextField
                variant="standard"
                placeholder="Location"
                fullWidth
                InputProps={{
                  disableUnderline: true,
                }}
                ref={locationRef}
              />
            </Box>

            {/* Search Button */}
            <Button
              variant="contained"
              sx={{
                ml: { xs: 1, md: 2 },
                textTransform: 'none',
                fontWeight: 'bold',
                px: { xs: 2, md: 4 },
                py: { xs: 1, md: 1.5 },
              }}
              onClick={onSerach}
            >
              Search
            </Button>
          </Box>
        </Container>
      </Box>

      {/* TRUSTED BY SECTION */}
      <Box
        sx={{
          width: '100%',
          backgroundColor: '#fff',
          py: 3,
          boxShadow: 1, // subtle shadow around the white container
        }}
      >
        <Container maxWidth="lg">
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexWrap: 'wrap',
              gap: 3,
              justifyContent: { xs: 'center', md: 'start' },
            }}
          >
            {/* "Trusted by" text */}
            <Typography
              variant="subtitle1"
              sx={{ fontWeight: 'bold' }}
            >
              Trusted by
            </Typography>

            {/* Example Logos (adjust sources & alt text) */}
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/1200px-Microsoft_logo.svg.png"
              alt="Microsoft"
              sx={{ height: 30, objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/ca/Walmart_logo.svg/1200px-Walmart_logo.svg.png"
              alt="Walmart"
              sx={{ height: 30, objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="https://lobbymap.org/site//data/001/361/1361822.png"
              alt="Accenture"
              sx={{ height: 30, objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSuhPfroLWEyj9HXSOW8pLMY_wBvAcbY5bOfg&s"
              alt="Samsung"
              sx={{ height: 30, objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/d/de/Amazon_icon.png"
              alt="Amazon"
              sx={{ height: 30, objectFit: 'contain' }}
            />
            <Box
              component="img"
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Adobe_Corporate_logo.svg/1280px-Adobe_Corporate_logo.svg.png"
              alt="Adobe"
              sx={{ height: 30, objectFit: 'contain' }}
            />
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default Hero;
