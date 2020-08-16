import { RECEIVE_TWEETS, TOGGLE_TWEET, ADD_TWEET } from '../actions/tweets';

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
    case TOGGLE_TWEET:
      return {
        ...state,
        [action.id]: {
          ...state[action.id],
          likes: action.hasLiked === true
            ? state[action.id].likes.filter((uid) => uid !== action.authedUser)
            : state[action.id].likes.concat(action.authedUser)
        }
      }
    case ADD_TWEET:
      const { tweet } = action
      let replyingTo = {};
      if(tweet.replyingTo !== null){
        replyingTo = {
          [tweet.replyingTo]:{
            ...state[tweet.replyingTo],
            replies: state[tweet.replyingTo].replies.concat([tweet.id])
          }
        }
      }
      return{
        ...state,
        [tweet.id]: tweet,
        ...replyingTo
      }
    default:
      return state
  }
}