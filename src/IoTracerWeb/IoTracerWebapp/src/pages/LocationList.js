import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import LocationListToolbar from 'src/components/locationlist/LocationListToolbar';
import LocationCard from 'src/components/locationlist/LocationCard';
import locationlists from 'src/__mocks__/locationlists';

const LocationList = () => (
  <>
    <Helmet>
      <title>Status Locations</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <LocationListToolbar />
        <Box sx={{ pt: 3 }}>
          <Grid
            container
            spacing={3}
          >
            {locationlists.map((locationlist) => (
              <Grid
                item
                key={locationlist.id}
                lg={4}
                md={6}
                xs={12}
              >
                <LocationCard locationlist={locationlist} />
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </Box>
  </>
);

export default LocationList;
