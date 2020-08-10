import { RECEIVE_USERS } from '../actions/users';

/**
 * Reducer function to handle the users slice of the state
 *
 * @export
 * @param {*} [state={}] The previous state Obj
 * @param {*} action The action Obj to change the state (must have type param)
 * @returns
 */
export default function users(state = {}, action) {
  switch(action.type) {
    case RECEIVE_USERS:
      return {
        ...state,
        ...action.users
      }
    default:
      return state
  }
}