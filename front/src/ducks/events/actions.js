import CalendarService from '../../services/CalendarService'

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

  CalendarService.getEvents()
    .then(resp => {
      const events = resp.items
        .filter(event => event.status !== 'cancelled')
        .map((event, key) => {
          return {
            id: key,
            title: event.summary,
            allDay: false,
            start: new Date(event.start.dateTime),
            end: new Date(event.end.dateTime),
            description: event.description,
            organizer: event.organizer,
            creator: event.creator,
            link: event.htmlLink,
            location: event.location,
          }
        })
      dispatch(setFulfilled(events))
    })
    .catch(err => {
      dispatch(setErrored(err))
    })
}
