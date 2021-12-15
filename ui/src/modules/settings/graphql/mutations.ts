const syncOrders = `
  mutation syncOrders() {
    syncOrders()
  }
`;

const syncConfig = `
  mutation syncConfig($type: String!) {
    syncConfig(type: $type)
  }
`;

export default { syncConfig, syncOrders };
