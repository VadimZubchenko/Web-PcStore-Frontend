import {
  REGISTER_SUCCESS,
  REGISTER_FAILED,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOADING,
  STOP_LOADING,
} from '../actions/loginActions'

const getInitialState = () => {
  if (sessionStorage.getItem('state')) {
    let state = JSON.parse(sessionStorage.getItem('state'))
    return state
  } else {
    return {
      isLogged: false,
      loading: false,
      token: '',
      error: '',
    }
  }
}

const saveToStorage = (state) => {
  sessionStorage.setItem('state', JSON.stringify(state))
}

const initialState = getInitialState()

const loginReducers = (state = initialState, action) => {
  let tempState = {}
  switch (action.type) {
    case LOADING:
      return {
        ...state,
        loading: true,
        error: '',
      }
    case STOP_LOADING:
      return {
        ...state,
        loading: false,
      }
    case REGISTER_SUCCESS:
      tempState = {
        ...state,
        loading: false,
        error: 'Register success!',
      }
      saveToStorage(tempState)
      return tempState
    case REGISTER_FAILED:
      tempState = {
        ...state,
        loading: false,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState
    case LOGIN_SUCCESS:
      tempState = {
        ...state,
        isLogged: true,
        token: action.data.token,
        staff: action.data.staffLogin,
        role: action.data.role,
      }
      saveToStorage(tempState)
      return tempState
    case LOGIN_FAILED:
      tempState = {
        ...state,
        loading: false,
        error: action.error,
      }
      saveToStorage(tempState)
      return tempState

    default:
      return state
  }
}

export default loginReducers
