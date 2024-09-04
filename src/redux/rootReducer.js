/*import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// slices
import appReducer from './slices/app';
import audioCallReducer from './slices/audioCall';
import videoCallReducer from './slices/videoCall';
import authReducer from './slices/auth';
import conversationReducer from './slices/conversation';
import groupReducer from './slices/groupSlice';
// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  //   whitelist: [],
  //   blacklist: [],
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
  group: groupReducer,
});

export { rootPersistConfig, rootReducer };
*/  


// redux/rootReducer.js
import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';
// Slices
import appReducer from './slices/app';
import audioCallReducer from './slices/audioCall';
import videoCallReducer from './slices/videoCall';
import authReducer from './slices/auth';
import conversationReducer from './slices/conversation';
import groupReducer from './slices/groupSlice';
import userReducer from './slices/user';  // Import user reducer

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  // Optional configurations:
  // whitelist: ['user'], // If you want to persist only specific reducers
  // blacklist: [],       // If you want to not persist specific reducers
};

const rootReducer = combineReducers({
  app: appReducer,
  auth: authReducer,
  conversation: conversationReducer,
  audioCall: audioCallReducer,
  videoCall: videoCallReducer,
  group: groupReducer,
  user: userReducer,  // Add user reducer here
});

export { rootPersistConfig, rootReducer };
