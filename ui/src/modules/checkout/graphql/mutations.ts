const addEditParamDefs = `
  $items: [OrderItemInput],
  $totalAmount: Float!,
  $type: String!,
  $customerId: String,
  $customerType: String,
  $slotCode: String,
  $registerNumber: String,
  $billType: String,
  $origin: String,
  $deliveryInfo: JSON,
  $dueDate: Date,
  $status: String,
`;

const addEditParams = `
  items: $items,
  totalAmount: $totalAmount,
  type: $type,
  customerId: $customerId,
  customerType: $customerType,
  slotCode: $slotCode,
  registerNumber: $registerNumber,
  billType: $billType,
  origin: $origin,
  deliveryInfo: $deliveryInfo,
  dueDate: $dueDate,
  status: $status
`;

const ordersAdd = `
  mutation ordersAdd(${addEditParamDefs}) {
    ordersAdd(${addEditParams}) {
     _id
    }
  }
`;

const ordersEdit = `
  mutation ordersEdit($_id: String!, ${addEditParamDefs}) {
    ordersEdit(_id: $_id, ${addEditParams}) {
      _id,
      status
    }
  }
`;

const ordersAddPayment = `
  mutation ordersAddPayment(
    $_id: String!
    $cashAmount: Float,
    $mobileAmount: Float,
    $paidAmounts: [PaidAmountInput]
  ) {
    ordersAddPayment(
      _id: $_id
      mobileAmount: $mobileAmount
      cashAmount: $cashAmount
      paidAmounts: $paidAmounts
    ) {
      _id
    }
  }
`;

const ordersSettlePayment = `
  mutation ordersSettlePayment($_id: String!, $billType: String!, $registerNumber: String) {
    ordersSettlePayment(_id: $_id, billType: $billType, registerNumber: $registerNumber) {
      success
      lotteryWarningMsg
      errorCode
      message
      getInformation
    }
  }
`;

const orderChangeStatus = `
  mutation orderChangeStatus($_id: String!, $status: String) {
    orderChangeStatus(_id: $_id, status: $status) {
      _id
    }
  }
`;

const orderItemChangeStatus = `
  mutation orderItemChangeStatus($_id: String!, $status: String) {
    orderItemChangeStatus(_id: $_id, status: $status) {
      _id
      status
    }
  }
`;

const generateInvoiceUrl = `
  mutation GenerateInvoiceUrl(
    $amount: Float!
    $contentType: String
    $contentTypeId: String
    $customerId: String
    $customerType: String
    $description: String
    $email: String
    $paymentIds: [String]
    $phone: String
  ) {
    generateInvoiceUrl(
      amount: $amount
      contentType: $contentType
      contentTypeId: $contentTypeId
      customerId: $customerId
      customerType: $customerType
      description: $description
      email: $email
      paymentIds: $paymentIds
      phone: $phone
    )
  }
`;

const ordersFinish = `
  mutation OrdersFinish(
    $_id: String
    $items: [OrderItemInput]
    $totalAmount: Float
    $type: String
    $branchId: String
    $customerId: String
    $customerType: String
    $deliveryInfo: JSON
    $billType: String
    $registerNumber: String
    $slotCode: String
    $origin: String
    $dueDate: Date
  ) {
    ordersFinish(
      _id: $_id
      items: $items
      totalAmount: $totalAmount
      type: $type
      branchId: $branchId
      customerId: $customerId
      customerType: $customerType
      deliveryInfo: $deliveryInfo
      billType: $billType
      registerNumber: $registerNumber
      slotCode: $slotCode
      origin: $origin
      dueDate: $dueDate
    ) {
      _id
    }
  }
`;

const mutations = {
  ordersAdd,
  ordersEdit,
  ordersAddPayment,
  ordersSettlePayment,
  orderChangeStatus,
  orderItemChangeStatus,
  generateInvoiceUrl,
  ordersFinish,
};

export default mutations;
