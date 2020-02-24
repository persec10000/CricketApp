import screens from '../../constants/screens';
import LeagueContainer from '../../containers/LeagueContainer';

import {
    LeagueFixturesScreen,
    LeagueOverviewScreen,
    LeagueTeamsScreen,
    LeagueResultsScreen,
} from '../../screens';

const LeagueStackRoutes = {
    [screens.LeagueOverview]: {
        screen: LeagueContainer(LeagueOverviewScreen),
        navigationOptions: {
            header: null,
        },
    },
    [screens.LeagueResults]: {
        screen: LeagueResultsScreen,
        navigationOptions: {
            header: null,
        },
    },
    [screens.LeagueFixtures]: {
        screen: LeagueFixturesScreen,
        navigationOptions: {
            header: null,
        },
    },
    [screens.LeagueTeams]: {
        screen: LeagueTeamsScreen,
        navigationOptions: {
            header: null,
        },
    },
};

export default LeagueStackRoutes;
