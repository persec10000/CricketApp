import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    players: [],
    leaders: [],
    loading: false,
    error: null,
};

export const fetchPlayersRequest = createAction('FETCH_PLAYERS_REQUEST');
export const fetchPlayersSuccess = createAction('FETCH_PLAYERS_SUCCESS');
export const fetchPlayersFail = createAction('FETCH_PLAYERS_FAIL');

export const fetchLeadersRequest = createAction('FETCH_LEADERS_REQUEST');
export const fetchLeadersSuccess = createAction('FETCH_LEADERS_SUCCESS');
export const fetchLeadersFail = createAction('FETCH_LEADERS_FAIL');

export default handleActions(
    {
        [combineActions(fetchPlayersRequest, fetchLeadersRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [fetchPlayersSuccess]: (state, action) => {
            return {
                ...state,
                players: action.payload,
                loading: false,
                error: null,
            };
        },
        [fetchLeadersSuccess]: (state, action) => {
            return {
                ...state,
                leaders: action.payload,
                loading: false,
                error: null,
            };
        },
        [combineActions(fetchPlayersFail, fetchLeadersFail)]: (state, action) => {
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
