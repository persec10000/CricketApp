import {all, takeLatest, call, put} from 'redux-saga/effects';
import {fetchPlayerFail, fetchPlayerSuccess, fetchPlayerRequest} from '../reducers/player';
import baseApiSaga from './baseApi';
import {fetchPlayer} from '../service/cricketApi';

export function* handleFetchPlayer(action) {
    try {
        const response = yield call(baseApiSaga, null, fetchPlayer, action.payload);
        yield put(fetchPlayerSuccess(response.data));
    } catch (error) {
        yield put(fetchPlayerFail(error));
    }
}
export default function* PlayerSaga() {
    yield all([takeLatest(fetchPlayerRequest.toString(), handleFetchPlayer)]);
}
