import * as types from './types'

export const createEventModal = event => {
  console.log({
    type: types.CREATE,
    payload: event,
  })
  return {
    type: types.CREATE,
    payload: event,
  }
}

export const closeModal = () => ({
  type: types.DISMISS,
})
