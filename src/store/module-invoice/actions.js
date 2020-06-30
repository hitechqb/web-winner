import {SET_ERROR_RESPONSE, SET_IS_LOADING, SET_STATUS_INVOICE} from '../mutation-types';
import {MSG_INTERNAL_SERVER} from "src/helpers/messages";
import {getStatusOrder} from "src/api/get-status-order.api";
import {KEY_LOCAL_ORDER} from "src/helpers/const";

export async function fetchStatusInvoice({commit}, appTransId) {
  console.log('appTransId: ', appTransId)
  // fetch status
  try {
    const response = await getStatusOrder(appTransId);
    if (response.status === 200) {
      localStorage.removeItem(KEY_LOCAL_ORDER);
      const data = JSON.parse(response.data['response_data']);

      if (data['return_code'] === 1) {
        const zpTransId = data['zp_trans_id'];
        console.log('zpTransId: ', zpTransId);
        commit(SET_STATUS_INVOICE, {status: 1, zpTransId: zpTransId});
      } else {
        // commit(SET_ERROR_RESPONSE, {errorMsg: data['sub_return_message']});
      }
    } else {
      //commit(SET_ERROR_RESPONSE, {errorMsg: MSG_INTERNAL_SERVER})
    }

  } catch (error) {
    console.log('[Get Status Order Error]: ', error);
    //commit(SET_ERROR_RESPONSE, {errorMsg: error.message})
  }
}

export function setLoading({commit}, isLoading) {
  console.log('setLoading 111');
  commit(SET_IS_LOADING, isLoading)
}
