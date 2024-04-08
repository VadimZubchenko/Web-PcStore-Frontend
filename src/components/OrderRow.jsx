const OrderRow = (props) => {
  return (
    <tr
      //select the order with the parts inside under array named 'orderDetails'
      className="clickable-row"
      //get the parts of selected order and set it into state
      onClick={() => props.selectedRow(props.order)}
    >
      <td>{props.order.orderID}</td>
      <td>{props.order.customerName}</td>
      <td>{props.order.totalPrice}</td>
      <td>{props.order.orderDate}</td>
      <td>{props.order.staffName}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => props.changeToRemoveMode(props.index)}
        >
          Remove
        </button>
      </td>
    </tr>
  );
};
export default OrderRow;
