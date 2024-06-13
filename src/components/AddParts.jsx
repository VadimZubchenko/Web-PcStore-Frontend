import { useState } from "react";
const AddParts = (props) => {
  const [state, setState] = useState({
    partName: "",
    partType: "",
    stockQuantity: 10,
    partPrice: 1,
  });
  const onChange = (event) => {
    setState((state) => {
      return {
        ...state,
        [event.target.name]: event.target.value,
      };
    });
  };
  const onSubmit = (event) => {
    event.preventDefault();
    if (state.stockQuantity <= 0 || state.partPrice <= 0) {
      props.setError("The quantity and the price must be more then '0'");
      return;
    }
    let item = {
      ...state,
    };
    props.addParts(item);
    setState({
      partName: "",
      partType: "",
      stockQuantity: 10,
      partPrice: 1,
    });
  };
  return (
    <div className="row mx-auto">
      <h2 className="text-center mt-4">Adding parts</h2>
      <div className="ag-theme-alpine mt-3 mx-auto p-3 mb-3 card-box">
        <div>
          <form onSubmit={onSubmit} className="mb-3">
            <label htmlFor="partName" className="form-label mb-0 mt-3">
              Name
            </label>
            <input
              type="text"
              name="partName"
              id="partName"
              placeholder="Enter part name"
              className="form-control"
              onChange={onChange}
              value={state.partName}
              required
            />
            <label htmlFor="partType" className="form-label mb-0 mt-3">
              Type
            </label>
            <input
              type="text"
              name="partType"
              id="partType"
              placeholder="Enter type"
              className="form-control"
              onChange={onChange}
              value={state.partType}
              required
            />
            <label htmlFor="stockQuantity" className="form-label mb-0 mt-3">
              Count
            </label>
            <input
              type="number"
              name="stockQuantity"
              id="stockQuantity"
              className="form-control"
              onChange={onChange}
              value={state.stockQuantity}
              min={1}
              required
            />
            <label htmlFor="partPrice" className="form-label mb-0 mt-3">
              Price
            </label>
            <input
              type="number"
              name="partPrice"
              id="partPrice"
              step="0.1"
              className="form-control"
              onChange={onChange}
              value={state.partPrice}
              min={0.1}
              required
            />
            <div className="d-grid">
              <input
                type="submit"
                className="btn btn-outline-secondary mt-5"
                value="Add"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
export default AddParts;
