import { useResetRecoilState, useSetRecoilState } from 'recoil';
import {
  forecastAtom,
  lastTrainDataAtom,
  listofforecastsAtom,
  runforecastsAtom
} from 'src/state/forecast';
import useFetchWrapper from 'src/helpers/fetch-wrapper';

const baseAppURL = 'http://192.168.254.101:4000/api';

function useforecastsActions() {
  const fetchWrapper = useFetchWrapper();
  const setForecast = useSetRecoilState(forecastAtom);
  const setRunForecast = useSetRecoilState(runforecastsAtom);
  const setLastTrainData = useSetRecoilState(lastTrainDataAtom);
  const setListOfForecasts = useSetRecoilState(listofforecastsAtom);

  function getLastForcast() {
    return fetchWrapper.get(`${baseAppURL}/forecasts/getlastforcast`).then(setForecast);
  }

  function getRunForecast() {
    return fetchWrapper.get(`${baseAppURL}/forecasts/runforecast`).then(setRunForecast);
  }

  function getLastTrainData() {
    return fetchWrapper.get(`${baseAppURL}/train_data/getlasttraindata`).then(setLastTrainData);
  }

  function getListOfForecasts() {
    return fetchWrapper.get(`${baseAppURL}/forecasts/getforecastbymonth`).then(setListOfForecasts);
  }

  return {
    getLastForcast,
    getRunForecast,
    getLastTrainData,
    getListOfForecasts,
    resetForcast: useResetRecoilState(forecastAtom),
    resetRunForcast: useResetRecoilState(runforecastsAtom),
    resetLastTrainData: useResetRecoilState(lastTrainDataAtom),
    resetListOfForecasts: useResetRecoilState(listofforecastsAtom)
  };
}

export default useforecastsActions;
