import React from 'react';
import {
    StyleSheet,
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    Text,
    Modal,
    TextInput,
    Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import Spinner from 'react-native-loading-spinner-overlay';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-root-toast';

import LeftIconInputBox from '../../components/LeftIconInputBox';
import LeftAvatarSelector from '../../components/LeftAvatarSelector';
import RightIconInputBox from '../../components/RightIconInputBox';
import RightIconButton from '../../components/RightIconButton';
import CheckBox from '../../components/CheckBox';

import images from '../../constants/images';

import API from '../../service/API';

import {verifyEmail, verifyLength} from '../../utils/funcitons';

class SignupScreen extends React.Component {
    static propTypes = {
        signUp: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
        authError: PropTypes.string,
        authLoading: PropTypes.bool.isRequired,
    };
    static defaultProps = {
        signUp: () => {},
    };
    constructor(props) {
        super(props);
        this.state = {
            agreeTermsAndConditions: false,
            userType: 'player',
            hiddenPassword: true,
            email: '',
            password: '',
            firstname: '',
            lastname: '',
            emailVerifyModal: {
                visible: false,
                verificationCode: '',
            },
        };
    }

    onSuccess = () => {
        const {navigate} = this.props;
        /* let nextScreen = userType === 'player' ? 'MyProfile' : 'HomeDrawerNavigator';
					navigate(nextScreen)();
 */
        navigate('SigninScreen')();
    };
    onError = error => {
        console.log('error: ', error);
        Toast.show(error, {
            containerStyle: {flex: 1},
            duration: Toast.durations.LONG,
            position: Toast.positions.TOP,
            backgroundColor: '#fc5a03',
            textColor: '#ffffff',
            shadow: true,
            // animation: true,
            hideOnPress: true,
            delay: 0,
        });
    };
    onClickProceedButton = async () => {
        const {signUp} = this.props;
        const {userType} = this.state;
        if (this.state.email === '') {
            Alert.alert('Enter your email address.');
            return;
        }
        if (!verifyEmail(this.state.email)) {
            Alert.alert('Invalid email format.');
            return;
        }
        if (this.state.password === '') {
            Alert.alert('Enter your password.');
            return;
        }
        if (!verifyLength(this.state.password, 6)) {
            Alert.alert('Enter more than 6 letters.');
            return;
        }
        if (this.state.firstname === '' || this.state.lastname === '') {
            Alert.alert('Enter your name.');
            return;
        }
        if (!this.state.agreeTermsAndConditions) {
            Alert.alert('Do you agree Terms & Conditions? Please check this item.');
            return;
        }

        let data = {
            email: this.state.email,
            password: this.state.password,
            name: this.state.firstname + ' ' + this.state.lastname,
            is_player: userType === 'player' ? 1 : 0,
        };

        StatusBar.setBarStyle('light-content', true);
        signUp({data, onSuccess: this.onSuccess, onError: this.onError});
        /* var nextScreen = 'HomeDrawerNavigator';
        if (this.state.userType === 'player') {
            nextScreen = 'MyProfile';
            navigate(nextScreen)();
        } else {
            navigate(nextScreen)();
        } */
    };

    sendVerificationCodeToServer = async () => {
        if (this.state.emailVerifyModal.verificationCode === '') {
            Alert.alert('Enter a verification code.');
            return;
        }
        let data1 = {
            email: this.state.email,
            verificationCode: this.state.emailVerifyModal.verificationCode,
        };
        const response1 = await API.sendRequest({
            route: 'emailVerify',
            ...data1,
        });
        if (response1.status === 'success') {
            let data2 = {
                email: this.state.email,
                password: this.state.password,
                firstname: this.state.firstname,
                lastname: this.state.lastname,
            };
            const response2 = await API.sendRequest({
                route: 'signup',
                ...data2,
            });
            if (response2.status == 'success') {
                data2.logged = true;
                this.setAccount({data: data2});
                var nextScreen = 'HomeDrawNavigator';
                StatusBar.setBarStyle('light-content', true);
                if (this.state.userType === 'player') nextScreen = 'MyProfileScreen';
                this.props.navigation.navigate(nextScreen);
            }
        } else {
            setTimeout(() => {
                Alert.alert('Invalid verification code.');
            }, 1000);
        }
    };

    render() {
        const {navigate, authLoading} = this.props;
        return (
            <ScrollView contentContainerStyle={{alignItems: 'center'}}>
                <StatusBar barStyle="dark-content" />
                <View style={{height: hp('5.0%')}} />
                <View
                    style={{
                        alignSelf: 'flex-start',
                        alignItems: 'flex-start',
                        marginHorizontal: wp('3.0%'),
                        marginVertical: hp('0.5%'),
                    }}>
                    <TouchableOpacity onPress={navigate('WelcomeScreen')}>
                        <Icon
                            name="arrow-left"
                            type="material-community"
                            color="#888"
                            size={hp('4.0%')}
                        />
                    </TouchableOpacity>
                </View>
                <Text
                    style={{
                        width: wp('80%'),
                        paddingVertical: hp('3.0%'),
                        fontSize: hp('3.0%'),
                        fontWeight: 'bold',
                        color: '#444',
                        textAlign: 'left',
                    }}>
                    SIGN UP
                </Text>
                <View
                    style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: hp('40%'),
                    }}>
                    <LeftAvatarSelector
                        selected={this.state.userType === 'player'}
                        image={images.signupPlayerPng}
                        text="I'M PLAYER"
                        onPress={() => this.setState({userType: 'player'})}
                    />
                    <LeftAvatarSelector
                        selected={this.state.userType === 'user'}
                        image={images.signupUserPng}
                        text="I'M USER"
                        onPress={() => this.setState({userType: 'user'})}
                    />
                </View>
                <View
                    style={{
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        height: hp('50%'),
                    }}>
                    <LeftIconInputBox
                        value={this.state.email}
                        iconName="email-outline"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={value => this.setState({email: value})}
                        autoCapitalize="none"
                    />
                    <View
                        style={{
                            width: wp('90%'),
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                        }}>
                        <Icon
                            name="lock-outline"
                            type="material-community"
                            color="#27ae60"
                            size={hp('3.0%')}
                        />
                        <RightIconInputBox
                            value={this.state.password}
                            inputWidth={wp('78%') - hp('3.0%')}
                            placeholder="Password"
                            secureTextEntry={this.state.hiddenPassword}
                            iconColor={this.state.hiddenPassword ? '#ccc' : '#888'}
                            iconName={this.state.hiddenPassword ? 'eye-off' : 'eye'}
                            iconType="material-community"
                            onPress={() =>
                                this.setState({hiddenPassword: !this.state.hiddenPassword})
                            }
                            onChangeText={value => this.setState({password: value})}
                        />
                    </View>
                    <LeftIconInputBox
                        value={this.state.firstname}
                        iconName="account-outline"
                        placeholder="Name"
                        onChangeText={value => this.setState({firstname: value})}
                    />
                    <LeftIconInputBox
                        value={this.state.lastname}
                        iconName="account-outline"
                        placeholder="Surname"
                        onChangeText={value => this.setState({lastname: value})}
                    />
                    <CheckBox
                        checked={this.state.agreeTermsAndConditions}
                        text="I read and agree to Terms & Conditions"
                        onPress={() =>
                            this.setState({
                                agreeTermsAndConditions: !this.state.agreeTermsAndConditions,
                            })
                        }
                    />
                </View>
                <View
                    style={{
                        height: hp('20%'),
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            marginVertical: hp('2.0%'),
                        }}>
                        <RightIconButton
                            title={this.state.userType === 'player' ? 'PLAYER PROFILE' : 'SIGN UP'}
                            onPress={() => this.onClickProceedButton()}
                        />
                    </View>
                    <View
                        style={{
                            flexDirection: 'row',
                            paddingHorizontal: wp('1.0%'),
                            paddingVertical: hp('0.5%'),
                            marginVertical: hp('2.0%'),
                            borderTopWidth: 1,
                            borderTopColor: '#888',
                        }}>
                        <Text
                            style={{
                                paddingHorizontal: wp('1.0%'),
                                fontSize: hp('2.0%'),
                                color: '#444',
                            }}>
                            {'Already have an account?'}
                        </Text>
                        <TouchableOpacity onPress={navigate('SigninScreen')}>
                            <Text
                                style={{
                                    paddingHorizontal: wp('1.0%'),
                                    fontSize: hp('2.0%'),
                                    color: '#2196f3',
                                }}>
                                {' Sign In'}
                            </Text>
                        </TouchableOpacity>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.emailVerifyModal.visible}>
                        <View
                            style={{
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <StatusBar
                                backgroundColor="rgba(0, 0, 0, 0.6)"
                                barStyle="light-content"
                            />
                            <TouchableOpacity
                                activeOpacity={1.0}
                                style={{
                                    width: wp('100%'),
                                    height: hp('100%'),
                                    backgroundColor: '#000',
                                    opacity: 0.6,
                                }}
                                onPress={() => {
                                    this.setState(prevState => ({
                                        ...prevState,
                                        emailVerifyModal: {
                                            visible: false,
                                        },
                                    }));
                                }}
                            />
                            <TouchableOpacity style={styles.modalView}>
                                <Text style={styles.modalText}>
                                    We sent a verification code to your email.
                                </Text>
                                <TextInput
                                    placeholder="Verification Code"
                                    style={styles.modalTextInput}
                                    onChangeText={text => {
                                        this.setState(prevState => ({
                                            ...prevState,
                                            emailVerifyModal: {
                                                ...prevState.emailVerifyModal,
                                                verificationCode: text,
                                            },
                                        }));
                                    }}
                                />
                                <TouchableOpacity
                                    onPress={() => this.sendVerificationCodeToServer()}>
                                    <Text style={styles.modalButton}>
                                        Send the Verification Code
                                    </Text>
                                </TouchableOpacity>
                            </TouchableOpacity>
                        </View>
                    </Modal>
                    <Spinner
                        visible={authLoading}
                        textContent={'One Moment...'}
                        textStyle={{color: '#fff'}}
                    />
                </View>
            </ScrollView>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp('80%'),
        height: hp('30%'),
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        elevation: 10,
        position: 'absolute',
    },
    modalText: {
        width: wp('72%'),
        textAlign: 'center',
        color: '#888',
        fontSize: hp('2.0%'),
    },
    modalTextInput: {
        width: wp('72%'),
        paddingHorizontal: wp('2.0%'),
        paddingVertical: hp('0.5%'),
        fontSize: hp('2.0%'),
        color: '#444',
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
    },
    modalButton: {
        width: wp('72%'),
        paddingHorizontal: wp('2.0%'),
        paddingVertical: hp('0.75%'),
        fontSize: hp('2.25%'),
        color: '#fff',
        backgroundColor: '#27ae60',
        borderRadius: 5,
        textAlign: 'center',
    },
});

export default SignupScreen;
