import { CHANGE_SYNC /*CHANGE_ASYNC*/ } from './01_constants';

export function changeSync(theme) {
  return {
    type: CHANGE_SYNC,
    theme,
  };
}
