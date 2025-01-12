import { getPartList } from './shoppingActions'

// Action types as constans
export const REGISTER_SUCCESS = 'REGISTER_SUCCESS'
export const REGISTER_FAILED = 'REGISTER_FAILED'
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export const LOGIN_FAILED = 'LOGIN_FAILED'
export const LOADING = 'LOADING'
export const STOP_LOADING = 'STOP_LOADING'
export const CLEAR_LOGIN_STATE = 'CLEAR_LOGIN_STATE'

// Action creator
export const loading = () => {
  return {
    type: LOADING,
  }
}

export const stopLoading = () => {
  return {
    type: STOP_LOADING,
  }
}

const registerSuccess = () => {
  return {
    type: REGISTER_SUCCESS,
  }
}

export const registerFailed = (error) => {
  return {
    type: REGISTER_FAILED,
    error: error,
  }
}

const loginFailed = (error) => {
  return {
    type: LOGIN_FAILED,
    error: error,
  }
}
const loginSuccess = (data) => {
  return {
    type: LOGIN_SUCCESS,
    data: data,
  }
}

export const clearLoginState = () => {
  return {
    type: CLEAR_LOGIN_STATE,
  }
}

// Async action creators

export const register = (user) => {
  return async (dispatch) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    }
    dispatch(loading())
    let response = await fetch('/registration', request)
    if (!response) {
      dispatch(
        registerFailed(
          'There was an error with the connection. Register failed!'
        )
      )
      return
    }
    if (response.ok) {
      dispatch(registerSuccess())
    } else {
      if (response.status === 409) {
        dispatch(registerFailed('Username already in use'))
      } else {
        dispatch(
          registerFailed(
            'Register failed. Server responded with a status ' + response.status
          )
        )
      }
    }
  }
}

export const logAction = (user) => {
  return async (dispatch) => {
    let request = {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify(user),
    }
    dispatch(loading())
    let response = await fetch('/login', request)
    if (!response) {
      dispatch(loginFailed('There was an error the connection. Login failed!'))
    }
    if (response.ok) {
      let data = await response.json()
      if (!data) {
        dispatch(loginFailed('Error parsing login information. Login failed!'))
      }
      dispatch(loginSuccess(data))
      dispatch(getPartList(data.token))
    } else {
      dispatch(
        loginFailed(
          'Login failed. Server responded with a status:' + response.status
        )
      )
    }
  }
}
