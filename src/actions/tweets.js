export const RECEIVE_TWEETS = 'RECEIVE_TWEETS';

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