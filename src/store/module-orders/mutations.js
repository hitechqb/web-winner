import {
  ADD_CUSTOMER_ORDER,
  ADD_PRODUCT_TO_ORDER,
  CREATE_ORDER, SET_CURRENT_PAYMENT,
  SET_ERROR_RESPONSE,
  SET_RESPONSE_CREATE_ORDER
} from "src/store/mutation-types";
import {CreateOrderModel} from "src/models/OrderModel";
import {CreateCustomerModel} from "src/models/CustomerModel";
import {MSG_NOT_FOUND, MSG_ORDER_NOTFOUND} from "src/helpers/messages";

export default {
  /**
   *
   * @param { object } state
   * @param { Object } product
   */
  [ADD_PRODUCT_TO_ORDER](state, {product}) {
    if (state.order != null) {
      const products = state.order.products;
      if (products.length === 0) {
        state.products.push(product)
      } else {
        const index = products.findIndex(x => x.productId === product.productId);

        if (index >= 0) {
          state.order.products[index].quantity += 1;
        } else {
          state.order.products.push(product)
        }

        let _order = JSON.parse(JSON.stringify(state.order));
        _order.totalAmount += product.price;
        state.order = _order;
      }
    } else {
      console.log('ADD_PRODUCT_TO_ORDER - MUTATION - ERROR: ', MSG_ORDER_NOTFOUND);
    }
  },

  /**
   *
   * @param { object } state
   * @param { object } product
   */
  [CREATE_ORDER](state, {product}) {
    state.order = null;
    const products = [product];

    state.order = CreateOrderModel({
      orderId: new Date().getTime(),
      totalAmount: product.price ? product.price : 0,
      discount: product.discount ? product.discount : 0,
      products: products,
      customer: null
    })
  },

  [ADD_CUSTOMER_ORDER](state, {customer}) {
    if (state.order != null) {
      let _order = JSON.parse(JSON.stringify(state.order));
      _order.customer = CreateCustomerModel(customer);
      state.order = _order;
    } else {
      console.log(MSG_ORDER_NOTFOUND);
    }
  },

  [SET_RESPONSE_CREATE_ORDER](state, {createOrderResponse}) {
    state.isError = false;
    state.response = createOrderResponse;
  },

  [SET_ERROR_RESPONSE](state, {errorMsg}) {
    state.isError = true;
    state.errorMsg = errorMsg;
  },

  [SET_CURRENT_PAYMENT](state, {currentPayment}) {
    state.currentPayment = currentPayment
  }
};

