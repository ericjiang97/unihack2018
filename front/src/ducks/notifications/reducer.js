import * as types from './types'

const INITIAL_STATE = []

const reducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case types.CREATE:
      return [...state, action.payload]
    case types.DISMISS:
      return state.slice(1)
    default:
      return state
  }
}

export default reducer
