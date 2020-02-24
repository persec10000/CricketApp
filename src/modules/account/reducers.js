import types from './types';

const initialState = {
    logged: false,
    rememberMe: false,
    id: null,
    email: '',
    password: '',
    firstname: 'Joseph',
    lastname: 'Angelic',
    photo: null,
    profile: {
        id: null,
        team: {
            id: null,
            name: '',
        },
        hearts: 0,
        likes: 0,
        massages: 0,
        matches: 0,
        runs: 0,
        wickets: 0,
    },
};

export default function accountReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_ACCOUNT:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
