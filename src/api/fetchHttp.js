import 'whatwg-fetch'
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl()

export function get(url) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

export function del(url) {
  const req = new Request(baseUrl + url, {
    method: 'DELETE'
  })

  return fetch(req).then(onSuccess, onError)
}

function onSuccess(response) {
  return response.json();
}

function onError(error) {
  console.log(error); // eslint-disable-line no-console
}