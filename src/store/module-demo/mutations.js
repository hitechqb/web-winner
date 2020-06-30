import {GET_USER_BY_ID} from '../mutation-types';

export default {
  [GET_USER_BY_ID](state, id) {
    state.userOnline = state.users.find(x => x.id === id)
  },
};
