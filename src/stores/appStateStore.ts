import { atom } from 'recoil';

export const ThemeState = atom<'light' | 'dark' | ''>({
  key: 'ThemeState',
  default: '',
});
