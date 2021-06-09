import { createStore, combineReducers, compose, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import userReducer, {
  checkActiveUser,
  getUserData,
  allUsers,
  allStores,
} from './userDucks';
import wikiReducer, { wikiGroups } from './WikiDuck';

const rootReducer = combineReducers({
  user: userReducer,
  wiki: wikiReducer,
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default function generateStore() {
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(thunk))
  );
  checkActiveUser()(store.dispatch);
  getUserData()(store.dispatch);
  allUsers()(store.dispatch);
  allStores()(store.dispatch);
  wikiGroups()(store.dispatch);
  return store;
}
