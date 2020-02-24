import {createSwitchNavigator} from 'react-navigation';

import AppSwitchRoutes from './routes/AppSwitchRoutes';

export const createRootNavigator = (isLoggedIn = false) => {
    const AppSwitchNavigator = createSwitchNavigator(AppSwitchRoutes, {
        // initialRouteName: isLoggedIn ? 'HomeDrawerNavigator' : 'AuthStackNavigator',
    });

    return AppSwitchNavigator;
};
