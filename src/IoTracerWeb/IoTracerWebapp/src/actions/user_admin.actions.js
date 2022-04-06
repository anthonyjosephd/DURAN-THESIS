/* eslint-disable */
import { useRecoilState } from 'recoil';
import { useNavigate } from 'react-router-dom';
import authAtom from 'src/state/auth';
import useFetchWrapper from 'src/helpers/fetch-wrapper';
import history from 'src/helpers/history';

const baseAppURL = 'http://192.168.254.101:4000/api';

function useAdminUserActions() {
const navigate = useNavigate();
  const fetchWrapper = useFetchWrapper();
  //const setAuth = useRecoilState(authAtom);

  function login({ username, password }) {
    return fetchWrapper.post(`${baseAppURL}/admin/auth`, { username, password })
        .then((user) => {
            localStorage.setItem('user', JSON.stringify(user));
            console.log(JSON.stringify(user))
            //setAuth(user);

            //const { from } = history.location.state || { from: { pathname: '/' }};
            navigate('/app/forecast');
        });
  }

  function logout() {
      localStorage.removeItem('user');
      //setAuth(null);
      navigate('/login');
  }

  return {
    login,
    logout
  };
}

export default useAdminUserActions;