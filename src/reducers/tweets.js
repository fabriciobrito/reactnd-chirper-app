import { RECEIVE_TWEETS } from '../actions/tweets';

/**
 * Reducer function to handle the tweets slice of the state
 *
 * @export
 * @param {*} [state={}] The previous state Obj
 * @param {*} action The action Obj to change the state (must have type param)
 * @returns
 */
export default function tweets(state = {}, action) {
  switch(action.type) {
    case RECEIVE_TWEETS:
      return {
        ...state,
        ...action.tweets
      }
    default:
      return state
  }
}