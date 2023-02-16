import AsyncStorage from '@react-native-async-storage/async-storage';
import {applyMiddleware, combineReducers, createStore} from 'redux';
import persistReducer from 'redux-persist/lib/persistReducer';
import persistStore from 'redux-persist/lib/persistStore';
import thunk from 'redux-thunk';
import {SessionReducer} from './SessionReducer';

const rootReducer = combineReducers({
  session: SessionReducer,
});

const PresitConfig = {
  key: 'session',
  storage: AsyncStorage,
};

const PrestReducer = persistReducer(PresitConfig, rootReducer);

export const Store = createStore(PrestReducer, applyMiddleware(thunk));

export const Pstore = persistStore(Store);
