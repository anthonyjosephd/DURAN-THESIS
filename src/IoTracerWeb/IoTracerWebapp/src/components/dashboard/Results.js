/* eslint-disable */
import { useEffect, React } from 'react';
import { useRecoilValue } from 'recoil';
import { forecastAtom, runforecastsAtom } from 'src/state/forecast';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import useforecastsActions from 'src/actions/forecasts.action';
import Moment from 'react-moment';
import 'moment-timezone';
import {
  Avatar,
  Card,
  CardContent,
  Grid,
  Typography
} from '@material-ui/core';
import CoronavirusIcon from '@material-ui/icons/Coronavirus';
import { orange } from '@material-ui/core/colors';

const Results = (props) => {
  const runforecasts = useRecoilValue(runforecastsAtom);
  const forecast = useRecoilValue(forecastAtom);
  const forecastActions = useforecastsActions();
  const useStyles = makeStyles((theme) => ({
    root: {
      '& > *': {
        margin: theme.spacing(1),
      },
    },
  }));
  const classes = useStyles();
  const execRunForecastPy = () => {
    console.log('aa');
    forecastActions.getRunForecast();
    setTimeout(function(){
      window.location.reload(1
        ); }, 5000);
    // window.location.reload(25);

    console.log(runforecasts);
  };
  useEffect(() => {
    forecastActions.getLastForcast();
    return forecastActions.resetForcast;
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
            <div className={classes.root}>
              <Button variant="contained" color="primary" onClick={execRunForecastPy}>
                Click to Enter New Forecast
              </Button>
            </div>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              PERCENTAGE
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <h1>{forecast?.percentage}</h1>
            </Typography>
          </Grid>
          <Grid item>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              NO. INFECTION
            </Typography>
            <Typography
              color="textPrimary"
              variant="h3"
            >
              <h1>{forecast?.predict_noinfec}</h1>
            </Typography>
            <Typography
              color="textSecondary"
              gutterBottom
              variant="h6"
            >
              Updated at
            </Typography>
            <Typography
              color="textPrimary"
              variant="h6"
            >
              <h1><Moment>{forecast?.dateforecasts}</Moment></h1>
            </Typography>
          </Grid>
          <Grid item>
            <Avatar
              sx={{
                backgroundColor: orange[500],
                height: 56,
                width: 56
              }}
            >
              <CoronavirusIcon />
            </Avatar>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

export default Results;
