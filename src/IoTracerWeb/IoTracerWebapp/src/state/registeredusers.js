import { atom } from 'recoil';

const registereduserAtom = atom({
  key: 'registereduser',
  default: null
});

const registeredusersAtom = atom({
  key: 'registeredusers',
  default: null
});

export {
  registereduserAtom,
  registeredusersAtom
};
