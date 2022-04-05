/* eslint-disable */
import { useEffect } from 'react';
import { useRecoilValue } from 'recoil';
import { useNavigate } from 'react-router-dom';
import { vaccinatedusersAtom } from 'src/state/vaccinatedusers';
import { Card } from '@material-ui/core';
import { DataGrid } from '@mui/x-data-grid';
import { Link } from 'react-router-dom';
import usevaccinatedusersActions from 'src/actions/vaccinatedusers.action';

const VaccinatedUsersResults = () => {
  const navigate = useNavigate();
  const vaccinatedusers = useRecoilValue(vaccinatedusersAtom);
  const vaccinatedusersActions = usevaccinatedusersActions();

  const columns = [
    { field: 'id', headerName: 'ID', width: 90 },
    {
      field: 'rfid',
      headerName: 'RFID',
      width: 100
    },
    {
      field: 'user_fullname',
      headerName: 'User Full Name',
      width: 200,
    },
    {
      field: 'vaccine_status',
      headerName: 'Vaccine Status',
      width: 140
    },
    {
      field: 'firstdosevac',
      headerName: 'First Dose of Vaccine',
      width: 200,
    },
    {
      field: 'datevaccinated_first',
      headerName: 'First Date of Vaccination',
      width: 140,
      type: 'date'
    },
    {
      field: 'seconddosevac',
      headerName: 'Second Dose of Vaccine',
      width: 200,
    },
    {
      field: 'datevaccinated_second',
      headerName: 'Second Date of Vaccination',
      width: 240,
      type: 'date'
    },
    {
      field: 'Edit',
      headerName: '',
      renderCell: (cellValues) => {
        return ( 
        <Link to={`/app/vaccinatedusers/edit/${cellValues.id}`}>Edit</Link>
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
          vaccinatedusersActions.remove(cellValues.id);
          location.reload();
        }}>
          Delete
        </button>
        );
      }
    }
  ];

  useEffect(() => {
    vaccinatedusersActions.getVaccinatedUsers();
    return vaccinatedusersActions.resetVaccinatedUsers;
  }, []);
  console.log(vaccinatedusers);
  return (
    <Card>
      <div style={{ height: 600, width: '100%' }}>
        <Link style={{ marginLeft: 30, fontSize: 22 }}to="/app/vaccinatedusers/add">Update User V-Record </Link>
        <DataGrid rows={vaccinatedusers} columns={columns} />
      </div>
    </Card>
  );
};

export default VaccinatedUsersResults;
