export const SET_AUTH_USER = 'SET_AUTH_USER';

/**
 * Action Creator Function for setting the Authenticated User into the store
 *
 * @export
 * @param {*} id - User ID
 * @returns Action Object for the Reducer
 */
export function setAuthUser(id) {
  return {
    type: SET_AUTH_USER,
    id
  }
}