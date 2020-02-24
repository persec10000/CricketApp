import {all, takeLatest, call, put} from 'redux-saga/effects';

import {fetchAccountFail, fetchAccountRequest, fetchAccountSuccess} from '../reducers/account';
import baseApiSaga from './baseApi';
import {fetchAccount} from '../service/cricketApi';

export function* handleFetchAccount(action) {
    const {payload} = action;
    try {
        yield call(baseApiSaga, fetchAccountSuccess, fetchAccount);
        payload.onSuccess();
    } catch (error) {
        yield put(fetchAccountFail(error));
        payload.onError(error);
    }
}

export default function* accountSagas() {
    yield all([takeLatest(fetchAccountRequest.toString(), handleFetchAccount)]);
}
