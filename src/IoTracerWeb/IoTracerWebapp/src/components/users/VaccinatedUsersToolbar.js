import React from 'react';

import {
  Card,
  Typography
} from '@material-ui/core';

function VaccinatedUsersToolbar() {
  return (
    <Card>
      <div style={{ height: 70, marginTop: 20, width: '100%' }}>
        <Typography
          color="black"
          align="center"
          gutterBottom
          variant="h1"
        >
          Vaccinated Users
        </Typography>
      </div>
    </Card>
  );
}

export default VaccinatedUsersToolbar;
