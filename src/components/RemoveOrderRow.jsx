const removeOrderRow = (props) => {
  return (
    <tr>
      <td>{props.order.orderID}</td>
      <td>{props.order.customerName}</td>
      <td>{props.order.totalPrice}</td>
      <td>{props.order.orderDate}</td>
      <td>{props.order.staffName}</td>
      <td>
        <button
          className="btn btn-outline-success"
          onClick={() => props.removeOrder(props.order.orderID)}
        >
          Confirm
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-secondary"
          onClick={() => props.cancel()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default removeOrderRow;
