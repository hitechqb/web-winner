import {ADD_CUSTOMER_ORDER} from '../mutation-types';

/**
 *
 * @param { function } commit
 * @param { string } data
 */
export function setData({commit}, {data}) {
  commit(ADD_CUSTOMER_ORDER, {data});
}
