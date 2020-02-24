import screens from '../../constants/screens';

import {
    SetupLeagueScreen,
    SetupTeamsScreen,
    SetupSettingsScreen,
    SetupFixturesScreen,
} from '../../screens';

const SetupStackRoutes = {
    [screens.SetupLeague]: {
        screen: SetupLeagueScreen,
        navigationOptions: {
            header: null,
        },
    },
    [screens.SetupSettings]: {
        screen: SetupSettingsScreen,
        navigationOptions: {
            header: null,
        },
    },
    [screens.SetupTeams]: {
        screen: SetupTeamsScreen,
        navigationOptions: {
            header: null,
        },
    },
    [screens.SetupFixtures]: {
        screen: SetupFixturesScreen,
        navigationOptions: {
            header: null,
        },
    },
};

export default SetupStackRoutes;
