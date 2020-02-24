import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getAuthError, getAuthLoading, getLogStatus} from '../selectors';
import {signUpRequest, signInRequest} from '../reducers/auth';
import {fetchHomeDataRequest} from '../reducers/home';

import {fetchAccountRequest} from '../reducers/account';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function AuthContainer(Component) {
    class AuthContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
            signUp: PropTypes.func.isRequired,
            signIn: PropTypes.func.isRequired,
            fetchAccount: PropTypes.func.isRequired,
            authError: PropTypes.string,
            authLoading: PropTypes.bool.isRequired,
            logged: PropTypes.bool.isRequired,
            fetchHomeData: PropTypes.func.isRequired,
        };
        static defaultProps = {
            signup: () => {},
            signIn: () => {},
            authError: null,
            authLoading: false,
        };
        componentDidUpdate = () => {};
        componentDidMount = () => {};

        navigate = (scene, params = {}) => () => {
            const {navigation} = this.props;
            if (scene === 'HomeDrawerNavigator') {
                const navigateAction = NavigationActions.navigate({
                    routeName: scene,
                    params: {},
                });
                navigation.dispatch(navigateAction);
            } else if (scene === 'MyProfile') {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'HomeDrawerNavigator',
                    params: {},
                    action: NavigationActions.navigate({routeName: 'MyProfile'}),
                });
                navigation.dispatch(navigateAction);
            } else if (scene === 'WelcomeScreen') {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'AuthStackNavigator',
                    params: {},
                    action: NavigationActions.navigate({routeName: 'WelcomeScreen'}),
                });
                navigation.dispatch(navigateAction);
            } else {
                navigation.navigate(scene);
            }
        };

        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    AuthContainer.displayName = `AuthContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {
            authError: getAuthError(state),
            authLoading: getAuthLoading(state),
            logged: getLogStatus(state),
        };
    };
    const mapDispatchToProps = {
        signUp: signUpRequest,
        signIn: signInRequest,
        fetchAccount: fetchAccountRequest,
        fetchHomeData: fetchHomeDataRequest,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AuthContainer);
}

export default AuthContainer;
