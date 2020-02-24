import HomeDrawerNavigator from '../HomeDrawerNavigator';
import AuthStackNavigator from '../AuthStackNavigator';
import AuthContainer from '../../containers/AuthContainer';

import {SplashScreen} from '../../screens';

const AppSwitchRoutes = {
    SplashScreen: {
        screen: AuthContainer(SplashScreen),
        navigationOptions: {
            header: null,
        },
    },
    AuthStackNavigator: {
        screen: AuthStackNavigator,
        navigationOptions: {
            header: null,
        },
    },
    HomeDrawerNavigator: {
        screen: HomeDrawerNavigator,
        navigationOptions: {
            header: null,
        },
    },
};

export default AppSwitchRoutes;
