import {createStackNavigator} from 'react-navigation-stack';

import AuthStackRoutes from './routes/AuthStackRoutes';

const AuthStackNavigator = createStackNavigator(AuthStackRoutes, {
    // initialRouteName: 'SigninScreen',
});

export default AuthStackNavigator;
