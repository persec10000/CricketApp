import React from 'react';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';

import {getDisplayName} from '../utils';
import {NavigationActions} from 'react-navigation';

function AppContainer(Component) {
    class AppContainer extends Component {
        static propTypes = {
            navigation: PropTypes.object.isRequired,
        };
        static defaultProps = {};
        componentDidUpdate = () => {};

        navigate = (scene, params = {}) => () => {
            const {navigation} = this.props;

            navigation.navigate(scene);
        };

        render() {
            return <Component {...this.props} navigate={this.navigate} />;
        }
    }

    AppContainer.displayName = `AppContainer(${getDisplayName(Component)})`;
    const mapStateToProps = state => {
        return {};
    };
    const mapDispatchToProps = {};

    return connect(
        mapStateToProps,
        mapDispatchToProps,
    )(AppContainer);
}

export default AppContainer;
