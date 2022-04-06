import { atom } from 'recoil';

const forecastsAtom = atom({
  key: 'forecasts',
  default: null
});

const runforecastsAtom = atom({
  key: 'runforecasts',
  default: null
});

const forecastAtom = atom({
  key: 'forecast',
  default: null
});

const lastTrainDataAtom = atom({
  key: 'lastTrainData',
  default: null
});

const listofforecastsAtom = atom({
  key: 'listofforecasts',
  default: []
});

export {
  forecastAtom,
  forecastsAtom,
  runforecastsAtom,
  lastTrainDataAtom,
  listofforecastsAtom
};
