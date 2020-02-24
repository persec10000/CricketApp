import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentUser, getUserId} from '../selectors';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function LeagueContainer(Component) {
    class LeagueContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
            currentUser: PropTypes.object,
            UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
                navigation.navigate(scene);
            }
        };
        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    LeagueContainer.displayName = `LeagueContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {
            currentUser: getCurrentUser(state),
            UserId: getUserId(state),
        };
    };
    const mapDispatchToProps = {};

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(LeagueContainer);
}

export default LeagueContainer;
