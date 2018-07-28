import { getEvents } from '../../utils/api'

import * as types from './types'

const setFetching = () => ({
  type: types.FETCHING,
})

const setErrored = error => ({
  type: types.ERRORED,
  error,
})

const setFulfilled = payload => ({
  type: types.FULFILLED,
  payload,
})

export const loadEvents = () => dispatch => {
  dispatch(setFetching())
  getEvents()
    .then(payload => dispatch(setFulfilled(payload)))
    .catch(error => dispatch(setErrored(error)))
}
