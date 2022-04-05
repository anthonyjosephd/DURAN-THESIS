import { Helmet } from 'react-helmet';
import {
  Box,
  Container,
  Grid
} from '@material-ui/core';
import Results from 'src/components/dashboard/Results';
import Forecastlist from 'src/components/dashboard/Forecastlist';
import NoVaccinated from 'src/components/dashboard/NoVaccinated';
import NoPopulation from 'src/components/dashboard/NoPopulation';
import NoHighRisk from 'src/components/dashboard/NoHighRisk';

const Forecast = () => (
  <>
    <Helmet>
      <title>Forecasts</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.defaultblack',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <Grid
          container
          spacing={3}
        >
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <Results />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NoPopulation sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NoVaccinated />
          </Grid>
          <Grid
            item
            lg={3}
            sm={6}
            xl={3}
            xs={12}
          >
            <NoHighRisk sx={{ height: '100%' }} />
          </Grid>
          <Grid
            item
            lg={8}
            md={12}
            xl={9}
            xs={12}
          >
            <Forecastlist sx={{ width: 1600 }} />
          </Grid>
        </Grid>
      </Container>
    </Box>
  </>
);

export default Forecast;
