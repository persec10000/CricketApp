import types from './types';

export const setProfile = profile => {
    return {
        type: types.SET_PROFILE,
        payload: profile,
    };
};
