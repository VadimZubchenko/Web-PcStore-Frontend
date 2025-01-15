//import ListCustomerComponent from "../components/CustomerListComponent";
import OrderListComponent from '../components/OrderListCompont'
import PartListComponent from '../components/PartListComponent'
import AddCustomerForm from '../components/AddCustomerForm'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ShopPage = (props) => {
  const dispatch = useDispatch()
  const appState = useSelector((state) => {
    return {
      token: state.login.token,
      list: state.shopping.list,
    }
  })

  const [value, setState] = useState({
    customerName: '',
    address: '',
    email: '',
  })

  const clearCustForm = () => {
    setState({
      customerName: '',
      address: '',
      email: '',
    })
  }

  return (
    <div className="row">
      <div className="col-md-5 mx-auto">
        <div className="row">
          <div className="col mx-auto">
            <PartListComponent
              list={appState.list}
              setError={props.setError}
              //getPartList={props.getPartList}
              token={appState.token}
            />
          </div>
        </div>
        <div className="row">
          <div className="col mx-auto">
            <AddCustomerForm value={value} />
          </div>
        </div>
      </div>
      <div className="col-md-7 mx-auto">
        <OrderListComponent
          addOrder={props.addOrder}
          setError={props.setError}
          errorMsg={props.errorMsg}
          staff={props.staff}
          clearForm={clearCustForm}
        />
      </div>
    </div>
  )
}

export default ShopPage
