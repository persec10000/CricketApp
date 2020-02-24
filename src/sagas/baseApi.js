import {call, put} from 'redux-saga/effects';

export default function* baseApiSaga(successActionFunc, apiFunc, ...apiParams) {
    let response;
    let error;

    try {
        response = yield call(apiFunc, ...apiParams);
        const {status, data} = response;

        if (status >= 200 && status < 300) {
            if (successActionFunc) {
                yield put(successActionFunc(data));
            }
        } else if (status === 401) {
            // sign out the user if their tokens are expired, Do nothing for now
            error = new Error(`Request failed (status code ${status})!`);
        } else if (status === 429 || status === 404) {
            // Do nothing if api is throttled or resource not found
            error = new Error(`Request failed (status code ${status})!`);
        } else if (status === 403) {
            error = new Error(`Not authorized (status code ${status})!`);
        } else {
            error = new Error(`Request failed (status code ${status})!`);
        }
    } catch (err) {
        // handle 5XX errors
        error = err;
    }

    if (error) {
        // Propagate error so that following sagas can be cancelled
        throw error;
    }

    return response;
}
