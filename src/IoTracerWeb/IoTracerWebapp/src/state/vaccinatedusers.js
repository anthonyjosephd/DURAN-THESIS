import { atom } from 'recoil';

const vaccinateduserAtom = atom({
  key: 'vaccinateduser',
  default: null
});

const vaccinatedusersAtom = atom({
  key: 'vaccinatedusers',
  default: []
});

export {
  vaccinateduserAtom,
  vaccinatedusersAtom,
};
