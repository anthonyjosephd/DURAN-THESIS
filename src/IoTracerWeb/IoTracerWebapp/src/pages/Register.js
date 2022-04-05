import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import * as Yup from 'yup';
import { Formik } from 'formik';
import {
  Box,
  Checkbox,
  Container,
  FormHelperText,
  Link,
  Button,
  TextField,
  Typography
} from '@material-ui/core';

const Register = () => {
  const navigate = useNavigate();
  const useStyles = makeStyles((theme) => ({
    formControl: {
      margin: theme.spacing(3),
      width: 549
    },
  }));
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <>
      <Helmet>
        <title>Register</title>
      </Helmet>
      <Box
        sx={{
          backgroundColor: 'background.default',
          display: 'flex',
          flexDirection: 'column',
          height: '200%',
          justifyContent: 'center'
        }}
      >
        <Container maxWidth="sm">
          <Formik
            initialValues={{
              email: '',
              age: '',
              occupation: '',
              vaccinated: '',
              contactno: '',
              gender: '',
              firstName: '',
              lastName: '',
              password: '',
              policy: false
            }}
            validationSchema={
              Yup.object().shape({
                email: Yup.string().email('Must be a valid email').max(255).required('Email is required'),
                age: Yup.string().max(255).required('Age is required'),
                occupation: Yup.string().max(255),
                vaccinated: Yup.string().max(255),
                gender: Yup.string().max(255).required('Gender is required'),
                contactno: Yup.string().max(255),
                firstName: Yup.string().max(255).required('First name is required'),
                lastName: Yup.string().max(255).required('Last name is required'),
                password: Yup.string().max(255).required('password is required'),
                policy: Yup.boolean().oneOf([true], 'This field must be checked')
              })
            }
            onSubmit={() => {
              navigate('/app/login', { replace: true });
            }}
          >
            {({
              errors,
              handleBlur,
              handleChange,
              handleSubmit,
              isSubmitting,
              touched,
              values
            }) => (
              <form onSubmit={handleSubmit}>
                <Box sx={{ mb: 4 }}>
                  <Typography
                    color="textPrimary"
                    variant="h2"
                  >
                    Create new account
                  </Typography>
                  <Typography
                    color="textSecondary"
                    gutterBottom
                    variant="body2"
                  >
                    Use your email to create new account
                  </Typography>
                </Box>
                <TextField
                  error={Boolean(touched.firstName && errors.firstName)}
                  fullWidth
                  helperText={touched.firstName && errors.firstName}
                  label="First name"
                  margin="normal"
                  name="firstName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.firstName}
                  variant="outlined"
                />
                <div style={{ width: '100%' }}>
                  <FormControl className={classes.formControl}>
                    <InputLabel id="demo-controlled-open-select-label">Occupation</InputLabel>
                    <Select
                      labelId="demo-controlled-open-select-label"
                      id="demo-controlled-open-select"
                      open={open}
                      onClose={handleClose}
                      onOpen={handleOpen}
                      value={values.occupation}
                      onChange={handleChange}
                    >
                      <MenuItem value="">
                        <em>Select occupation if employed</em>
                      </MenuItem>
                      <MenuItem value>Teacher</MenuItem>
                      <MenuItem value={2}>Nurse</MenuItem>
                      <MenuItem value={3}>Taxi Driver</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <TextField
                  error={Boolean(touched.lastName && errors.lastName)}
                  fullWidth
                  helperText={touched.lastName && errors.lastName}
                  label="Last name"
                  margin="normal"
                  name="lastName"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  value={values.lastName}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.email && errors.email)}
                  fullWidth
                  helperText={touched.email && errors.email}
                  label="Email Address"
                  margin="normal"
                  name="email"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="email"
                  value={values.email}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.age && errors.age)}
                  fullWidth
                  helperText={touched.age && errors.age}
                  label="Age"
                  margin="normal"
                  name="age"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="age"
                  value={values.age}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.gender && errors.gender)}
                  fullWidth
                  helperText={touched.gender && errors.gender}
                  label="Gender"
                  margin="normal"
                  name="gender"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="gender"
                  value={values.gender}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.contactno && errors.contactno)}
                  fullWidth
                  helperText={touched.contactno && errors.contactno}
                  label="Contact Number"
                  margin="normal"
                  name="contactno"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="contactno"
                  value={values.contactno}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.occupation && errors.occupation)}
                  fullWidth
                  helperText={touched.occupation && errors.occupation}
                  label="Occupation"
                  margin="normal"
                  name="occupation"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="occupation"
                  value={values.occupation}
                  variant="outlined"
                />
                <TextField
                  error={Boolean(touched.password && errors.password)}
                  fullWidth
                  helperText={touched.password && errors.password}
                  label="Password"
                  margin="normal"
                  name="password"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="password"
                  value={values.password}
                  variant="outlined"
                />
                <Box
                  sx={{
                    alignItems: 'center',
                    display: 'flex',
                    ml: -1
                  }}
                >
                  <Checkbox
                    checked={values.policy}
                    name="policy"
                    onChange={handleChange}
                  />
                  <Typography
                    color="textSecondary"
                    variant="body1"
                  >
                    I have read the
                    {' '}
                    <Link
                      color="primary"
                      component={RouterLink}
                      to="#"
                      underline="always"
                      variant="h6"
                    >
                      Terms and Conditions
                    </Link>
                  </Typography>
                </Box>
                {Boolean(touched.policy && errors.policy) && (
                  <FormHelperText error>
                    {errors.policy}
                  </FormHelperText>
                )}
                <Box sx={{ py: 2 }}>
                  <Button
                    color="primary"
                    disabled={isSubmitting}
                    fullWidth
                    size="large"
                    type="submit"
                    variant="contained"
                  >
                    Sign up now
                  </Button>
                </Box>
                <Typography
                  color="textSecondary"
                  variant="body1"
                >
                  Have an account?
                  {' '}
                  <Link
                    component={RouterLink}
                    to="/login"
                    variant="h6"
                  >
                    Sign in
                  </Link>
                </Typography>
              </form>
            )}
          </Formik>
        </Container>
      </Box>
    </>
  );
};

export default Register;
