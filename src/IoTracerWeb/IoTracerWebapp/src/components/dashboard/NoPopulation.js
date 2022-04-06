import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { lastTrainDataAtom } from 'src/state/forecast';
import useforecastsActions from 'src/actions/forecasts.action';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import { green } from '@material-ui/core/colors';
import PeopleIcon from '@material-ui/icons/PeopleOutlined';

const NoPopulation = (props) => {
  const forecast = useRecoilValue(lastTrainDataAtom);
  const forecastActions = useforecastsActions();

  useEffect(() => {
    forecastActions.getLastTrainData();
    return forecastActions.resetLastTrainData;
  }, []);
  console.log(forecast);
  return (
    <Card {...props}>
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
              Population
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <h1>{forecast?.population}</h1>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: green[600],
                height: 56,
                width: 56
              }}
            >
              <PeopleIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default NoPopulation;
