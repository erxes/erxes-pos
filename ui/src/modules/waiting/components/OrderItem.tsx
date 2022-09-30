const OrderItem = ({ _id, number }: any) => {
  return (
    <div className="-item">
      <h1>{(number || '_0').split('_')[1]}</h1>
      <small>1</small>
    </div>
  );
};

export default OrderItem;
