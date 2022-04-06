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
import { red } from '@material-ui/core/colors';
import WarningIcon from '@material-ui/icons/Warning';

const NoHighRisk = (props) => {
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
              No. High Risk Individual
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <h1>{forecast?.nohighriskoccupation}</h1>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: red[600],
                height: 56,
                width: 56
              }}
            >
              <WarningIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};
export default NoHighRisk;
