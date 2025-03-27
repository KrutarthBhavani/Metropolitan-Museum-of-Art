import React from 'react';
import { Link } from 'react-router-dom';
import { Typography, Container, Button, Box } from '@mui/material';
import '../App.css'

function Home() {
  return (
    <Container sx={{  minHeight: '100vh', backgroundColor: '#f5f5dc', mt: 4 }}>
      <Typography variant="h1" gutterBottom sx={{ fontWeight: 'bold', mb: 3 }}>
        Welcome to the Metropolitan Museum of Art API
      </Typography>
      <Typography variant="h5" paragraph sx={{ mb: 2 }}>
        Explore the world of art and history with our Metropolitan Museum of Art API application. Access one of the worlds largest art collections, spanning five millennia, for study, inspiration, or simply to satisfy your curiosity.
      </Typography>
      <Typography variant="body1" paragraph sx={{ mb: 2 }}>
        Located in the heart of New York City, the Metropolitan Museum of Art is a treasure trove of knowledge and culture. Now, you can digitally access its extensive resources, delve into in-depth archives, and learn about artists and art trends from various periods.
      </Typography>
      <Typography variant='body1' paragraph sx={{ mb: 3 }}>
        Embark on a journey of exploration and discover the significance of art in our society. With just a few clicks, traverse geographies and historical periods, uncovering the stories behind each piece of art. Welcome to a world where art is accessible to everyone, everywhere.
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 3 }}>
        
        <Button variant="contained" color="secondary" component={Link} to="/collection/page/1">
          Explore the Collection
        </Button>
      </Box>
    </Container>
  );
}
export default Home;