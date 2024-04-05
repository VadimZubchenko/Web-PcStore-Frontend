import React, { useState } from "react";
import Row from "./Row";
import EditRow from "./EditRow";
import RemoveRow from "./RemoveRow";

const ListCustomerComponent = (props) => {
  const [state, setState] = useState({
    removeIndex: -1,
    editIndex: -1,
  });
  //below useEffect to reload customer on link in navbar
  //initiate just ones getCustomer() in 'App.js', because has empty second argument [].
  // useEffect(() => {
  //   props.getCustomerList(props.token);
  // }, []);

  const changeToRemoveMode = (index) => {
    setState({
      removeIndex: index,
      editIndex: -1,
    });
  };
  const changeToEditMode = (index) => {
    setState({
      removeIndex: -1,
      editIndex: index,
    });
  };

  const cancel = () => {
    setState({
      removeIndex: -1,
      editIndex: -1,
    });
  };
  const editCustomer = (customer) => {
    props.editCustomer(customer);
    cancel();
  };
  const removeCustomer = (customerID) => {
    props.removeCustomer(customerID);
    cancel();
  };

  let customers = props.customers.length
    ? // an index as a second argument of map() has been taken from array list of customers
      // The index of the current element being processed in the array.
      props.customers.map((customer, index) => {
        if (state.editIndex === index) {
          return (
            <EditRow
              key={customer.customerID}
              customer={customer}
              editCustomer={editCustomer}
              cancel={cancel}
            />
          );
        }
        if (state.removeIndex === index) {
          return (
            <RemoveRow
              key={customer.customerID}
              customer={customer}
              removeCustomer={removeCustomer}
              cancel={cancel}
            />
          );
        }
        return (
          <Row
            key={customer.customerID}
            customer={customer}
            role={props.role}
            index={index} // index of the row has been taken as a second argument of map-function from customer Array list
            changeToRemoveMode={changeToRemoveMode}
            changeToEditMode={changeToEditMode}
          />
        );
      })
    : null;

  return (
    <div className="row mx-auto">
      <h2 className="text-center mt-4">Customers List</h2>
      <div
        className="ag-theme-alpine mx-auto mb-3 card-box scrollable-table"
        style={{ height: 600, width: 800 }}
      >
        <table className="table table-striped">
          <thead className="th">
            <tr>
              <th className="text-center">ID</th>
              <th className="text-start">Name</th>
              <th className="text-start">Address</th>
              <th className="text-start">Email</th>
              <th className="text-center">Remove</th>
              <th className="text-center">Edit</th>
            </tr>
          </thead>
          <tbody>{customers}</tbody>
        </table>
        {props.errorMsg ? <div>{props.errorMsg}</div> : null}
      </div>
    </div>
  );
};

export default ListCustomerComponent;
