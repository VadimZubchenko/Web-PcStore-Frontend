import React from "react";

const RemovePartRow = (props) => {
  return (
    <tr>
      <td>{props.part.orderDetailID}</td>
      <td>{props.part.partName}</td>
      <td>{props.part.orderDetailQuantity}</td>
      <td>{props.part.orderDetailPrice}</td>
      <td>
        <button
          className="btn btn-outline-success"
          onClick={() =>
            props.removePart(props.order, props.part.orderDetailID)
          }
        >
          Confirm
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-secondary"
          onClick={() => props.cancelPartRow()}
        >
          Cancel
        </button>
      </td>
    </tr>
  );
};
export default RemovePartRow;
