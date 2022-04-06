import { useResetRecoilState, useSetRecoilState } from 'recoil';
import { userlogsAtom } from 'src/state/userlogs';
import useFetchWrapper from 'src/helpers/fetch-wrapper';

const baseAppURL = 'http://192.168.254.101:4000/api';

function useuserlogsActions() {
  const fetchWrapper = useFetchWrapper();
  const setUserLogs = useSetRecoilState(userlogsAtom);

  function getUserLogs() {
    return fetchWrapper.post(`${baseAppURL}/logs/list`, null).then(setUserLogs);
  }

  return {
    getUserLogs,
    resetUserLogs: useResetRecoilState(userlogsAtom),
  };
}

export default useuserlogsActions;
