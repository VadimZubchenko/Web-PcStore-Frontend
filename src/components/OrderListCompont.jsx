import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Context } from "../index";
import "../App.css";
import { useState } from "react";

let nextID = 0;

const OrderListComponent = observer((props) => {
  const { parts } = useContext(Context);
  // set selected parts
  const [orderedParts, setOrderedParts] = useState([]);
  // set partDetails to the POST id/quantity of selected part
  const [partDetails, setPartDetail] = useState([]);
  const [orderedQuantity, setQuantity] = useState({
    value: 1,
  });
  const [summa, setSumma] = useState({ value: 0 });
  const [order, setOrder] = useState({
    staff: "",
    totalPrice: "",
    customer: [],
    orderedParts: [],
  });

  const increment = () => {
    setQuantity({ value: ++orderedQuantity.value });
  };
  const decrement = () => {
    setQuantity({
      value: orderedQuantity.value > 1 ? --orderedQuantity.value : 1,
    });
  };

  const addPart = () => {
    console.log("Selected part id: " + parts.selectedPart.partID);
    if (parts.selectedPart.partID == null || parts.selectedPart.partID === 0) {
      props.setError("Please select a part");
      return;
    }
    props.setError("");
    let rowPart = {
      ID: nextID++,
      partID: parts.selectedPart.partID,
      partName: parts.selectedPart.partName,
      partType: parts.selectedPart.partType,
      partQuantity: orderedQuantity.value,
      partPrice: parts.selectedPart.partPrice,
    };
    setOrderedParts([...orderedParts, rowPart]);
    setPartDetail([
      ...partDetails,
      {
        partID: rowPart.partID,
        partQuantity: rowPart.partQuantity,
        partPrice: rowPart.partPrice,
      },
    ]);
    setSumma({
      value: summa.value + parts.selectedPart.partPrice * orderedQuantity.value,
    });
  };
  const createOrder = () => {
    let customer = {
      customerName: parts.newCustomer.customerName,
      address: parts.newCustomer.address,
      email: parts.newCustomer.email,
    };
    if (summa.value === 0) {
      console.log("Order totalPrice: " + summa.value);
      props.setError("Please add selected part into order list");

      return;
    }
    props.setError("");
    //check if all raws of customer form are filled out
    if (
      parts.newCustomer.customerName === "" ||
      parts.newCustomer.address === "" ||
      parts.newCustomer.email === ""
    ) {
      console.log("Customer data: " + order.customer.length);
      props.setError("Please fill out the customer form");

      return;
    }
    props.setError("");

    setOrder({
      staff: props.staff,
      totalPrice: summa.value,
      customer: [customer],
      orderedParts: [partDetails],
    });
  };

  const cancel = () => {
    setSumma({ value: 0 });
    setOrderedParts([]);
    setQuantity({ value: 1 });
  };

  useEffect(() => {
    // send created order to the backend
    if (order.orderedParts.length !== 0) {
      props.addOrder(order);
      props.setError("The order has been created succesfully");
      props.clearForm();
      cancel();
    }
  }, [order.customer, order.orderedParts, order.staff, order.totalPrice]);

  return (
    <div className="row">
      <div className="col-md-3 mt-5 mx-auto text-center">
        <h2>Total Price:</h2>
        <input
          className="quantity-input__screen"
          type="text"
          value={summa.value}
          readOnly
        />
        <h2>Set the quantity</h2>
        <div className="quantity-input">
          <button
            className="quantity-input__modifier quantity-input__modifier--left"
            onClick={decrement}
          >
            &mdash;
          </button>
          <input
            className="quantity-input__screen"
            type="text"
            value={orderedQuantity.value}
            readOnly
          />
          <button
            className="quantity-input__modifier quantity-input__modifier "
            onClick={increment}
          >
            &#xff0b;
          </button>
        </div>
        <br />
        <br />

        <button
          type="button"
          className="btn btn-secondary mx-auto"
          onClick={addPart}
        >
          Add part
        </button>
      </div>
      <div className="col">
        <h2 className="text-center mt-4">Order</h2>
        <div
          className="ag-theme-alpine mx-auto p-0 mb-3 card-box table-wrapper"
          style={{ height: 600, width: 600 }}
        >
          <table
            className="table table-striped"
            onClick={() => console.log(order.length)}
          >
            <thead className="th">
              <tr>
                <th className="text-center">ID</th>
                <th className="text-start">Name</th>
                <th className="text-start">Type</th>
                <th className="text-center">Quantity</th>
                <th className="text-start">Price</th>
              </tr>
            </thead>
            <tbody>
              {orderedParts.length
                ? orderedParts.map((part) => (
                    <tr key={part.ID}>
                      <td className="text-center">{part.partID}</td>
                      <td className="text-start">{part.partName}</td>
                      <td className="text-start">{part.partType}</td>
                      <td className="text-center">{part.partQuantity}</td>
                      <td className="text-start">{part.partPrice}</td>
                    </tr>
                  ))
                : null}
            </tbody>
          </table>
        </div>
      </div>
      <div className="row">
        <div className="col-md-3 text-center">
          <button
            type="button"
            className="btn btn-lg btn-success"
            onClick={createOrder}
          >
            Do Order
          </button>
        </div>
        <div className="col text-center">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={cancel}
            style={{ marginLeft: "20px" }}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
});

export default OrderListComponent;
