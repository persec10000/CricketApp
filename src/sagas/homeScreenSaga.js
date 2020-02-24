import {all, takeLatest, call, put} from 'redux-saga/effects';
import {fetchHomeDataRequest, fetchHomeDataSuccess, fetchHomeDataFail} from '../reducers/home';
import baseApiSaga from './baseApi';
import {fetchHomeData} from '../service/cricketApi';

export function* handleFetchHomeScreenData(action) {
    try {
        const response = yield call(baseApiSaga, null, fetchHomeData);

        yield put(fetchHomeDataSuccess(response.data));
    } catch (error) {
        yield put(fetchHomeDataFail(error));
    }
}
export default function* homeScreenSaga() {
    yield all([takeLatest(fetchHomeDataRequest.toString(), handleFetchHomeScreenData)]);
}
