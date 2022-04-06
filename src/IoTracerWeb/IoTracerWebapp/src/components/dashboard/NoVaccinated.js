import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { lastTrainDataAtom } from 'src/state/forecast';
import useforecastsActions from 'src/actions/forecasts.action';
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Grid,
  LinearProgress,
  Typography
} from '@material-ui/core';
import { indigo } from '@material-ui/core/colors';
import HealthAndSafetyIcon from '@material-ui/icons/HealthAndSafety';

const NoVaccinated = (props) => {
  const forecast = useRecoilValue(lastTrainDataAtom);
  const forecastActions = useforecastsActions();

  useEffect(() => {
    forecastActions.getLastTrainData();
    return forecastActions.resetLastTrainData;
  }, []);
  console.log(forecast);
  return (
    <Card
      sx={{ height: '100%' }}
      {...props}
    >
      <CardContent>
        <Grid
          container
          spacing={3}
          sx={{ justifyContent: 'space-between' }}
        >
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h2"
            >
              No. Vaccinated Person
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <h1>{forecast?.novaccinated}</h1>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: indigo[600],
                height: 56,
                width: 56
              }}
            >
              <HealthAndSafetyIcon />
            </Avatar>
          </Grid>
        </Grid>
        <Box sx={{ pt: 3 }}>
          <LinearProgress
            value={forecast?.novaccinated}
            variant="determinate"
          />
        </Box>
      </CardContent>
    </Card>
  );
};
export default NoVaccinated;
