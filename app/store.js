import {
    combineReducers,
    applyMiddleware,
    createStore,
} from "@reduxjs/toolkit";
import storage from '../components/store/storage';
import { persistReducer, persistStore } from 'redux-persist';
import { createWrapper } from "next-redux-wrapper";
import clientReducer from '../pages/onboarding/clients/store/clientSlice';
import familyReducer from '../pages/onboarding/family/store/familySlice';
import spaceReducer from '../pages/dashboard/spaces/store/spaceSlice';
import memberReducer from '../pages/dashboard/members/store/memberSlice';
import authReducer from '../components/store/authSlice';
import settingReducer from '../pages/dashboard/settings/store/settingSlice';
import thunkMiddleware from "redux-thunk";


const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== "production") {
        return applyMiddleware(...middleware);
    }
    return applyMiddleware(...middleware);
};


const reducer = combineReducers({
    client: clientReducer,
    family: familyReducer,
    space: spaceReducer,
    member: memberReducer,
    auth: authReducer,
    setting: settingReducer,
})

const persistConfig = {
    key: 'root',
    // whitelist: ["auth"],
    storage,
};

const persistedReducer = persistReducer(persistConfig, reducer);


export const initStore = () => {
    const store = createStore(
        persistedReducer, 
        {},
        bindMiddleware([thunkMiddleware])
    );

    store.__PERSISTOR = persistStore(store);

    return store;
};

const wrapper = createWrapper(initStore);

export default wrapper;





