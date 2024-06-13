import React, { useState } from "react";

const EditPartRow = (props) => {
  const [state, setState] = useState({
    partName: props.part.partName,
    quantity: props.part.orderDetailQuantity,
    price: props.part.orderDetailsPrice,
  });

  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
        price: props.part.orderDetailsPrice * event.target.value,
      };
    });
  };

  const editPartRow = (event) => {
    event.preventDefault();
    let partRow = {
      ...state,
      orderDetailID: props.part.orderDetailID,
    };
    props.editPartRow(props.order, partRow);
  };

  return (
    <tr>
      <td className="text-center">{props.part.orderDetailID}</td>
      <td className="text-center">{state.partName}</td>
      <td className="text-center">
        <input
          type="number"
          name="quantity"
          id="quantity"
          onChange={onChange}
          value={state.quantity}
          min={1}
          required
        />
      </td>
      <td className="text-center">{state.price}</td>
      <td>
        <button className="btn btn-outline-success" onClick={editPartRow}>
          Save
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => props.cancelPartRow()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};

export default EditPartRow;
