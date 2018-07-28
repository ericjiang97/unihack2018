import * as types from './types'

export const performAction = params => ({
  type: types.TYPE,
  ...params,
})
