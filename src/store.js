'use strict';
import Reactotron from '../ReactotronConfig';

import {createStore, applyMiddleware, compose} from 'redux';
import ReduxThunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './reducers';
import rootSaga from './sagas';
import AsyncStorage from '@react-native-community/async-storage';

import {persistStore, persistReducer} from 'redux-persist';
import autoMergeLevel2 from 'redux-persist/lib/stateReconciler/autoMergeLevel2';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    stateReconciler: autoMergeLevel2,
    version: 1,
};
const sagaMiddleware = createSagaMiddleware();

const pReducer = persistReducer(persistConfig, rootReducer);
export default function configureStore() {
    let store;
    /* 
	// recent version 
	if (__DEV__) {
        store = createStore(
            pReducer,
            compose(
                applyMiddleware(sagaMiddleware, ReduxThunk),
                Reactotron.createEnhancer(),
            ),
        );
    } else {
        store = createStore(pReducer, applyMiddleware(sagaMiddleware, ReduxThunk));
	} */
    if (__DEV__) {
        store = compose(applyMiddleware(sagaMiddleware, ReduxThunk))(Reactotron.createStore)(
            pReducer,
        );
    } else {
        store = compose(applyMiddleware(sagaMiddleware, ReduxThunk))(createStore)(pReducer);
    }
    const persistor = persistStore(store, {}, () => {});
    sagaMiddleware.run(rootSaga);
    return {store, persistor};
}
