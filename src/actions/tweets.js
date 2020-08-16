import { saveLikeToggle } from '../utils/api';
export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';
export const TOGGLE_TWEET = 'TOGGLE_TWEET';

/**
 * Action creator function for storing the tweets
 *
 * @export
 * @param {*} tweets - Tweets from the database
 * @returns Receive Tweets Action for the Reducer
 */
export function receiveTweets(tweets) {
  return {
    type: RECEIVE_TWEETS,
    tweets
  }
}

/**
 * Action creator function for storing the tweet likes
 *
 * @export
 * @param {*} { id, authedUser, hasLiked} object with tweet info
 * @returns Toggle Tweet Action for the Reducer
 */
export function toggleTweet({ id, authedUser, hasLiked}) {
  return {
    type: TOGGLE_TWEET,
    id,
    authedUser,
    hasLiked
  }
}

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