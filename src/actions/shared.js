import { getInitialData } from '../utils/api';
import { receiveTweets } from './tweets';
import { receiveUsers } from './users';
import { setAuthedUser } from './authedUser';

// Mocking a authenticated user for the application
const AUTHED_ID = 'tylermcginnis';

/**
 * Thunk function to get the initial data from the database and dispatch the
 * Actions to populate the store
 *
 * @export
 * @returns a Function that gets the initial data from the database
 */
export function handleInitialData() {
  return (dispatch) => {
    return getInitialData()
      .then(( { users, tweets }) => {
        dispatch(receiveTweets(tweets));
        dispatch(receiveUsers(users));
        dispatch(setAuthedUser(AUTHED_ID));
      })
  }
}