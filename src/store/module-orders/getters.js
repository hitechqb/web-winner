import {KEY_LOCAL_ORDER} from "src/helpers/const";

function getOrder(state) {
  return state.order
}

function countProductInOrder(state) {
  let count = 0;
  if (state.order) {
    count = state.order.products.length
  }

  return count
}

function getCustomerOrder(state) {
  let customer = null;
  if (state.order != null) {
    customer = state.order.customer;
  }

  return customer;
}

function getPaymentOption(state) {
  return state.paymentOption
}

function getCurrentPayment(state) {
  return state.currentPayment
}

function getResponseOrder(state) {
  return state.response
}

function getErrorOrder(state) {
  return {
    isError: state.isError,
    errorMsg: state.errorMsg
  };
}

export {
  getOrder,
  countProductInOrder,
  getCustomerOrder,
  getPaymentOption,
  getCurrentPayment,
  getResponseOrder,
  getErrorOrder
}
