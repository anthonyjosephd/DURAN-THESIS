/* eslint-disable */
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import {
  Box,
  Button,
  Container,
  Link,
  TextField,
  Typography
} from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import useAdminUserActions from 'src/actions/user_admin.actions';

const Login = () => {
  const navigate = useNavigate();
  const userAdminActions = useAdminUserActions();
  
  // form validation rules 
  const validationSchema = Yup.object().shape({
    username: Yup.string().required('Username is required'),
    password: Yup.string().required('Password is required')
});
const formOptions = { resolver: yupResolver(validationSchema) };

// get functions to build form with useForm() hook
const { register, handleSubmit, formState } = useForm(formOptions);
const { errors, isSubmitting } = formState;
const useStyles = makeStyles((theme) => ({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    small: {
      width: theme.spacing(1),
      height: theme.spacing(1),
    },
    large: {
      width: theme.spacing(15),
      height: theme.spacing(15),
    },
  }));
  const classes = useStyles();

return (
    <div className="card m-3">
        <Avatar style={{ marginLeft: 742, marginBottom: 12, marginTop: 12, height: '20%', width: '20%' }} alt="pa" src="/static/images/pa.png" className={classes.small} />
        <h6 style={{ marginLeft: 515, fontSize: 30, marginBottom: 16 }} className="card-header">Project Ahon: An Automated Machine Learning Contact Tracer</h6>
        <div className="card-body">
            <label style={{ marginLeft: 765 }}> "Please enter your admin email and password" </label>
            <form onSubmit={handleSubmit(userAdminActions.login)}>
                <div style={{ marginLeft: 690, marginTop: 30, fontSize: 25 }} className="form-group">
                    <label >USERNAME: </label>
                    <input style={{ fontSize: 25 }}  name="username" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.username?.message}</div>
                </div>
                <div style={{ marginLeft: 690, marginTop: 10, fontSize: 25 }} className="form-group">
                    <label>PASSWORD:  </label>
                    <input style={{ fontSize: 25 }} name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
                    <div className="invalid-feedback">{errors.password?.message}</div>
                </div>
                <button disabled={isSubmitting} style={{ marginLeft: 825, marginTop: 30, fontSize: 20 }} className="btn btn-primary">
                    {isSubmitting && <span className="spinner-border spinner-border-sm mr-1"></span>}
                    Login
                </button>
                <Link to="/register" style={{ marginLeft: 40, fontSize: 20 }} className="btn btn-link">REGISTER</Link>
            </form>
        </div>
    </div>
)
};

export default Login;
