/* eslint-disable */
import { useState, useEffect } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import { useRecoilValue } from 'recoil';
import { registereduserAtom } from 'src/state/registeredusers';
import useregisteredusersActions from 'src/actions/registeredusers.action';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

function AddEditUserList() {
  const navigate = useNavigate();
  const { id } = useParams();
  const mode = { add: !id, edit: !!id };
  const registeredUser = useRecoilValue(registereduserAtom);
  const registeredUserActions = useregisteredusersActions();
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
      registeredUserActions.getById(id);
    }

    return registeredUserActions.resetRegisteredUser;

    
  }, []);

  useEffect(() => {
    // set default form values after user set in recoil state (in edit mode)
    if (mode.edit && registeredUser) {
      reset(registeredUser);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [registeredUser]);

  function onSubmit(data) {
    return mode.add
      ? createRecord(data)
      : updateRecord(data);
  }

  function createRecord(data) {
    return registeredUserActions.create(data)
        .then(() => {
            navigate('/app/userlist');
        });
  }

  function updateRecord(data) {
    console.log(data);
    return registeredUserActions.update(registeredUser.id, data)
        .then(() => {
            navigate('/app/userlist');
        });
  }

  const loading = mode.edit && !registeredUser;
  return (
      <>
      <h1 style={{ marginLeft: 280, marginTop: 25 }}> {mode.add ? 'Update User info' : 'Edit Record'}</h1>
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
                        <FormControl style={{ marginLeft: 372, width: 330, marginTop: -20 }} >
                            <label style={{ marginLeft: -149, marginBottom: -49, fontSize: 30 }}>Occupation:</label>
                            <Select
                            {...register('occupationid')}
                            name="occupationid"
                            open={open}
                            onClose={handleClose}
                            onOpen={handleOpen}
                            value={ registeredUser?.description }
                            >
                            <MenuItem value="">
                                <em>Select occupation</em>
                            </MenuItem>
                            <MenuItem value='1'>Nurse</MenuItem>
                            <MenuItem value='2'>Teacher</MenuItem>
                            <MenuItem value='3'>Doctor</MenuItem>
                            <MenuItem value='4'>Acute Care Nurse</MenuItem>
                            <MenuItem value='5'>Advanced Practice Psychiatric Nurse</MenuItem>
                            <MenuItem value='6'>Allergists and Immunologists</MenuItem>
                            <MenuItem value='7'>Cardiovascular Technologists and Technicians</MenuItem>
                            <MenuItem value='8'>Chiropractor</MenuItem>
                            <MenuItem value='9'>Dental Hygienists</MenuItem>
                            <MenuItem value='10'>Licensed Practical and Licensed Vocational Nurses</MenuItem>
                            <MenuItem value='11'>Naturopathic Physicians</MenuItem>
                            <MenuItem value='12'>Obstetricians and Gynecologists</MenuItem>
                            <MenuItem value='13'>Database Architects</MenuItem>
                            <MenuItem value='14'>Computer Programmers</MenuItem>
                            <MenuItem value='15'>Computer User Support Specialists</MenuItem>
                            <MenuItem value='16'>Mathematical Science Occupations, All Other</MenuItem>
                            <MenuItem value='17'>Search Marketing Strategists</MenuItem>
                            <MenuItem value='18'>Statisticians</MenuItem>
                            <MenuItem value='19'>Plumbers</MenuItem>
                            <MenuItem value='20'>Art, Drama, and Music Teachers, Postsecondary</MenuItem>
                            <MenuItem value='21'>Not Employed</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
                <div style={{ marginLeft: 15, marginBottom: 35 }} className="form-row">
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>First name: </label>
                        <input style={{ fontSize: 30 }} name="firstname" type="text" {...register('firstname')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Last name: </label>
                        <input style={{ fontSize: 30 }} name="lastname" type="text" {...register('lastname')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Contact No. : </label>
                        <input style={{ fontSize: 30 }} name="contactno" type="number" {...register('contactno')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Age : </label>
                        <input style={{ fontSize: 30 }} name="age" type="number" {...register('age')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Address : </label>
                        <input style={{ fontSize: 30 }} name="address" type="text" {...register('address')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Status : </label>
                        <input style={{ fontSize: 30 }} name="status" type="number" {...register('status')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Gender : </label>
                        <input style={{ fontSize: 30 }} name="gender" type="number" {...register('gender')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Email address : </label>
                        <input style={{ fontSize: 30 }} name="email" type="text" {...register('email')} />
                    </div>
                    <div style={{ marginBottom: 23, marginLeft: 245, fontSize: 30 }} className="form-group col">
                        <label>Date Registered : </label>
                        <input style={{ fontSize: 30 }} name="dateregistered" type="date" {...register('dateregistered')} />
                    </div>
                </div>
                <div style={{ marginLeft: 420, marginBottom: 16,
                marginTop: 40, fontSize: 30 }} className="form-group">
                    <button style={{ marginBottom: 16, fontSize: 30 }} type="submit" disabled={isSubmitting} className="btn btn-primary mr-2">
                        {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                        Save
                    </button>
                    <button onClick={() => reset(registeredUser)} type="button" disabled={isSubmitting} style={{ marginLeft: 13, marginRight: 13,  fontSize: 30 }} className="btn btn-secondary">Reset</button>
                    <Link to="/app/userlist" className="btn btn-link">Cancel</Link>
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

export default AddEditUserList;