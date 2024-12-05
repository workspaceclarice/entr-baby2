import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueRulesProps {
  venue: Venue;
}

function VenueRules({ venue }: VenueRulesProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Venue Rules
      </Typography>
      <List>
        {venue.rules.map((rule, index) => (
          <ListItem key={index}>
            <ListItemText primary={rule} />
          </ListItem>
        ))}
      </List>
    </Box>
  );
}

export default VenueRules; 