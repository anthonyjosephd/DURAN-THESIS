import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import VaccinatedUsersResults from 'src/components/users/VaccinatedUsersResults';
import VaccinatedUsersToolbar from 'src/components/users/VaccinatedUsersToolbar';

const VaccinatedUsers = () => (
  <>
    <Helmet>
      <title>Vaccinated Users</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <VaccinatedUsersToolbar />
        <Box sx={{ pt: 3 }}>
          <VaccinatedUsersResults VaccinatedUsers={VaccinatedUsers} />
        </Box>
      </Container>
    </Box>
  </>
);

export default VaccinatedUsers;
