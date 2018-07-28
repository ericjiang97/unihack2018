import 'whatwg-fetch';

export default class NetworkService {
  static get(url, headers = {}, PLAIN_TEXT_RESPONSE = false) {
    const defaultHeaders = {};
    const options = {
      headers: { ...defaultHeaders, ...headers },
      method: 'GET',
      credentials: 'same-origin',
    };

    return fetch(url, options)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }
        if (PLAIN_TEXT_RESPONSE) {
          return resp.text();
        }
        return resp.json();
      })
      .catch(err => {
        throw err;
      });
  }

  static post(url, body = {}) {
    const options = {
      body: JSON.stringify(body),
      headers: { 'content-type': 'application/json' },
      method: 'POST',
    };

    return fetch(url, options)
      .then(resp => {
        if (resp.status !== 200) {
          throw new Error(resp.statusText);
        }
        return resp.json();
      })
      .catch(err => {
        throw err;
      });
  }
}
