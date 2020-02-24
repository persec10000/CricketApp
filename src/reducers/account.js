import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    account: null,
    loading: false,
    error: null,
    logged: false,
};
export const setAccount = createAction('SET_ACCOUNT');

export const resetAccount = createAction('RESET_ACCOUNT');

export const fetchAccountRequest = createAction('FETCH_ACCOUNT_REQUEST');
export const fetchAccountSuccess = createAction('FETCH_ACCOUNT_SUCCESS');
export const fetchAccountFail = createAction('FETCH_ACCOUNT_FAIL');

export default handleActions(
    {
        [combineActions(fetchAccountRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [combineActions(fetchAccountSuccess, setAccount)]: (state, action) => {
            return {
                ...state,
                account: action.payload,
                loading: false,
                error: null,
                logged: true,
            };
        },
        [combineActions(fetchAccountFail)]: (state, action) => {
            const {message} = action.payload;

            return {
                ...state,
                loading: false,
                error: message,
            };
        },
        [combineActions(resetAccount)]: (state, action) => {
            return initialState;
        },
    },
    initialState,
);
