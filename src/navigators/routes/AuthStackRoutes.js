import {WelcomeScreen, SigninScreen, SignupScreen} from '../../screens';
import AuthContainer from '../../containers/AuthContainer';

const AppStackRoutes = {
    WelcomeScreen: {
        screen: WelcomeScreen,
        navigationOptions: {
            header: null,
        },
    },
    SigninScreen: {
        screen: AuthContainer(SigninScreen),
        navigationOptions: {
            header: null,
        },
    },
    SignupScreen: {
        screen: AuthContainer(SignupScreen),
        navigationOptions: {
            header: null,
        },
    },
};

export default AppStackRoutes;
