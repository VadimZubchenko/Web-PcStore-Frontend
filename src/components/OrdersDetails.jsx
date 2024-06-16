import { useState } from "react";
import RemoveOrderRow from "./RemoveOrderRow";
import OrderRow from "./OrderRow";
import RemovePartRow from "./RemovePartRow";
import PartRow from "./PartRow";
import EditPartRow from "./EditPartRow";

const OrdersDetails = (props) => {
  //state with array of the all parts of selected orderID in orders table
  const [state, setState] = useState({
    order: [],
    parts: [],
  });

  //state of row in the Orders table
  const [modeOrderRow, setMode] = useState({
    removeIndex: -1,
  });
  //state of raw in the Order Details table
  const [modePartRow, setModePartRow] = useState({
    removePartRowIndex: -1,
    editPartRowIndex: -1,
  });
  //change row index in Orders table
  const changeToRemoveMode = (index) => {
    setMode({
      removeIndex: index,
    });
  };

  //cancel index of selected row in Orders table
  const cancel = () => {
    setMode({
      removeIndex: -1,
    });
  };
  //change the row index in Order Details table
  const changePartsRowToRemoveMode = (index) => {
    setModePartRow({
      removePartRowIndex: index,
      editPartRowIndex: -1,
    });
  };
  const changePartsRowToEditMode = (index) => {
    setModePartRow({
      removePartRowIndex: -1,
      editPartRowIndex: index,
    });
  };
  //cancel index of select raw in Order Details table
  const cancelPartRow = () => {
    setModePartRow({
      removePartRowIndex: -1,
      editPartRowIndex: -1,
    });
  };

  const removeOrder = (orderID) => {
    props.removeOrder(orderID);
    cancel();
  };
  const editPartRow = (order, partRow) => {
    let updatedPrice = 0.0;
    for (let i = 0; i < state.parts.length; i++) {
      //find the updated part among others order parts
      if (partRow.orderDetailID === state.parts[i].orderDetailID) {
        console.log("Order: ", order);
        console.log("Part quantity : ", partRow.quantity);
        console.log("part price: ", partRow.price);
        state.parts[i].orderDetailQuantity = partRow.quantity;
        state.parts[i].orderDetailPrice = partRow.price;
      }
      updatedPrice += state.parts[i].orderDetailPrice;
    }
    order.totalPrice = updatedPrice;
    console.log("Order new : ", order);
    // TO DO
    props.updateOrder(order);
    cancelPartRow();
  };

  const removePart = (order, partID) => {
    let updatedPrice;
    for (let i = 0; i < state.parts.length; i++) {
      if (partID === state.parts[i].orderDetailID) {
        updatedPrice = (
          order.totalPrice -
          state.parts[i].orderDetailQuantity * state.parts[i].orderDetailPrice
        ).toFixed(2); //round to two digits after decimal point
        console.log("the old price: ", order.totalPrice);
        console.log("the new price: ", updatedPrice);
        state.parts.splice(i, 1); // delete selected part from parts array
      }
    }
    order.totalPrice = updatedPrice;
    props.updateOrder(order);
    console.log("order after: ", order);
    cancelPartRow();
  };

  const selectedRow = (order) => {
    setState({
      order: order,
      parts: order.orderDetails,
    });
  };

  //array of all orders with included all parts inside of it
  let orders = props.orders.length
    ? props.orders.map((order, index) => {
        if (modeOrderRow.removeIndex === index) {
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
            selectedRow={selectedRow}
            changeToRemoveMode={changeToRemoveMode}
          />
        );
      })
    : null;

  let orderDtl = state.parts.length
    ? state.parts.map((part, index) => {
        if (modePartRow.removePartRowIndex === index) {
          return (
            <RemovePartRow
              key={part.orderDetailID}
              part={part}
              order={state.order} //selected orderID of Orders table
              removePart={removePart}
              cancelPartRow={cancelPartRow}
            />
          );
        }
        if (modePartRow.editPartRowIndex === index) {
          return (
            <EditPartRow
              key={part.orderDetailID}
              part={part}
              order={state.order} //selected orderID of Orders table
              editPartRow={editPartRow}
              cancelPartRow={cancelPartRow}
            />
          );
        }
        return (
          <PartRow
            key={part.orderDetailID}
            part={part}
            index={index}
            changePartsRowToRemoveMode={changePartsRowToRemoveMode}
            changePartsRowToEditMode={changePartsRowToEditMode}
          />
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
                <th>Remove</th>
                <th>Edit</th>
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
