/* eslint-disable */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { listofforecastsAtom } from 'src/state/forecast';
import useforecastsActions from 'src/actions/forecasts.action';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';

import { Bar } from 'react-chartjs-2';
import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  useTheme,
  colors,
  Typography
} from '@material-ui/core';

const Forecastlist = (props) => {
  const forecast = useRecoilValue(listofforecastsAtom);
  const forecastActions = useforecastsActions();

  useEffect(() => {
    forecastActions.getListOfForecasts();
    return forecastActions.resetListOfForecasts;
  }, []);
  console.log(forecast[0]?.Jan);
  const theme = useTheme();
  const jan = forecast[0]?.Jan || 0;
  const feb = forecast[0]?.Feb || 0;
  const mar = forecast[0]?.March || 0;
  const april = forecast[0]?.April || 0;
  const may = forecast[0]?.May || 0;
  const june = forecast[0]?.June || 0;
  const july = forecast[0]?.July || 0;
  const aug = forecast[0]?.August || 0;
  const sept = forecast[0]?.September || 0;
  const oct = forecast[0]?.October || 0;
  const nov = forecast[0]?.November || 0;
  const dec = forecast[0]?.December || 0;
  const data = {
    datasets: [
      {
        backgroundColor: colors.indigo[500],
        data: [jan, feb, mar, april, may, june, july, aug, sept, oct, nov, dec],
        label: 'This year'
      },
      {
        backgroundColor: colors.blue[200],
        data: [6.4, 7.8, 7.72, 8.8, 10.9, 9.2, 8.24, 8.35, 9.3, 7.3, 8.2, 9.53],
        label: 'Last year'
      }
    ],
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']
  };

  const options = {
    animation: false,
    cornerRadius: 20,
    layout: { padding: 0 },
    legend: { display: false },
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      xAxes: [
        {
          barThickness: 12,
          maxBarThickness: 10,
          barPercentage: 0.5,
          categoryPercentage: 0.5,
          ticks: {
            fontColor: theme.palette.text.secondary
          },
          gridLines: {
            display: false,
            drawBorder: false
          }
        }
      ],
      yAxes: [
        {
          ticks: {
            fontColor: theme.palette.text.secondary,
            beginAtZero: true,
            min: 0
          },
          gridLines: {
            borderDash: [2],
            borderDashOffset: [2],
            color: theme.palette.divider,
            drawBorder: false,
            zeroLineBorderDash: [2],
            zeroLineBorderDashOffset: [2],
            zeroLineColor: theme.palette.divider
          }
        }
      ]
    },
    tooltips: {
      backgroundColor: theme.palette.background.paper,
      bodyFontColor: theme.palette.text.secondary,
      borderColor: theme.palette.divider,
      borderWidth: 1,
      enabled: true,
      footerFontColor: theme.palette.text.secondary,
      intersect: false,
      mode: 'index',
      titleFontColor: theme.palette.text.primary
    }
  };
  const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(3),
      height: theme.spacing(3),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));
  const classes = useStyles();

  return (
    <Card {...props}>
      <CardHeader
        action={(
          <Typography
          color="black"
          variant="h6"
          >
            By Month
          </Typography>
        )}
        title="Latest Forecasts in WVSU"
        

      />
      <Avatar style={{ marginLeft: 208, marginBottom: 2, marginTop: -51 }} alt="location_list1" src="/static/images/locationlists/locationlist_1.png" className={classes.small} />
      <Divider />
      <CardContent>
        <Box
          sx={{
            height: 400,
            position: 'relative'
          }}
        >
          <Bar
            data={data}
            options={options}
          />
        </Box>
      </CardContent>
      <Divider />
    </Card>
  );
};

export default Forecastlist;
