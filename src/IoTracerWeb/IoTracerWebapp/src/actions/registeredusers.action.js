import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { registeredusersAtom, registereduserAtom } from 'src/state/registeredusers';
import useFetchWrapper from 'src/helpers/fetch-wrapper';

const baseAppURL = 'http://192.168.254.101:4000/api';

function useregisteredusersActions() {
  const fetchWrapper = useFetchWrapper();
  const setRegisteredUser = useSetRecoilState(registereduserAtom);
  const setRegisteredUsers = useSetRecoilState(registeredusersAtom);

  function getRegisteredUsers() {
    return fetchWrapper.get(`${baseAppURL}/users`).then(setRegisteredUsers);
  }

  function update(id, data) {
    return fetchWrapper.put(`${baseAppURL}/users/${id}`, data);
  }

  function create(data) {
    return fetchWrapper.post(`${baseAppURL}/users`, data);
  }

  function remove(id) {
    return fetchWrapper.delete(`${baseAppURL}/users/${id}`);
  }

  function getById(id) {
    return fetchWrapper.get(`${baseAppURL}/users/getbyid/${id}`).then(setRegisteredUser);
  }

  return {
    getById,
    update,
    create,
    remove,
    getRegisteredUsers,
    resetRegisteredUsers: useResetRecoilState(registeredusersAtom),
    resetRegisteredUser: useResetRecoilState(registereduserAtom),
  };
}

export default useregisteredusersActions;
