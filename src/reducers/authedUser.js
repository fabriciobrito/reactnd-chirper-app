import { SET_AUTH_USER } from '../actions/authedUser';

/**
 * Reducer function to handle the authedUser slice of the state
 *
 * @export
 * @param {*} [state=null] The previous state Obj
 * @param {*} action The action Obj to change the state (must have type param)
 * @returns
 */
export default function authedUser(state = null, action) {
  switch(action.type) {
    case SET_AUTH_USER:
      return action.id;
    default:
      return state;
  }
}