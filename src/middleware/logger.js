// Weird Currying function required by the Redux Middleware function
const logger = (store) => (next) => (action) => {
  console.group(action.type);
    console.log('The action ', action);
    const returnValue = next(action);
    console.log('The new State ', store.getState());
  console.groupEnd();
  return returnValue;
}

export default logger;