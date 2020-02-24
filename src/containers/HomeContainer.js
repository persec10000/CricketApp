import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {
    getCurrentUser,
    getUserId,
    getTopLeaders,
    getTopClubs,
    getRecentMatches,
} from '../selectors';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function HomeContainer(Component) {
    class HomeContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
            currentUser: PropTypes.object,
            UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            topLeaders: PropTypes.array.isRequired,
            topClubs: PropTypes.array.isRequired,
            recentMatches: PropTypes.array.isRequired,
        };
        static defaultProps = {};
        componentDidUpdate = () => {};
        componentDidMount = () => {};

        navigate = (scene, params = {}) => () => {
            const {navigation} = this.props;
            if (scene === 'LeagueOverview') {
                const navigateAction = NavigationActions.navigate({
                    routeName: 'League',
                    params: {},
                    action: NavigationActions.navigate({routeName: scene}),
                });
                navigation.dispatch(navigateAction);
            } else {
                navigation.navigate({routeName: scene, params});
            }
        };
        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    HomeContainer.displayName = `HomeContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {
            currentUser: getCurrentUser(state),
            UserId: getUserId(state),
            topLeaders: getTopLeaders(state),
            topClubs: getTopClubs(state),
            recentMatches: getRecentMatches(state),
        };
    };
    const mapDispatchToProps = {};

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(HomeContainer);
}

export default HomeContainer;
