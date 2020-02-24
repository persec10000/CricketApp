import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentUser, getUserId, getPlayer} from '../selectors';
import {fetchPlayerRequest} from '../reducers/player';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function PlayerContainer(Component) {
    class PlayerContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
            currentUser: PropTypes.object,
            UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
            fetchPlayer: PropTypes.func.isRequired,
            player: PropTypes.object,
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

    PlayerContainer.displayName = `PlayerContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {
            currentUser: getCurrentUser(state),
            UserId: getUserId(state),
            player: getPlayer(state),
        };
    };
    const mapDispatchToProps = {
        fetchPlayer: fetchPlayerRequest,
    };

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(PlayerContainer);
}

export default PlayerContainer;
