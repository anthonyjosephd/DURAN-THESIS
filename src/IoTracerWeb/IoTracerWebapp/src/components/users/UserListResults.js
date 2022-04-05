/* eslint-disable */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { registeredusersAtom } from 'src/state/registeredusers';
import useregisteredusersActions from 'src/actions/registeredusers.action';
import { Card } from '@material-ui/core';
import { Link } from 'react-router-dom';
import { DataGrid } from '@mui/x-data-grid';

const UserListResults = () => {
  const navigate = useNavigate();
  const registeredusers = useRecoilValue(registeredusersAtom);
  const registeredusersActions = useregisteredusersActions();

const columns = [
  { field: 'id', headerName: 'ID', width: 10 },
  {
    field: 'rfid',
    headerName: 'RFID',
    width: 130,
    type: 'number'
  },
  {
    field: 'userreg_date',
    headerName: 'Registered Date',
    width: 140,
    type: 'date'
  },
  {
    field: 'user_fullname',
    headerName: 'User Full Name',
    width: 160,
  },
  {
    field: 'age',
    headerName: 'Age',
    width: 160,
  },
  {
    field: 'address',
    headerName: 'Address',
    width: 170,
  },
  {
    field: 'gender',
    headerName: 'Gender',
    width: 100,
  },
  {
    field: 'description',
    headerName: 'Occupation',
    width: 180,
  },
  {
    field: 'email',
    headerName: 'Email',
    width: 160,
  },
  {
    field: 'contactno',
    headerName: 'Contact No.',
    width: 190,
  },
  {
    field: 'vaccine_status',
    headerName: 'Vaccine Status',
    width: 190,
  },
  {
    field: 'user_status',
    headerName: 'Status',
    width: 120,
  },
  {
    field: 'Edit',
    headerName: '',
    renderCell: (cellValues) => {
      return ( 
      <Link to={`/app/userlist/edit/${cellValues.id}`}>Edit</Link>
      );
    }
  },
  {
    field: 'Delete',
    headerName: '',
    renderCell: (cellValues) => {
      return ( 
      <button onClick={() => {
        console.log(cellValues.id);
        registeredusersActions.remove(cellValues.id);
        location.reload();
      }}>
        Delete
      </button>
      );
    }
  }
];


  useEffect(() => {
    registeredusersActions.getRegisteredUsers();
    return registeredusersActions.resetRegisteredUsers;
  }, []);

  return (
    <Card>
      <div style={{ height: 600, width: '100%' }}>
        <Link style={{ marginLeft: 30, fontSize: 22 }}to="/app/userlist/add">Add New User</Link>
        <DataGrid rows={registeredusers} columns={columns} />
      </div>
    </Card>
  );
};

export default UserListResults;
