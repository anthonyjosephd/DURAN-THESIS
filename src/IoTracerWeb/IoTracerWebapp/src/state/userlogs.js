import { atom } from 'recoil';

const userlogAtom = atom({
  key: 'userlog',
  default: null
});

const userlogsAtom = atom({
  key: 'userlogs',
  default: []
});

export {
  userlogAtom,
  userlogsAtom,
};
