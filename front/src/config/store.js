import { applyMiddleware, combineReducers, createStore } from 'redux'
import { createLogger } from 'redux-logger'
import thunk from 'redux-thunk'

import * as reducers from '../ducks'

const logger = createLogger({ collapsed: true })

const root = combineReducers(reducers)

const store = createStore(root, applyMiddleware(thunk, logger))

export default store
