import React from 'react';
import PropTypes from 'prop-types';

import {
    StyleSheet,
    Alert,
    StatusBar,
    View,
    TouchableOpacity,
    Text,
    TextInput,
    Modal,
} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';

import RightIconButton from '../../components/RightIconButton';
import LeftIconInputBox from '../../components/LeftIconInputBox';
import CheckBox from '../../components/CheckBox';

import API from '../../service/API';

import {verifyEmail, verifyLength} from '../../utils/funcitons';
import {saveToken, setData, getData} from '../../utils/storage';

class SigninScreen extends React.Component {
    static propTypes = {
        signIn: PropTypes.func.isRequired,
        navigate: PropTypes.func.isRequired,
        authError: PropTypes.string,
        authLoading: PropTypes.bool.isRequired,
        fetchHomeData: PropTypes.func.isRequired,
    };
    static defaultProps = {
        signIn: () => {},
    };
    constructor(props) {
        super(props);
        this.state = {
            email: 'vbuckridge@example.org',
            password: 'password',
            rememberMe: false,
            forgotPasswordModal: {
                visible: false,
                step: 'sendVerificationCodeToEmail',
                email: '',
                newPassword: '',
                confirmPassword: '',
                verificationCode: '',
            },
        };
    }

    componentDidMount = async () => {
        try {
            let email = await getData('email');
            let password = await getData('password');
            this.setState({email, password});
        } catch (error) {}

        /*  this.setState({
            email: this.props.account.email,
            password: this.props.account.rememberMe ? this.props.account.password : '',
            rememberMe: this.props.account.rememberMe,
        }); */
    };

    sendVerificationCodeToEmail = async () => {
        if (this.state.forgotPasswordModal.email == '') {
            Alert.alert('Enter your email address.');
            return;
        }
        if (!verifyEmail(this.state.forgotPasswordModal.email)) {
            Alert.alert('Invalid email address.');
            return;
        }

        let data = {
            email: this.state.forgotPasswordModal.email,
        };
        const response = await API.sendRequest({
            route: 'forgotPassword',
            ...data,
        });
        if (response.status == 'success') {
            this.setState(prevState => ({
                ...prevState,
                forgotPasswordModal: {
                    ...prevState.forgotPasswordModal,
                    step: 'sendVerificationCodeToServer',
                },
            }));
        } else {
            setTimeout(() => {
                alert('We can not find your email address.');
            }, 1000);
        }
    };

    sendVerificationCodeToServer = async () => {
        if (this.state.forgotPasswordModal.verificationCode == '') {
            Alert.alert('Enter a verification code.');
            return;
        }

        let data = {
            email: this.state.forgotPasswordModal.email,
            verificationCode: this.state.forgotPasswordModal.verificationCode,
        };
        const response = await API.sendRequest({
            route: 'emailVerify',
            ...data,
        });
        if (response.status == 'success') {
            this.setState(prevState => ({
                ...prevState,
                forgotPasswordModal: {
                    ...prevState.forgotPasswordModal,
                    step: 'resetPassword',
                },
            }));
        } else {
            setTimeout(() => {
                alert('Invalid verification code.');
            }, 1000);
        }
    };

    resetPassword = async () => {
        if (this.state.forgotPasswordModal.newPassword == '') {
            Alert.alert('Enter your password.');
            return;
        }
        if (!verifyLength(this.state.forgotPasswordModal.newPassword, 6)) {
            Alert.alert('Enter more than 6 letters.');
            return;
        }
        if (this.state.forgotPasswordModal.confirmPassword == '') {
            Alert.alert('Re-enter your password.');
            return;
        }
        if (
            this.state.forgotPasswordModal.password !==
            this.state.forgotPasswordModal.confirmPassword
        ) {
            Alert.alert('Incorrect confirm password.');
            return;
        }

        let data = {
            email: this.state.forgotPasswordModal.email,
            newPassword: this.state.forgotPasswordModal.newPassword,
        };
        const response = await API.sendRequest({
            route: 'resetPassword',
            ...data,
        });
        if (response.status == 'success') {
            this.setState(prevState => ({
                ...prevState,
                forgotPasswordModal: {
                    ...prevState.forgotPasswordModal,
                    visible: false,
                },
            }));
        } else {
            setTimeout(() => {
                alert('Network connect error.');
            }, 1000);
        }
    };

    setRememberMe = () => {
        this.setState({rememberMe: !this.state.rememberMe});
    };
    onSuccess = async data => {
        const {rememberMe, email, password} = this.state;
        if (rememberMe) {
            await setData('email', email);
            await setData('password', password);
        }
        await saveToken(data.access_token);
        const {navigate} = this.props;
        navigate('HomeDrawerNavigator')();
        // navigate('MyProfile')();
    };
    onError = error => {
        console.log('error: ', error);
    };

    login = async () => {
        const {signIn} = this.props;
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

        let data = {
            email: this.state.email,
            password: this.state.password,
        };
        signIn({data, onSuccess: this.onSuccess, onError: this.onError});

        // this.props.navigation.navigate('HomeDrawerNavigator');
    };

