import { Box, ImageList, ImageListItem } from '@mui/material';
import { Venue } from '../../types/venue';

interface VenuePhotosProps {
  venue: Venue;
}

function VenuePhotos({ venue }: VenuePhotosProps) {
  return (
    <Box>
      <ImageList variant="masonry" cols={2} gap={8}>
        {venue.images.map((image, index) => (
          <ImageListItem key={index}>
            <img
              src={image}
              alt={`${venue.name} - Photo ${index + 1}`}
              loading="lazy"
              style={{ borderRadius: '4px' }}
            />
          </ImageListItem>
        ))}
      </ImageList>
    </Box>
  );
}

export default VenuePhotos; 