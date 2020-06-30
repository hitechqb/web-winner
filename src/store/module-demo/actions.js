import {GET_USER_BY_ID} from '../mutation-types';

/**
 *
 * @param { function } commit
 * @param payload
 */

export function getUserById({commit}, payload) {
  commit(GET_USER_BY_ID, payload.id);
}

