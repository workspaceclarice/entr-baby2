import { Box, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenueReviewsProps {
  venue: Venue;
}

function VenueReviews({ venue }: VenueReviewsProps) {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        Reviews
      </Typography>
      <List>
        {venue.reviews.map((review, index) => (
          <Box key={index}>
            <ListItem alignItems="flex-start">
              <ListItemText
                primary={`${review.author} - ${review.rating} stars`}
                secondary={
                  <>
                    <Typography
                      component="span"
                      variant="body2"
                      color="text.primary"
                    >
                      {review.date}
                    </Typography>
                    {" — "}{review.comment}
                  </>
                }
              />
            </ListItem>
            {index < venue.reviews.length - 1 && <Divider variant="inset" component="li" />}
          </Box>
        ))}
      </List>
    </Box>
  );
}

export default VenueReviews; 