import * as types from './types'

const INITIAL_STATE = {
  events: [],
  isFetching: false,
  error: null,
}

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.FETCHING:
      return {
        ...state,
        isFetching: true,
        error: null,
      }
    case types.FULFILLED:
      return {
        ...state,
        events: action.payload,
        isFetching: false,
        error: null,
      }
    case types.ERRORED:
      return {
        ...state,
        isFetching: false,
        error: action.error,
      }
    default:
      return state
  }
}

export default reducer
