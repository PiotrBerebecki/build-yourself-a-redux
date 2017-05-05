import { CHANGE_SYNC } from './01_constants';

export default (state = 'light', action) => {
  switch (action.type) {
    case CHANGE_SYNC:
      // console.log('sync reducer action theme', action.theme);
      return action.theme;
    default:
      return state;
  }
};
