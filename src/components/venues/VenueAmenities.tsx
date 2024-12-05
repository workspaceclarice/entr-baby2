import { Box, Typography, Grid, Paper } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueAmenitiesProps {
  venue: Venue;
}

function VenueAmenities({ venue }: VenueAmenitiesProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Amenities
      </Typography>
      <Grid container spacing={2}>
        {venue.amenities.map((amenity) => (
          <Grid item xs={12} sm={6} md={4} key={amenity.id}>
            <Paper 
              sx={{ 
                p: 2, 
                display: 'flex', 
                alignItems: 'center', 
                gap: 1 
              }}
            >
              <span>{amenity.icon}</span>
              <Typography>{amenity.name}</Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Typography variant="h5" sx={{ mt: 4, mb: 2 }}>
        Features
      </Typography>
      <Grid container spacing={2}>
        {venue.features.map((feature, index) => (
          <Grid item xs={12} sm={6} key={index}>
            <Paper sx={{ p: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                {feature.name}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {feature.description}
              </Typography>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}

export default VenueAmenities; 