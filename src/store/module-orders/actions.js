import {
  ADD_PRODUCT_TO_ORDER,
  CREATE_ORDER_API,
  SET_DATA,
  SET_ERROR_RESPONSE,
  SET_RESPONSE_CREATE_ORDER
} from "src/store/mutation-types";
import {createOrder} from 'src/api/create-order.api'
import da from "quasar/lang/da";
import {MSG_INTERNAL_SERVER, MSG_NOT_FOUND} from "src/helpers/messages";

/**s
 *
 * @param { function } commit
 * @param { object } product
 */
export function addProductToOrder({commit}, {product}) {
  commit(ADD_PRODUCT_TO_ORDER, {product});
}

export async function createOrderApi({commit}, {order, currentPayment}) {
  try {
    const response = await createOrder(order, currentPayment);
    if (response.status === 200) {
      const data = JSON.parse(response.data['response_data']);
      if (data['return_code'] === 1) {
        commit(SET_RESPONSE_CREATE_ORDER, {createOrderResponse: data})
      } else {
        commit(SET_ERROR_RESPONSE, {errorMsg: data['sub_return_message']});
      }
    } else {
      commit(SET_ERROR_RESPONSE, {errorMsg: MSG_INTERNAL_SERVER})
    }

  } catch (error) {
    console.log('[CreateOrder Error]: ', error);
    commit(SET_ERROR_RESPONSE, {errorMsg: error.message})
  }
}
