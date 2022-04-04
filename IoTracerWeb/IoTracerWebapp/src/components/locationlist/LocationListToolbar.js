import {
  Box,
  Card,
  Typography
} from '@material-ui/core';

const LocationListToolbar = (props) => (
  <Box {...props}>
    <Box sx={{ mt: 3 }}>
      <Card>
      <div style={{ height: 70, marginTop: 20, width: '100%' }}>
        <Typography
          color="black"
          align="center"
          gutterBottom
          variant="h1"
        >
          Status Locations in Iloilo City
        </Typography>
      </div>
      </Card>
    </Box>
  </Box>
);

export default LocationListToolbar;
