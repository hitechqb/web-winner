/** @var { ModuleDemoState } */
import {CreateCustomerModel} from "src/models/CustomerModel";

const STATE = {
  message: 'this message from state',
  userOnline: null,
  users: [
    new CreateCustomerModel({id: 1, name: 'name 1'}),
    new CreateCustomerModel({id: 2, name: 'name 2'}),
    new CreateCustomerModel({id: 3, name: 'name 3'}),
  ]
};

export default STATE;
