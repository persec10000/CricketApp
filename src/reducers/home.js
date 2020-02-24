import {createAction, handleActions, combineActions} from 'redux-actions';

const initialState = {
    recentMatches: [],
    topLeaders: [],
    recentNews: [],
    topClubs: [],
    loading: false,
    error: null,
};

export const fetchHomeDataRequest = createAction('FETCH_HOME_DATA_REQUEST');
export const fetchHomeDataSuccess = createAction('FETCH_HOME_DATA_SUCCESS');
export const fetchHomeDataFail = createAction('FETCH_HOME_DATA_FAIL');

export default handleActions(
    {
        [combineActions(fetchHomeDataRequest)]: (state, action) => {
            return {
                ...state,
                loading: true,
                error: null,
            };
        },
        [fetchHomeDataSuccess]: (state, action) => {
            const {recentMatches, topLeaders, recentNews, topClubs} = action.payload;
            return {
                ...state,
                recentMatches: recentMatches,
                topLeaders: topLeaders,
                recentNews: recentNews,
                topClubs: topClubs,
                loading: false,
                error: null,
            };
        },
        [combineActions(fetchHomeDataFail)]: (state, action) => {
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
