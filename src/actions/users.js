export const RECEIVE_USERS = 'RECEIVE_USERS';

/**
 * Action creator function for storing the users
 *
 * @export
 * @param {*} users - Users list
 * @returns Receive Users Action
 */
export function receiveUsers(users) {
  return {
    type: RECEIVE_USERS,
    users
  }
}