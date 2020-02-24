import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import {getCurrentUser, getUserId} from '../selectors';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function TeamContainer(Component) {
    class TeamContainer extends Component {
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

            navigation.navigate(scene);
        };
        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    TeamContainer.displayName = `TeamContainer(${getDisplayName(Component)})`;
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
    )(TeamContainer);
}

export default TeamContainer;
