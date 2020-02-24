import {combineReducers} from 'redux';
import account from './account';
import auth from './auth';
import home from './home';
import player from './player';

import players from './players';

const rootReducer = combineReducers({
    account,
    auth,
    home,
    players,
    player,
});

export default rootReducer;
