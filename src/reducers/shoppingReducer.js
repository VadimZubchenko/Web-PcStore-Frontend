import {
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  FETCH_ORDERS_SUCCESS,
  FETCH_ORDERS_FAILED,
  FETCH_CUSTOMERS_SUCCESS,
  FETCH_CUSTOMERS_FAILED,
  CLEAR_SHOPPING_STATE,
} from '../actions/shoppingActions'

const getInitialState = () => {
  if (sessionStorage.getItem('shoppingstate')) {
    let state = JSON.parse(sessionStorage.getItem('shoppingstate'))
    return state
  } else {
    return {
      list: [],
      orders: [],
      customers: [],
      error: '',
    }
  }
}

const saveToStorage = (state) => {
  sessionStorage.setItem('shoppingstate', JSON.stringify(state))
}

const initialState = getInitialState()

const shoppingReducer = (state = initialState, action) => {
  let tempState = {}
  switch (action.type) {
    case FETCH_LIST_SUCCESS:
      tempState = {
        ...state,
        list: action.list,
        error: '',
      }
      saveToStorage(tempState)
      return tempState
    case FETCH_LIST_FAILED:
      tempState = {
        ...state,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState
    case FETCH_ORDERS_SUCCESS:
      tempState = {
        ...state,
        orders: action.orders,
        error: '',
      }
      saveToStorage(tempState)
      return tempState
    case FETCH_ORDERS_FAILED:
      tempState = {
        ...state,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState
    case FETCH_CUSTOMERS_SUCCESS:
      tempState = {
        ...state,
        customers: action.customers,
        error: '',
      }
      saveToStorage(tempState)
      return tempState
    case FETCH_CUSTOMERS_FAILED:
      tempState = {
        ...state,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState

    case CLEAR_SHOPPING_STATE:
      tempState = {
        list: [],
        orders: [],
        customers: [],
        error: '',
      }
      saveToStorage(tempState)
      return tempState
    default:
      return state
  }
}

export default shoppingReducer
