import { combineReducers } from 'redux';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; //where we want to store our reducer

import userReducer from './user/user-reducer';
import lectureReducer from "./lecture/lecture-reducer";


const persistConfig = {
    key: 'root',
    storage
}

const rootReducer = combineReducers({
    currentUser: userReducer,
    selectedLecture: lectureReducer
});


export default persistReducer(persistConfig, rootReducer);