import { Box, Typography, Grid, Paper } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueDetailsProps {
  venue: Venue;
  hideTitle?: boolean;
}

function VenueDetails({ venue, hideTitle = false }: VenueDetailsProps) {
  return (
    <Box>
      {!hideTitle && (
        <>
          <Typography variant="h4" gutterBottom>
            {venue.name}
          </Typography>
          <Typography variant="subtitle1" color="text.secondary" gutterBottom>
            {venue.location.address}, {venue.location.city}, {venue.location.state} {venue.location.zip}
          </Typography>
        </>
      )}
      
      <Typography variant="body1" paragraph>
        {venue.description}
      </Typography>
      
      <Grid container spacing={3} sx={{ mt: 2 }}>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Capacity
            </Typography>
            <Typography>
              Minimum: {venue.minCapacity} guests<br />
              Maximum: {venue.maxCapacity} guests
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Paper sx={{ p: 2 }}>
            <Typography variant="h6" gutterBottom>
              Hours
            </Typography>
            <Typography>
              Minimum booking: {venue.minimumHours} hours
            </Typography>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
}

export default VenueDetails; 