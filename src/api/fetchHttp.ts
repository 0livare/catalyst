/*
 * The Fetch API provides a JavaScript interface for accessing
 * and manipulating parts of the HTTP pipeline, such as requests
 * and responses. It also provides a global fetch() method that
 * provides an easy, logical way to fetch resources asynchronously
 * across the network.
 *
 * This first import is a polyfill for browsers that don't yet
 * support fetch
 */
import 'whatwg-fetch'
import chalk from 'chalk'
import getBaseUrl from './baseUrl'

const baseUrl = getBaseUrl()

export function get(url: string) {
  return fetch(baseUrl + url).then(onSuccess, onError);
}

export function del(url: string) {
  return fetch(baseUrl + url, {
    method: 'DELETE',
  }).then(onSuccess, onError)
}

export function post(url: string, body: any) {
  // Default options are marked with *
  return fetch(baseUrl + url, {
    body: JSON.stringify(body),  // must match 'Content-Type' header
    cache: 'no-cache',           // *default, no-cache, reload, force-cache, only-if-cached
    credentials: 'same-origin',  // include, *omit
    headers: {
      'content-type': 'application/json',
    },
    method: 'POST',              // *GET, PUT, DELETE, etc.
    mode: 'cors',                // no-cors, *same-origin
    redirect: 'follow',          // *manual, error
    referrer: 'no-referrer',     // *client
  })
  .then(onSuccess, onError)
}

function onSuccess(response: Response) {
  return response.json();
}

function onError(error: any) {
  console.log(chalk.red(error), error); // tslint:disable-line:no-console
}