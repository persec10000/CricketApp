import {all, takeLatest, call, put} from 'redux-saga/effects';
import {
    signUpRequest,
    signUpSuccess,
    signUpFail,
    signInFail,
    signInRequest,
    signInSuccess,
    signOutRequest,
    signOutFail,
    signOutSuccess,
} from '../reducers/auth';
import {setAccount, resetAccount} from '../reducers/account';
import baseApiSaga from './baseApi';
import {signup, signin, setToken, signout, resetToken} from '../service/cricketApi';

export function* handleSignup(action) {
    const {payload} = action;
    try {
        yield call(baseApiSaga, signUpSuccess, signup, payload.data);
        payload.onSuccess();
    } catch (error) {
        yield put(signUpFail(error));
        payload.onError(error);
    }
}
export function* handleSignin(action) {
    const {payload} = action;
    try {
        const response = yield call(baseApiSaga, null, signin, payload.data);
        const {auth, account} = response.data;
        yield put(signInSuccess(auth));
        yield put(setAccount(account));
        setToken(auth.access_token || '');
        payload.onSuccess(auth);
    } catch (error) {
        yield put(signInFail(error));
        payload.onError(error);
    }
}
export function* handleSignout(action) {
    const {payload} = action;
    try {
        yield call(baseApiSaga, null, signout);
        yield put(signOutSuccess());
        yield put(resetAccount());
        resetToken();
        payload.onSuccess();
    } catch (error) {
        yield put(signOutFail(error));
        payload.onError(error);
    }
}
export default function* authSagas() {
    yield all([
        takeLatest(signUpRequest.toString(), handleSignup),
        takeLatest(signInRequest.toString(), handleSignin),
        takeLatest(signOutRequest.toString(), handleSignout),
    ]);
}
