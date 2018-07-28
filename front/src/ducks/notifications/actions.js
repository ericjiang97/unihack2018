import * as types from './types'

export const createNotification = message => ({
  type: types.CREATE,
  payload: message,
})

export const dismissNotification = () => ({
  type: types.CREATE,
})
