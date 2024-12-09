import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Box, Container, Tab, Tabs, useMediaQuery, useTheme, Typography } from '@mui/material';
import { venues } from '../../data/venues';
import VenueEstimator from '../../components/venues/VenueEstimator';
import NotFound from '../NotFound';

function VenuesPage() {
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const venue = venues.find(v => v.id === id);
  if (!venue) return <NotFound />;

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setActiveTab(newValue);
  };

  const handleBookNow = () => {
    setIsBookingOpen(true);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 0:
        return null;
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Box sx={{ 
        display: 'flex', 
        flexDirection: { xs: 'column', md: 'row' },
        gap: 4,
        position: 'relative'
      }}>
        {/* Main Content */}
        <Box sx={{ 
          flex: 1,
          width: '100%',
          display: 'flex',
          flexDirection: 'column'
        }}>
          {/* Title Section */}
          <Box sx={{ mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              {venue.name}
            </Typography>
            <Typography variant="subtitle1" color="text.secondary" gutterBottom>
              {venue.location.address}, {venue.location.city}, {venue.location.state} {venue.location.zip}
            </Typography>
          </Box>

          {/* Estimator appears after title on mobile */}
          {isMobile && (
            <Box sx={{ mb: 3 }}>
              <VenueEstimator 
                venue={venue} 
                onBookingClick={handleBookNow}
              />
            </Box>
          )}

          {/* Tabs Navigation */}
          <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              variant="scrollable"
              scrollButtons="auto"
              aria-label="venue tabs"
            >
              <Tab label="Amenities" />
            </Tabs>
          </Box>

          {/* Tab Content */}
          <Box>
            {renderTabContent()}
          </Box>
        </Box>

        {/* Estimator on desktop - sticky position */}
        {!isMobile && (
          <Box sx={{ 
            width: '350px',
            position: 'sticky',
            top: 24,
            height: 'fit-content',
            alignSelf: 'flex-start'
          }}>
            <VenueEstimator 
              venue={venue} 
              onBookingClick={handleBookNow}
            />
          </Box>
        )}
      </Box>
    </Container>
  );
}

export default VenuesPage; 