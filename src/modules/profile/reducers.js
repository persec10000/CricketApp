import types from './types';

const initialState = {
    id: null,
    firstname: '',
    lastname: '',
    photo: null,
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
};

export default function profileReducer(state = initialState, action) {
    switch (action.type) {
        case types.SET_PROFILE:
            return {
                ...action.payload,
            };
        default:
            return state;
    }
}
