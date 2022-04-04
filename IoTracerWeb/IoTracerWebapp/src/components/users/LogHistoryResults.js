import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { userlogsAtom } from 'src/state/userlogs';
import useuserlogsActions from 'src/actions/userlogs.action';
import { Card } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';

const columns = [
  { field: 'id', headerName: 'ID', width: 150 },
  {
    field: 'log_date',
    headerName: 'Date',
    width: 240,
    type: 'date'
  },
  {
    field: 'user_fullname',
    headerName: 'User Full Name',
    width: 200,
  },
  {
    field: 'name',
    headerName: 'Location ID',
    width: 200,
  },
  {
    field: 'logtype',
    headerName: 'Logged Type',
    width: 200,
  },
  {
    field: 'usertemp',
    headerName: 'User Temp',
    width: 120,
    type: 'number'
  }
];

const LogHistoryResults = () => {
  const userLogs = useRecoilValue(userlogsAtom);
  const userlogsActions = useuserlogsActions();

  useEffect(() => {
    userlogsActions.getUserLogs();
    return userlogsActions.resetUserLogs;
  }, []);

  return (
    <Card>
      <div style={{ height: 600, width: '100%' }}>
        <DataGrid rows={userLogs} columns={columns} />
      </div>
    </Card>
  );
};

export default LogHistoryResults;
