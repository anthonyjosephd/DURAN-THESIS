import { Helmet } from 'react-helmet';
import { Box, Container } from '@material-ui/core';
import UserListResults from 'src/components/users/UserListResults';
import UserListToolbar from 'src/components/users/UserListToolbar';

const UserList = () => (
  <>
    <Helmet>
      <title>User List Info</title>
    </Helmet>
    <Box
      sx={{
        backgroundColor: 'background.default',
        minHeight: '100%',
        py: 3
      }}
    >
      <Container maxWidth={false}>
        <UserListToolbar />
        <Box sx={{ pt: 3 }}>
          <UserListResults UserList={UserList} />
        </Box>
      </Container>
    </Box>
  </>
);

export default UserList;
