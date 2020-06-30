import * as actions from './actions';
import mutations from './mutations';
import state from './state';
import * as getters from './getters';


export default {
  namespaced: true,
  mutations,
  actions,
  state,
  getters
};
