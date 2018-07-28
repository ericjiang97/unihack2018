import * as types from './types'

const INITIAL_STATE = {
  event: {},
  open: false,
}

const reducer = (state = INITIAL_STATE, action) => {
  console.log(action)
  switch (action.type) {
    case types.CREATE:
      return { event: action.payload, open: true }
    case types.DISMISS:
      return { event: {}, open: false }
    default:
      return state
  }
}

export default reducer
