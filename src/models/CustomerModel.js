export class CustomerModel {
  constructor(
    {
      customerId = '',
      customerName = '',
      customerPhone = ''
    } = {}) {
    this.customerId = customerId;
    this.customerName = customerName;
    this.customerPhone = customerPhone;
  }
}

export function CreateCustomerModel(data) {
  data.customerId = 'CUS_' + new Date().getTime();
  return Object.freeze(new CustomerModel(data));
}

