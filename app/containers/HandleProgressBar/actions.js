import { DEFAULT_ACTION, SET_PROGRESS_BAR } from './constants';

export function defaultAction() {
  return {
    type: DEFAULT_ACTION,
  };
}

export const setProgressBar = isOpen => ({
  type: SET_PROGRESS_BAR,
  isOpen,
});