    render() {
        const {authLoading} = this.props;
        return (
            <View
                style={{
                    alignItems: 'center',
                }}>
                <StatusBar barStyle="dark-content" />
                <View
                    style={{
                        height: hp('5.0%'),
                    }}
                />
                <View
                    style={{
                        alignSelf: 'flex-start',
                        marginHorizontal: wp('3.0%'),
                        marginVertical: hp('0.5%'),
                    }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('WelcomeScreen')}>
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
                    SIGN IN
                </Text>
                <View
                    style={{
                        justifyContent: 'space-evenly',
                        alignItems: 'center',
                        height: hp('40%'),
                    }}>
                    <LeftIconInputBox
                        value={this.state.email}
                        iconName="email-outline"
                        placeholder="E-mail"
                        keyboardType="email-address"
                        onChangeText={value => this.setState({email: value})}
                        autoCapitalize="none"
                    />
                    <LeftIconInputBox
                        value={this.state.password}
                        iconName="lock-outline"
                        placeholder="Password"
                        secureTextEntry={true}
                        onChangeText={value => this.setState({password: value})}
                    />
                    <View
                        style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: wp('90%'),
                        }}>
                        <CheckBox
                            width={wp('50%')}
                            checked={this.state.rememberMe}
                            text="Remember me"
                            onPress={() => this.setState({rememberMe: !this.state.rememberMe})}
                        />
                        <TouchableOpacity
                            onPress={() => {
                                this.setState(prevState => ({
                                    ...prevState,
                                    forgotPasswordModal: {
                                        visible: true,
                                        step: 'sendVerificationCodeToEmail',
                                        email: this.state.email,
                                        verificationCode: '',
                                        newPassword: '',
                                        confirmPassword: '',
                                    },
                                }));
                            }}>
                            <Text
                                style={{
                                    paddingHorizontal: wp('1.0%'),
                                    paddingVertical: hp('0.25%'),
                                    fontSize: hp('2.0%'),
                                    color: '#888',
                                    borderBottomWidth: 1,
                                    borderBottomColor: '#888',
                                }}>
                                Forgot password?
                            </Text>
                        </TouchableOpacity>
                    </View>
                </View>
                <View
                    style={{
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}>
                    <View
                        style={{
                            marginVertical: hp('2.0%'),
                        }}>
                        <RightIconButton title="SIGN IN" onPress={() => this.login()} />
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
                            Create new account.
                        </Text>
                        <View>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignupScreen')}>
                                <Text
                                    style={{
                                        paddingHorizontal: wp('1.0%'),
                                        fontSize: hp('2.0%'),
                                        color: '#2196f3',
                                    }}>
                                    Sign Up
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <Modal
                        animationType="fade"
                        transparent={true}
                        visible={this.state.forgotPasswordModal.visible}>
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
                                        forgotPasswordModal: {
                                            ...prevState.forgotPasswordModal,
                                            visible: false,
                                        },
                                    }));
                                }}
                            />
                            {this.state.forgotPasswordModal.step ==
                            'sendVerificationCodeToEmail' ? (
                                <TouchableOpacity style={styles.modalView}>
                                    <Text style={styles.modalText}>
                                        Please type your account email address.
                                    </Text>
                                    <TextInput
                                        value={this.state.forgotPasswordModal.email}
                                        placeholder="E-mail"
                                        style={styles.modalTextInput}
                                        onChangeText={text => {
                                            this.setState(prevState => ({
                                                ...prevState,
                                                forgotPasswordModal: {
                                                    ...prevState.forgotPasswordModal,
                                                    email: text,
                                                },
                                            }));
                                        }}
                                    />
                                    <TouchableOpacity
                                        onPress={() => this.sendVerificationCodeToEmail()}>
                                        <Text style={styles.modalButton}>
                                            Send a Verification Code
                                        </Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ) : null}
                            {this.state.forgotPasswordModal.step ==
                            'sendVerificationCodeToServer' ? (
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
                                                forgotPasswordModal: {
                                                    ...prevState.forgotPasswordModal,
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
                            ) : null}
                            {this.state.forgotPasswordModal.step == 'resetPassword' ? (
                                <TouchableOpacity style={styles.modalView}>
                                    <Text style={styles.modalText}>
                                        Please type your new password.
                                    </Text>
                                    <TextInput
                                        placeholder="New Password"
                                        style={styles.modalTextInput}
                                        onChangeText={text => {
                                            this.setState(prevState => ({
                                                ...prevState,
                                                forgotPasswordModal: {
                                                    ...prevState.forgotPasswordModal,
                                                    newPassword: text,
                                                },
                                            }));
                                        }}
                                    />
                                    <TextInput
                                        placeholder="Confirm Password"
                                        style={styles.modalTextInput}
                                        onChangeText={text => {
                                            this.setState(prevState => ({
                                                ...prevState,
                                                forgotPasswordModal: {
                                                    ...prevState.forgotPasswordModal,
                                                    confirmPassword: text,
                                                },
                                            }));
                                        }}
                                    />
                                    <TouchableOpacity onPress={() => this.resetPassword()}>
                                        <Text style={styles.modalButton}>Change Password</Text>
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            ) : null}
                        </View>
                    </Modal>
                </View>
                <Spinner
                    visible={authLoading}
                    textContent={'One Moment...'}
                    textStyle={{color: '#fff'}}
                />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    modalView: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        width: wp('80%'),
        height: hp('30%'),
        backgroundColor: '#f6f8fa',
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

export default SigninScreen;
