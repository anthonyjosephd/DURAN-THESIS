/* eslint-disable */
import { useRecoilState } from 'recoil';
import authAtom from 'src/state/auth';
import history from './history';

function useFetchWrapper() {
  //const [auth, setAuth] = useRecoilState(authAtom);

  function handleResponse(response) {
    return response.text().then((text) => {
      const data = text && JSON.parse(text);
      if (!response.ok) {
        if ([401, 403].includes(response.status) && auth?.token ) {
          localStorage.removeItem('user');
          //setAuth(null);
          history.push('login');
          console.log('error');
        }
        const error = ( data && data.message ) || response.statusText;
        return Promise.reject(error);
      }
      return data;
    });
  }

  function request(method) {
    return (url, body) => {
      const reqOptions = {
        method,
        headers: authHeader(url)
      };
      if (body) {
        reqOptions.headers['Content-type'] = 'application/json';
        reqOptions.body = JSON.stringify(body);
        console.log(reqOptions.body);
      }
      return fetch(url, reqOptions).then(handleResponse);
    };
  }

  function authHeader(url) {
    const token = JSON.parse(localStorage.getItem('user'))?.token;//auth?.token;
    const isLoggedIn = !!token;
    //const isApiUrl = url.startsWith(process.env.REACT_APP_API_URL);
    if (isLoggedIn) {
      return { Authorization: `Bearer ${token}` };
    } else {
      return {};
    }
  }

  return {
    get: request('GET'),
    post: request('POST'),
    put: request('PUT'),
    delete: request('DELETE')
  };
}

export default useFetchWrapper;
