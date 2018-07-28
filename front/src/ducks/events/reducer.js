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
    case types.UPDATE_TYPES:
      const { payload, eventId } = action
      const { rating } = payload
      console.log(state, eventId, rating)
      const event = state.events[eventId]
      event.priority = rating
      return {
        ...state,
        isFetching: false,
        error: null,
      }
    default:
      return state
  }
}

export default reducer
