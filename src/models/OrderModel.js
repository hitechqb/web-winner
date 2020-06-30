import {CreateCustomerModel} from "src/models/CustomerModel";

export class OrderModel {
  constructor(
    {
      orderId = 0,
      totalAmount = 0,
      discount = 0,
      products = [],
      customer = null,
    } = {}) {
    this.orderId = orderId;
    this.totalAmount = totalAmount;
    this.discount = discount;
    this.products = products;
    this.customer = customer;
  }
}

export function CreateOrderModel(data) {
  return Object.freeze(new OrderModel(data));
}


// const order = {
//   orderId: 1,
//   totalAmount: 100000,
//   discount: 0,
//   products: [
//     {productId: 1, name: 'name 1', price: 10000, quantity: 1},
//     {productId: 2, name: 'name 2', price: 10000, quantity: 1},
//     {productId: 3, name: 'name 3', price: 10000, quantity: 1}
//   ],
//   customer: {
//     customerName: 'John',
//     customerPhone: '0966666666',
//     customerAddress: 'HCM - VN'
//   }
// };
