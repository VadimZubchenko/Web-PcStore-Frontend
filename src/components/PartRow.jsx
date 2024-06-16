const PartRow = (props) => {
  return (
    <tr>
      <td>{props.part.orderDetailID}</td>
      <td>{props.part.partName}</td>
      <td>{props.part.orderDetailQuantity}</td>
      <td>{props.part.orderDetailPrice}</td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => props.changePartsRowToRemoveMode(props.index)}
        >
          Remove
        </button>
      </td>
      <td>
        <button
          className="btn btn-outline-danger"
          onClick={() => props.changePartsRowToEditMode(props.index)}
        >
          Edit
        </button>
      </td>
    </tr>
  );
};

export default PartRow;
