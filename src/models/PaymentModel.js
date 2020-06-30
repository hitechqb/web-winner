export class PaymentModel {
  constructor(
    {
      label = '',
      value = '',
      color = '',
      icon = ''
    } = {}
  ) {
    this.label = label;
    this.value = value;
    this.color = color;
    this.icon = icon;
  }
}

export const options = {
  GATEWAY: 'gateway',
  WALLET: 'wallet',
  VISA_MASTER: 'visa-master',
  ATM: 'atm',
  IN_APP: 'in-app',
  ZALO_OA: 'zalo-oa',
}

export function fetchPaymentOption() {
  return [
    new PaymentModel({
      label: 'Gateway (show 3 options)',
      value: options.GATEWAY,
      color: 'salmon',
      icon: 'menu_open'
    }),
    new PaymentModel({
      label: 'Ví ZaloPay',
      value: options.WALLET,
      color: 'orange',
      icon: 'account_balance_wallet'
    }),
    new PaymentModel({
      label: 'Thẻ Visa - Master Credit',
      value: options.VISA_MASTER,
      color: 'blue',
      icon: 'credit_card'
    }),
    new PaymentModel({
      label: 'Thẻ ATM',
      value: options.ATM,
      color: 'cyan',
      icon: 'atm'
    }),
    new PaymentModel({
      label: 'In-App',
      value: options.IN_APP,
      color: 'green',
      icon: 'exit_to_app'
    }),
    new PaymentModel({
      label: 'Zalo OA',
      value: options.ZALO_OA,
      color: 'red',
      icon: 'chat_bubble_outline'
    }),
  ]
}

export function fetchPayIndex() {
  return options.WALLET
}
