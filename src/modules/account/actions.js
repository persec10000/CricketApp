import types from './types';

export const setAccount = account => {
    return {
        type: types.SET_ACCOUNT,
        payload: account,
    };
};
