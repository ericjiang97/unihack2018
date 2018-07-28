import 'whatwg-fetch'

const ROOT = 'http://localhost:3004'

const callApi = (endpoint, args) => {
  const url = `${ROOT}/${endpoint}`
  return fetch(url, {
    ...args,
  }).then(response => {
    if (response.ok) {
      return response.json()
    } else if (response.status === 304) {
      console.log(response.cache)
      return response.cache
    } else {
      return Promise.reject(new Error('something went wrong'))
    }
  })
}

export const getEvents = () => callApi('/events', { method: 'GET' })

export const setEventPriority = (id, priority) =>
  callApi(`events/${id}`, { method: 'PUT', body: JSON.stringify({ priority }) })
