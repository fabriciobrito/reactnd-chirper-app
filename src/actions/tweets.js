import { saveLikeToggle, saveTweet } from '../utils/api';
import { showLoading, hideLoading } from 'react-redux-loading';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';
export const ADD_TWEET = 'ADD_TWEET';

/**
 * Action creator function for adding tweets to the store
 *
 * @export
 * @param {*} tweets - Tweets from the database
 * @returns Receive Tweets Action Obj for the Reducer
 */
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

/**
 * Action creator function to add a tweet to the store
 *
 * @param {*} tweet Tweet from the user form
 * @returns Save Tweet Action Obj for the Reducer
 */
function addTweet(tweet) {
  return {
    type: ADD_TWEET,
    tweet
  }
}

/**
 * Thunk function to add tweet to the database async
 *
 * @export
 * @param {*} text The tweet text
 * @param {*} replyingTo The tweet ID it is replying to (if any)
 * @returns The function that updates de database to the new tweet
 */
export function handleAddTweet(text, replyingTo) {
  return (dispatch, getState) => {
    const { authedUser } = getState();
    dispatch(showLoading());
    return saveTweet({
      text,
      author: authedUser,
      replyingTo
    })
      .then((tweet) => dispatch(addTweet(tweet)))
      .then(dispatch(hideLoading()));
  }
}

/**
 * Action creator function for storing the tweet likes
 * This is not exported because of the handleToggleTweet Thunk function
 *
 * @param {*} { id, authedUser, hasLiked} object with tweet info
 * @returns Toggle Tweet Action for the Reducer
 */
function toggleTweet({ id, authedUser, hasLiked}) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

/**
 * Thunk function to toggle tweet like async
 *
 * @export
 * @param {*} info Object with id, authedUser and hasLiked props
 * @returns The function that updated the dabase
 */
export function handleToggleTweet(info) {
  return (dispatch) => {
    // Optimistic update, so change state locally and then reflects in db
    dispatch(toggleTweet(info));
    return saveLikeToggle(info)
      .catch((e) => {
        console.warn('Error in handleToggleTweet', e);
        // Undo if db update fails
        dispatch(toggleTweet(info));
        alert('There was an error liking the tweet. Please try again');
      })
  }
}