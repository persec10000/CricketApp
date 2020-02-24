import React from 'react';
import PropTypes from 'prop-types';

import {View, Image} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// assets
import images from '../../constants/images';
import {getToken} from '../../utils/storage';
import {setToken} from '../../service/cricketApi';
class SplashScreen extends React.Component {
    static propTypes = {
        navigate: PropTypes.func.isRequired,
        logged: PropTypes.bool.isRequired,
        fetchAccount: PropTypes.func.isRequired,
        fetchHomeData: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {};
    }
    onSuccess = async data => {
        const {navigate, fetchHomeData} = this.props;
        fetchHomeData();
        navigate('HomeDrawerNavigator')();
    };
    onError = error => {
        console.log('error', error);
        const {navigate} = this.props;
        navigate('WelcomeScreen')();
    };
    componentDidMount = () => {
        setTimeout(() => {
            this.checkAuthStatus();
        }, 200);
    };
    checkAuthStatus = async () => {
        const {navigate, fetchAccount} = this.props;
        try {
            // eslint-disable-next-line camelcase
            const access_token = await getToken();
            // eslint-disable-next-line camelcase
            if (access_token) {
                setToken(access_token);
                fetchAccount({onSuccess: this.onSuccess, onError: this.onError});
            } else {
                navigate('WelcomeScreen')();
            }
        } catch (error) {
            navigate('WelcomeScreen')();
        }
    };

    render() {
        return (
            <View
                style={{
                    flex: 1,
                    justifyContent: 'center',
                    alignItems: 'center',
                }}>
                <Image
                    source={images.logoPng}
                    style={{
                        width: hp('16%'),
                        height: hp('16%'),
                        resizeMode: 'contain',
                    }}
                />
            </View>
        );
    }
}

export default SplashScreen;
