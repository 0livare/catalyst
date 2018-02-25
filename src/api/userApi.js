import { get, del } from './fetchHttp'

export function getUsers() {
  return get('users')
}

export function deleteUser(id) {
  return del('users/' + id);
}