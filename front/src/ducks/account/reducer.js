import * as types from './types'

const defaultState = {
  isDrawerOpen: false,
  isAuth: false,
  user: null,
  isLoading: false,
  error: null,
}

/**
 * MyMonPlan reducer, stores plans and other account related objects
 * @param state
 * @param action
 * @returns {{isDrawerOpen: boolean, plans: {}}}
 * @constructor
 */
const AccountReducer = (state = defaultState, action) => {
  switch (action.type) {
    case types.SHOW_ACCOUNT_DRAWER:
      return { ...state, isDrawerOpen: true }
    case types.HIDE_ACCOUNT_DRAWER:
      return { ...state, isDrawerOpen: false }
    case types.FETCH_USER_PENDING:
      return {
        ...state,
        isAuth: false,
        user: null,
        isLoading: true,
        error: null,
      }
    case types.FETCH_USER_FULFILLED:
      return {
        ...state,
        isAuth: true,
        user: action.user,
        isLoading: false,
      }
    case types.FETCH_USER_REJECTED:
      return {
        ...state,
        isAuth: false,
        user: null,
        isLoading: false,
        error: action.err,
      }
    case types.LOGOUT:
      return {
        ...state,
        isAuth: false,
        user: null,
        isLoading: false,
        error: false,
      }
    default:
      return state
  }
}

export default AccountReducer
