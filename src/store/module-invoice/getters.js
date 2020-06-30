function getStatusInvoice(state) {
  return state.status
}

function getLoading(state) {
  return state.isLoading
}

function getInfoInvoice(state) {
  if (state.status === 1) {
    return 'Thanh toán thành công'
  }
  return 'Thanh toán thất bại'
}

export {
  getStatusInvoice,
  getLoading,
  getInfoInvoice
}

