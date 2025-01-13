import {
  FETCH_LIST_SUCCESS,
  FETCH_LIST_FAILED,
  CLEAR_SHOPPING_STATE,
} from '../actions/shoppingActions'

const getInitialState = () => {
  if (sessionStorage.getItem('shoppingstate')) {
    let state = JSON.parse(sessionStorage.getItem('shoppingstate'))
    return state
  } else {
    return {
      list: [],
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
        list: action.list,
        error: '',
      }
      saveToStorage(tempState)
      console.log('TempState: ', tempState)
      return tempState
    case FETCH_LIST_FAILED:
      tempState = {
        ...state,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState

    case CLEAR_SHOPPING_STATE:
      tempState = {
        list: [],
        error: '',
      }
      saveToStorage(tempState)
      return tempState
    default:
      return state
  }
}

export default shoppingReducer
