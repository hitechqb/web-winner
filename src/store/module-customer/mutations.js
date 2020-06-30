import {ADD_CUSTOMER_ORDER} from "src/store/mutation-types";

export default {
  /**
   *
   * @param { object } state
   * @param { object } customer
   */
  [ADD_CUSTOMER_ORDER](state, {customer}) {
    state.currentCustomer = customer;
  },
};
