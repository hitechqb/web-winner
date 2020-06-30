import {DoPostParam} from './api'
import {options} from "src/models/PaymentModel";

const END_POINT = '/autodebit/v2/api/create-order';

function getBankCodeByCurrentPayment(currentPayment) {
  let current;
  switch (currentPayment) {
    case options.GATEWAY: {
      current = '';
      break;
    }

    case options.ATM: {
      current = 'ATM';
      break;
    }

    case options.VISA_MASTER: {
      current = 'CC';
      break;
    }

    default: {
      current = 'zalopayapp';
    }
  }

  return current
}

const createOrder = function createOrder(data, currentPayment) {
  const customer = data['customer'];
  let embedData = '{}';
  let bankCode = getBankCodeByCurrentPayment(currentPayment);
  if (bankCode === 'ATM') {
    bankCode = '';
    embedData = '{"bankgroup": "ATM"}'
  }

  const payload = {
    app_id: process.env.APP_ID,
    app_user: customer['customerId'] + customer['customerPhone'],
    amount: data['totalAmount'],
    description: 'Thanh toán đơn hàng ' + data['orderId'],
    item: '[]',
    embed_data: embedData,
    bank_code: bankCode,
    product_code: 'AGREEMENT',
    callback_url: process.env.CALLBACK_URL_ORDER,
    mac_key: process.env.MAC_KEY
  };

  // console.log("payload: ", payload);
  return DoPostParam(END_POINT, payload)
};

export {
  createOrder,
}
