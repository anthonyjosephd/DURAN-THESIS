import React from 'react';

import {
  Card,
  Typography
} from '@material-ui/core';

function LogHistoryToolbar() {
  return (
    <Card>
      <div style={{ height: 70, marginTop: 28, width: '100%' }}>
        <Typography
          color="black"
          align="center"
          gutterBottom
          variant="h1"
        >
          LOG HISTORY
        </Typography>
      </div>
    </Card>
  );
}

export default LogHistoryToolbar;
