import React from 'react';
import {View, StyleSheet, StatusBar} from 'react-native';
import {Provider} from 'react-redux';
import {createAppContainer} from 'react-navigation';
import {Root, Spinner, Container} from 'native-base';
import {PersistGate} from 'redux-persist/lib/integration/react';

import {createRootNavigator} from './src/navigators/AppSwitchNavigator';
import configureStore from './src/store';
import {getToken} from './src/utils/storage';
import {setToken} from './src/service/cricketApi';

export const {store, persistor} = configureStore();

export default class App extends React.Component {
    state = {
        signedIn: false,
        spinner: true,
    };
    componentDidMount = async () => {
        this.setState({spinner: false});
        /*   let signedIn = false;
        let spinner = false;
        try {
            // eslint-disable-next-line camelcase
            const access_token = await getToken();
            // eslint-disable-next-line camelcase
            if (access_token) {
                setToken(access_token);
                signedIn = true;
            }
            this.setState({signedIn, spinner});
        } catch (error) {
            this.setState({spinner});
        } */
    };
    render() {
        const {spinner, signedIn} = this.state;
        if (spinner) {
            return (
                <Root>
                    <View style={styles.container}>
                        <Spinner color="#219653" />
                    </View>
                </Root>
            );
        }
        const AppContainer = createAppContainer(createRootNavigator(signedIn));
        const RootLayout = () => (
            <Container>
                <StatusBar
                    translucent={true}
                    barStyle="light-content"
                    backgroundColor="transparent"
                />
                <AppContainer />
            </Container>
        );
        return (
            <Provider store={store}>
                <PersistGate
                    loading={
                        <Root>
                            <View style={styles.container}>
                                <Spinner color="#219653" />
                            </View>
                        </Root>
                    }
                    persistor={persistor}>
                    <Root>
                        <RootLayout />
                    </Root>
                </PersistGate>
            </Provider>
        );
        /* return (
            <View style={{flex: 1}}>
                <StatusBar
                    translucent={true}
                    barStyle="light-content"
                    backgroundColor="transparent"
                />
                <Provider store={store}>
                    <AppContainer />
                </Provider>
            </View>
        ); */
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
    },
});
