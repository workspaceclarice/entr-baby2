import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import { Venue } from '../../types/venue';

interface FloorPlan {
  id: string;
  name: string;
  image: string;
  squareFeet: number;
  capacity: {
    reception: number;
    theater: number;
    banquet: number;
  };
}

// Mock floor plan data
const mockFloorPlans: FloorPlan[] = [
  {
    id: 'fp1',
    name: 'Main Hall',
    image: '/images/floor-plans/main-hall.jpg', // You'll need to add actual images
    squareFeet: 3000,
    capacity: {
      reception: 300,
      theater: 250,
      banquet: 200,
    },
  },
  {
    id: 'fp2',
    name: 'Garden Terrace',
    image: '/images/floor-plans/garden-terrace.jpg',
    squareFeet: 2000,
    capacity: {
      reception: 200,
      theater: 150,
      banquet: 120,
    },
  },
  {
    id: 'fp3',
    name: 'VIP Lounge',
    image: '/images/floor-plans/vip-lounge.jpg',
    squareFeet: 1000,
    capacity: {
      reception: 100,
      theater: 80,
      banquet: 60,
    },
  },
];

interface Props {
  venue: Venue;
}

const VenueFloorPlans: React.FC<Props> = ({ venue }) => {
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Floor Plans & Capacity
      </Typography>
      
      <Grid container spacing={3}>
        {mockFloorPlans.map((floorPlan) => (
          <Grid item xs={12} md={6} key={floorPlan.id}>
            <Paper 
              elevation={2}
              sx={{
                p: 2,
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
              }}
            >
              {/* Floor Plan Image */}
              <Box
                sx={{
                  width: '100%',
                  height: 200,
                  backgroundColor: 'grey.100',
                  borderRadius: 1,
                  overflow: 'hidden'
                }}
              >
                <img
                  src={floorPlan.image}
                  alt={floorPlan.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover'
                  }}
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://via.placeholder.com/400x200?text=Floor+Plan';
                  }}
                />
              </Box>

              {/* Floor Plan Details */}
              <Box>
                <Typography variant="h6" gutterBottom>
                  {floorPlan.name}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {floorPlan.squareFeet.toLocaleString()} Square Feet
                </Typography>
                
                {/* Capacity Information */}
                <Box sx={{ mt: 2 }}>
                  <Typography variant="subtitle2" gutterBottom>
                    Capacity:
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Reception
                      </Typography>
                      <Typography variant="h6">
                        {floorPlan.capacity.reception}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Theater
                      </Typography>
                      <Typography variant="h6">
                        {floorPlan.capacity.theater}
                      </Typography>
                    </Grid>
                    <Grid item xs={4}>
                      <Typography variant="body2" color="text.secondary">
                        Banquet
                      </Typography>
                      <Typography variant="h6">
                        {floorPlan.capacity.banquet}
                      </Typography>
                    </Grid>
                  </Grid>
                </Box>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default VenueFloorPlans; 