import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { vaccinatedusersAtom, vaccinateduserAtom } from 'src/state/vaccinatedusers';
import useFetchWrapper from 'src/helpers/fetch-wrapper';

const baseAppURL = 'http://192.168.254.101:4000/api';

function usevaccinatedusersActions() {
  const fetchWrapper = useFetchWrapper();
  const setVaccinatedUser = useSetRecoilState(vaccinateduserAtom);
  const setVaccinatedUsers = useSetRecoilState(vaccinatedusersAtom);

  function getVaccinatedUsers() {
    return fetchWrapper.get(`${baseAppURL}/vaccinatedusers`).then(setVaccinatedUsers);
  }

  function update(data) {
    return fetchWrapper.put(`${baseAppURL}/vaccinatedusers`, data);
  }

  function create(data) {
    return fetchWrapper.post(`${baseAppURL}/vaccinatedusers`, data);
  }

  function remove(id) {
    return fetchWrapper.delete(`${baseAppURL}/vaccinatedusers/${id}`);
  }

  function getById(id) {
    return fetchWrapper.get(`${baseAppURL}/vaccinatedusers/getbyid/${id}`).then(setVaccinatedUser);
  }

  return {
    getById,
    update,
    create,
    remove,
    getVaccinatedUsers,
    resetVaccinatedUsers: useResetRecoilState(vaccinatedusersAtom),
    resetVaccinatedUser: useResetRecoilState(vaccinateduserAtom),
  };
}

export default usevaccinatedusersActions;
