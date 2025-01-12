import { loading, stopLoading, clearLoginState } from './loginActions'

export const FETCH_LIST_SUCCESS = 'FETCH_LIST_SUCCESS'
export const FETCH_LIST_FAILED = 'FETCH_LIST_FAILED'
export const CLEAR_SHOPPING_STATE = 'CLEAR_SHOPPING_STATE'

//Action Creators

const fetchListSuccess = (list) => {
  return {
    type: FETCH_LIST_SUCCESS,
    list: list,
  }
}

const fetchListFailed = (error) => {
  return {
    type: FETCH_LIST_FAILED,
    error: error,
  }
}

export const clearShoppingState = () => {
  return {
    type: CLEAR_SHOPPING_STATE,
  }
}

//ASync Action Creators

export const getPartList = (token) => {
  return async (dispatch) => {
    let request = {
      method: 'GET',
      mode: 'cors',
      headers: { 'Content-type': 'application/json', token: token },
    }
    dispatch(loading())
    let response = await fetch('/parts', request)
    dispatch(stopLoading())
    if (!response) {
      dispatch(
        fetchListFailed(
          'There was an error with the connection. Fetching shoppinglist failed!'
        )
      )
      return
    }
    if (response.ok) {
      let data = await response.json()
      if (!data) {
        dispatch(fetchListFailed('Failed to parse shoppinglist!'))
        return
      }
      dispatch(fetchListSuccess(data))
    } else {
      if (response.status === 403) {
        dispatch(clearShoppingState())
        dispatch(clearLoginState())
        dispatch(fetchListFailed('Your session has expired. Logging you out!'))
      } else {
        dispatch(
          fetchListFailed('Server responded with a status:' + response.status)
        )
      }
    }
  }
}
