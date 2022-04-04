/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { vaccinateduserAtom } from 'src/state/vaccinatedusers';
import usevaccinatedusersActions from 'src/actions/vaccinatedusers.action';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function AddEditVaccinatedUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mode = { add: !id, edit: !!id };
  const vaccinatedUser = useRecoilValue(vaccinateduserAtom);
  const vaccinatedUserActions = usevaccinatedusersActions();
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };
  // form validation rules
  const validationSchema = Yup.object().shape({
    rfid: Yup.string()
      .required('RFID is required')
  });
  const formOptions = { resolver: yupResolver(validationSchema) };

  // get functions to build form with useForm() hook
  const {
    register,
    handleSubmit,
    reset,
    formState
  } = useForm(formOptions);
  const { isSubmitting } = formState;

  useEffect(() => {
    // fetch user details into recoil state in edit mode
    if (mode.edit) {
      vaccinatedUserActions.getById(id);
    }

    return vaccinatedUserActions.resetVaccinatedUser;

    
  }, []);

  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && vaccinatedUser) {
      reset(vaccinatedUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [vaccinatedUser]);

  function onSubmit(data) {
    return mode.add
      ? createRecord(data)
      : updateRecord(data);
  }

  function createRecord(data) {
    console.log(data);
    return vaccinatedUserActions.create(data)
        .then(() => {
            navigate('/app/vaccinatedusers');
        });
  }

  function updateRecord(data) {
    console.log(data);
    return vaccinatedUserActions.update(data)
        .then(() => {
            navigate('/app/vaccinatedusers');
        });
  }

  const loading = mode.edit && !vaccinatedUser;
  return (
      <>
      <h1 style={{ marginLeft: 280, marginTop: 25 }}> {mode.add ? 'Update User Vaccine Record' : 'Edit Record'}</h1>
      {!loading &&
        <form onSubmit={handleSubmit(onSubmit)}>
                <div style={{ marginLeft: 15, fontSize: 30 }} className="form-row">
                    <div style={{ marginLeft: 3, marginTop: 100,
                       height: 70, width: '100%' }} className="form-group col">
                        <label style={{ marginLeft: 250 }} >RFID:  </label>
                        <input style={{ fontSize: 30 }} name="rfid" type="text" {...register('rfid')} />
                        {/* <div className="invalid-feedback">{errors.obligation_no?.message}</div> */}
                    </div>
                    <div style={{ marginLeft: 15, width: '100%' }} className="form-group col">
                        <FormControl style={{ marginLeft: 322, width: 330, marginTop: -20 }} >
                            <label style={{ marginLeft: -89, marginBottom: -49, fontSize: 30 }}>Status:</label>
                            <Select
                            {...register('status')}
                            name="status"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={ vaccinatedUser?.status }
                            >
                            <MenuItem value="">
                                <em>Select status</em>
                            </MenuItem>
                            <MenuItem value='completed'>completed</MenuItem>
                            <MenuItem value='not completed'>not completed</MenuItem>
                            <MenuItem value='not yet'>not yet</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div style={{ marginLeft: 15, marginBottom: 35 }} className="form-row">
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>First Dose: </label>
                        <input style={{ fontSize: 30 }} name="firstdosevac" type="text" {...register('firstdosevac')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Date First Dose: </label>
                        <input style={{ fontSize: 30 }} name="datevaccinated_first" type="date" {...register('datevaccinated_first')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Second Dose: </label>
                        <input style={{ fontSize: 30 }} name="seconddosevac" type="text" {...register('seconddosevac')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Date First Dose: </label>
                        <input style={{ fontSize: 30 }} name="datevaccinated_second" type="date" {...register('datevaccinated_second')} />
                    </div>
                </div>
                <div style={{ marginLeft: 420, marginBottom: 16,
                marginTop: 40, fontSize: 30 }} className="form-group">
                    <button style={{ marginBottom: 16, fontSize: 30 }} type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <button onClick={() => reset(vaccinatedUser)} type="button" disabled={isSubmitting} style={{ marginLeft: 13, marginRight: 13,  fontSize: 30 }} className="btn btn-secondary">Reset</button>
                    <Link to="/app/vaccinatedusers" className="btn btn-link">Cancel</Link>
                </div>
            </form>
        }
        {loading &&
            <div className="text-center p-3">
                <span className="spinner-border spinner-border-lg align-center"></span>
            </div>
        }
    </>
);
}

export default AddEditVaccinatedUser;