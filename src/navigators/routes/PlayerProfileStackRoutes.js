import screens from '../../constants/screens';
import PlayerContainer from '../../containers/PlayerContainer';

import {PlayerProfileScreen} from '../../screens';

const PlayerProfileStackRoutes = {
    [screens.PlayerProfile]: {
        screen: PlayerContainer(PlayerProfileScreen),
        navigationOptions: {
            header: null,
        },
    },
};

export default PlayerProfileStackRoutes;
