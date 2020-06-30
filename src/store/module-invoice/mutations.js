import {SET_IS_LOADING, SET_STATUS_INVOICE} from "src/store/mutation-types";

export default {
  [SET_STATUS_INVOICE](state, {status, zpTransId}) {
    state.status = status;
    state.zpTransId = zpTransId;
  },

  [SET_IS_LOADING](state, isLoading) {
    state.isLoading = isLoading;
  },
};
