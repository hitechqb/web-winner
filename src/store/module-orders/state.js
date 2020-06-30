import {fetchPaymentOption, options} from "src/models/PaymentModel";

const STATE = {
  order: null,
  paymentOption: fetchPaymentOption(),
  currentPayment: options.GATEWAY,
  response: null,
  isError: false,
  errorMsg: null,

};

export default STATE;
