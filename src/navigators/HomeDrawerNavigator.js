import {createDrawerNavigator} from 'react-navigation-drawer';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import HomeContainer from '../containers/HomeContainer';

import LeagueStackNavigator from './LeagueStackNavigator';
import SearchStackNavigator from './SearchStackNavigator';
import SetupStackNavigator from './SetupStackNavigator';
import MatchScheduleStackNavigator from './MatchScheduleStackNavigator';
import TeamProfileStackNavigator from './TeamProfileStackNavigator';
import MyProfileStackNavigator from './MyProfileStackNavigator';
import PlayerProfileStackNavigator from './PlayerProfileStackNavigator';
import MatchCenterStackNavigator from './MatchCenterStackNavigator';
import FollowingStackNavigator from './FollowingStackNavigator';

import HomeScreen from '../screens/Home';
import NotificationCenterScreen from '../screens/NotificationCenter';
import CreateSponsorScreen from '../screens/CreateSponsor';
import JoinRequestScreen from '../screens/JoinRequest';
import CreateVenueScreen from '../screens/CreateVenue';
import NewsDetailsScreen from '../screens/NewsDetails';
import SponsorListScreen from '../screens/SponsorList';
import StatusMyLeaguesScreen from '../screens/StatusMyLeagues';
import StatusAllLeaguesScreen from '../screens/StatusAllLeagues';
import StatusMyMatchesScreen from '../screens/StatusMyMatches';

import BurgerMenu from '../components/BurgerMenu';

const HomeDrawerNavigator = createDrawerNavigator(
    {
        Home: {
            screen: HomeContainer(HomeScreen),
        },
        NewsDetails: {
            screen: NewsDetailsScreen,
        },
        MyProfile: {
            screen: MyProfileStackNavigator,
        },
        PlayerProfile: {
            screen: PlayerProfileStackNavigator,
        },
        StatusMyMatches: {
            screen: StatusMyMatchesScreen,
        },
        StatusAllLeagues: {
            screen: StatusAllLeaguesScreen,
        },
        StatusMyLeagues: {
            screen: StatusMyLeaguesScreen,
        },
        CreateVenue: {
            screen: CreateVenueScreen,
        },
        SponsorList: {
            screen: SponsorListScreen,
        },
        League: {
            screen: LeagueStackNavigator,
        },
        Settings: {
            screen: SetupStackNavigator,
        },
        TeamProfile: {
            screen: TeamProfileStackNavigator,
        },
        MatchSchedule: {
            screen: MatchScheduleStackNavigator,
        },
        MatchCenter: {
            screen: MatchCenterStackNavigator,
        },
        Following: {
            screen: FollowingStackNavigator,
        },
        JoinRequest: {
            screen: JoinRequestScreen,
        },
        CreateSponsor: {
            screen: CreateSponsorScreen,
        },
        NotificationCenter: {
            screen: NotificationCenterScreen,
        },
        Search: {
            screen: SearchStackNavigator,
        },
    },
    {
        initialRouteName: 'Home',
        contentComponent: BurgerMenu,
        drawerWidth: wp('100%'),
        drawerBackgroundColor: 'transparent',
    },
);

export default HomeDrawerNavigator;
