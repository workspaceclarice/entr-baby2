import { Box, Typography, Grid, Paper, Tabs, Tab } from '@mui/material';
import { useState } from 'react';
import { Venue } from '../../types/venue';

interface VenueDetailsProps {
  venue: Venue;
  hideTitle?: boolean;
}

// Mock review data
interface Review {
  id: string;
  author: string;
  date: string;
  rating: number;
  comment: string;
}

const mockReviews: Review[] = [
  {
    id: '1',
    author: 'Sarah Johnson',
    date: '2024-02-15',
    rating: 5,
    comment: 'Beautiful venue! Perfect for our wedding. The staff was incredibly helpful and the space exceeded our expectations.'
  },
  {
    id: '2',
    author: 'Michael Chen',
    date: '2024-01-30',
    rating: 4,
    comment: 'Great location and amenities. The only minor issue was parking, but otherwise a fantastic experience.'
  },
  {
    id: '3',
    author: 'Emily Rodriguez',
    date: '2024-01-15',
    rating: 5,
    comment: 'Hosted our corporate event here and received numerous compliments from attendees. The AV setup was perfect.'
  }
];

function VenueDetails({ venue, hideTitle = false }: VenueDetailsProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  return (
    <Box>
      {!hideTitle && (
        <>
          <Typography variant="h4" gutterBottom fontWeight="light">
            {venue.name}
          </Typography>
          
          {/* Stats Bar */}
          <Box sx={{ 
            display: 'flex', 
            flexDirection: { xs: 'column', sm: 'row' },
            gap: { xs: 0.5, sm: 2 },
            mb: 2
          }}>
            <Typography 
              color="text.secondary" 
              fontWeight="light"
              sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
            >
              {venue.location.city}, {venue.location.state}
            </Typography>
            <Typography 
              color="text.secondary" 
              fontWeight="light"
              sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
            >
              Up to {venue.maxCapacity} guests
            </Typography>
            <Typography 
              color="text.secondary" 
              fontWeight="light"
              sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
            >
              {venue.squareFeet.toLocaleString()} sq ft
            </Typography>
            <Typography 
              color="text.secondary" 
              fontWeight="light"
              sx={{ fontSize: { xs: '0.813rem', sm: '0.875rem' } }}
            >
              4.7 (3 reviews)
            </Typography>
          </Box>
        </>
      )}

      {/* Tabs */}
      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={activeTab} onChange={handleTabChange}>
          <Tab label="Details" />
          <Tab label="Reviews" />
        </Tabs>
      </Box>

      {/* Details Tab Content */}
      {activeTab === 0 && (
        <>
          <Typography 
            variant="body1" 
            paragraph 
            fontWeight="light"
            sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
          >
            {venue.description}
          </Typography>
          
          <Grid container spacing={{ xs: 2, sm: 3 }} sx={{ mt: { xs: 1, sm: 2 } }}>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" gutterBottom fontWeight="light">
                  Capacity
                </Typography>
                <Typography fontWeight="light" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Minimum: {venue.minCapacity} guests<br />
                  Maximum: {venue.maxCapacity} guests
                </Typography>
              </Paper>
            </Grid>
            <Grid item xs={12} sm={6}>
              <Paper sx={{ p: { xs: 1.5, sm: 2 } }}>
                <Typography variant="h6" gutterBottom fontWeight="light">
                  Hours
                </Typography>
                <Typography fontWeight="light" sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}>
                  Minimum booking: {venue.minimumHours} hours
                </Typography>
              </Paper>
            </Grid>
          </Grid>
        </>
      )}

      {/* Reviews Tab Content */}
      {activeTab === 1 && (
        <Box>
          {mockReviews.map((review) => (
            <Paper 
              key={review.id} 
              sx={{ 
                p: { xs: 2, sm: 3 }, 
                mb: 2,
                '&:last-child': { mb: 0 }
              }}
            >
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                <Typography fontWeight="medium">
                  {review.author}
                </Typography>
                <Typography color="text.secondary" fontWeight="light">
                  {new Date(review.date).toLocaleDateString()}
                </Typography>
              </Box>
              <Typography color="primary" fontWeight="medium" sx={{ mb: 1 }}>
                {'★'.repeat(review.rating)}
                <span style={{ color: '#ccc' }}>{'★'.repeat(5 - review.rating)}</span>
              </Typography>
              <Typography 
                fontWeight="light"
                sx={{ fontSize: { xs: '0.875rem', sm: '1rem' } }}
              >
                {review.comment}
              </Typography>
            </Paper>
          ))}
        </Box>
      )}
    </Box>
  );
}

export default VenueDetails; 