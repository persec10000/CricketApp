import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    authData: {
        token_type: null,
        access_token: null,
        expires_in: null,
        user_id: null,
    },
    loading: false,
    error: null,
};
export const signUpRequest = createAction('SIGNUP_REQUEST');
export const signUpSuccess = createAction('SIGNUP_SUCCESS');
export const signUpFail = createAction('SIGNUP_FAIL');

export const signInRequest = createAction('SIGNIN_REQUEST');
export const signInSuccess = createAction('SIGNIN_SUCCESS');
export const signInFail = createAction('SIGNIN_FAIL');

export const signOutRequest = createAction('SIGNOUT_REQUEST');
export const signOutSuccess = createAction('SIGNOUT_SUCCESS');
export const signOutFail = createAction('SIGNOUT_FAIL');

export default handleActions(
    {
        [combineActions(signUpRequest, signInRequest, signOutRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [signUpSuccess]: (state, action) => {
            return {
                ...state,
                loading: false,
            };
        },
        [signInSuccess]: (state, action) => {
            return {
                ...state,
                loading: false,
                ...{authData: action.payload},
            };
        },
        [signOutSuccess]: (state, action) => {
            return initialState;
        },
        // failures
        [combineActions(signUpFail, signInFail, signOutFail)]: (state, action) => {
            const {message} = action.payload;
            return {
                ...state,
                loading: false,
                error: message,
            };
        },
    },
    initialState,
);
