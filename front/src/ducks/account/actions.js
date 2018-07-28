import {
  FETCH_USER_PENDING,
  FETCH_USER_FULFILLED,
  FETCH_USER_REJECTED,
  LOGOUT,
} from './types'
import AccountService from '../../services/AccountService'

export const getUser = () => {
  return function(dispatch) {
    dispatch({
      type: FETCH_USER_PENDING,
    })

    AccountService.getUser()
      .then(resp => {
        dispatch({
          type: FETCH_USER_FULFILLED,
          user: resp,
        })
      })
      .catch(err => {
        dispatch({
          type: FETCH_USER_REJECTED,
          err: err,
        })
      })
  }
}

export const logout = () => {
  return {
    type: LOGOUT,
  }
}
