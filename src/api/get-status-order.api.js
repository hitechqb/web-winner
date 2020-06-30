import {DoPostParam} from "src/api/api";

const END_POINT = '/autodebit/v2/api/query-order';
const getStatusOrder = function getStatusOrder(appTransId) {
  const payload = {
    app_id: process.env.APP_ID,
    app_trans_id: appTransId,
    mac_key: process.env.MAC_KEY
  };

  return DoPostParam(END_POINT, payload)
};

export {
  getStatusOrder,
}
