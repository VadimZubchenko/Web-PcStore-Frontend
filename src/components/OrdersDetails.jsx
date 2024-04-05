import { useState } from "react";
import RemoveOrderRow from "./RemoveOrderRow";
import OrderRow from "./OrderRow";

const OrdersDetails = (props) => {
  //state with the parts of order selected by user from the table
  const [state, setState] = useState([]);

  const [mode, setMode] = useState({
    removeIndex: -1,
  });

  const changeToRemoveMode = (index) => {
    setMode({
      removeIndex: index,
    });
  };
  const cancel = () => {
    setMode({
      removeIndex: -1,
    });
  };

  const removeOrder = (orderID) => {
    props.removeOrder(orderID);
    cancel();
  };

  const selectedRow = (order) => {
    setState(order.orderDetails);
  };

  //array of all orders with included parts inside
  let orders = props.orders.length
    ? props.orders.map((order, index) => {
        if (mode.removeIndex === index) {
          return (
            <RemoveOrderRow
              key={order.orderID}
              order={order}
              removeOrder={removeOrder}
              cancel={cancel}
            />
          );
        }

        return (
          <OrderRow
            key={order.orderID}
            order={order}
            index={index} // index of the row has been taken as a second argument of map-function from customer Array list
            mode={mode}
            selectedRow={selectedRow}
            changeToRemoveMode={changeToRemoveMode}
          />
        );
      })
    : null;

  let orderDtl = state.length
    ? state.map((part) => {
        return (
          <tr key={part.orderDetailID}>
            <td>{part.orderDetailID}</td>
            <td>{part.partName}</td>
            <td>{part.orderDetailQuantity}</td>
            <td>{part.orderDetailsPrice}</td>
          </tr>
        );
      })
    : null;
  return (
    <div className="row mx-auto">
      <div className="col-6 mx-auto">
        <h2 className="text-center mt-4">Orders</h2>
        <div
          className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
          style={{ height: 600, width: 800 }}
        >
          <table className="table table-striped">
            <thead className="th">
              <tr>
                <th>ID</th>
                <th>Customer</th>
                <th>Total price</th>
                <th>Date</th>
                <th>Staff</th>
                <th>Remove</th>
              </tr>
            </thead>
            <tbody>{orders}</tbody>
          </table>
          {props.errorMsg ? <div>{props.errorMsg}</div> : null}
        </div>
      </div>
      <div className="col-6 mx-auto">
        <h2 className="text-center mt-4">Order Details</h2>
        <div
          className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
          style={{ height: 600, width: 800 }}
        >
          <table className="table table-striped">
            <thead className="th">
              <tr>
                <th>ID</th>
                <th>Part Name</th>
                <th>Quantity</th>
                <th>Part Price</th>
              </tr>
            </thead>
            <tbody>{orderDtl}</tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
export default OrdersDetails;
