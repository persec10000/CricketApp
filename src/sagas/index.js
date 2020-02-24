import {all} from 'redux-saga/effects';
import authSagas from './authSagas';
import accountSagas from './accountSagas';
import homeScreenSaga from './homeScreenSaga';
import PlayerSaga from './PlayerSaga';

export default function* rootSaga() {
    yield all([authSagas(), accountSagas(), homeScreenSaga(), PlayerSaga()]);
}
