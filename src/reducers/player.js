import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    player: {},
    loading: false,
    error: null,
};

export const fetchPlayerRequest = createAction('FETCH_PLAYER_REQUEST');
export const fetchPlayerSuccess = createAction('FETCH_PLAYER_SUCCESS');
export const fetchPlayerFail = createAction('FETCH_PLAYER_FAIL');

export default handleActions(
    {
        [combineActions(fetchPlayerRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [fetchPlayerSuccess]: (state, action) => {
            return {
                ...state,
                player: action.payload,
                loading: false,
                error: null,
            };
        },

        [combineActions(fetchPlayerFail)]: (state, action) => {
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
