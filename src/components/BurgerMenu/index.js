import React from 'react';
import {
    StatusBar,
    ScrollView,
    View,
    TouchableOpacity,
    TouchableHighlight,
    Text,
    Image,
} from 'react-native';
import PropTypes from 'prop-types';
import {connect} from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {NavigationActions, StackActions} from 'react-navigation';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {clearToken, setData} from '../../utils/storage';
import {signOutRequest} from '../../reducers/auth';

class BurgerMenu extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        signout: PropTypes.func.isRequired,
    };
    // eslint-disable-next-line no-useless-constructor
    constructor(props) {
        super(props);
    }

    logout() {
        StatusBar.setBarStyle('dark-content', true);
        const {signout} = this.props;
        signout({onSuccess: this.onSignoutSuccess, onError: this.onSignoutError});
    }
    onSignoutSuccess = async () => {
        await setData('email', '');
        await setData('password', '');
        await clearToken();
        const {navigation} = this.props;
        const navigateAction = NavigationActions.navigate({
            routeName: 'AuthStackNavigator',
            params: {},
            action: NavigationActions.navigate({routeName: 'SigninScreen'}),
        });
        navigation.dispatch(navigateAction);
    };
    onSignoutError = error => {
        console.log('error: ', error);
    };

    render() {
        return (
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'flex-start',
                    alignItems: 'center',
                    backgroundColor: 'transparent',
                }}>
                <View style={{height: hp('100%'), justifyContent: 'center', alignItems: 'center'}}>
                    <LinearGradient
                        colors={['#eb9edf', '#7a85de']}
                        style={{
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: wp('100%'),
                            height: hp('30%'),
                        }}
                        start={{x: 0.0, y: 0.0}}
                        end={{x: 1.0, y: 1.0}}>
                        <View
                            style={{
                                paddingTop: hp('3.0%'),
                                width: wp('100%'),
                                height: hp('30%'),
                                justifyContent: 'center',
                                alignItems: 'center',
                            }}>
                            <Image
                                source={require('../../assets/images/profile-person.jpg')}
                                style={{
                                    width: hp('15%'),
                                    height: hp('15%'),
                                    resizeMode: 'cover',
                                    borderRadius: 100,
                                }}
                            />
                            <Text
                                style={{
                                    fontWeight: '600',
                                    color: '#fff',
                                    fontSize: hp('2.5%'),
                                    paddingTop: hp('0.5%'),
                                    letterSpacing: 1,
                                }}>
                                John Doe Logan
                            </Text>
                        </View>
                    </LinearGradient>
                    <ScrollView
                        style={{backgroundColor: '#fff', width: wp('100%'), height: hp('70%')}}>
                        <View
                            style={{
                                marginBottom: hp('3.0%'),
                                width: wp('100%'),
                                alignItems: 'center',
                            }}>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('CreateClub');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="shield-plus-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        New Club
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('CreateSponsor');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="account-group-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        New Sponsor
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('CreateVenue');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="alpha-f-circle-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        New Facility
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('JoinRequest');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="shield-link-variant-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        Join Request
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('AddNews');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="newspaper"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        Add News
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('Following');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="heart-multiple-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        My Favourites
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('ScoreEntry');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="plus-circle-outline"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        Score Entry
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.props.navigation.navigate('SetupLeague');
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        borderBottomColor: '#eee',
                                        borderBottomWidth: 1,
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="crystal-ball"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        New League
                                    </Text>
                                </View>
                            </TouchableHighlight>
                            <TouchableHighlight
                                underlayColor="#19cea5"
                                activeOpacity={1.0}
                                onPress={() => {
                                    this.logout();
                                }}>
                                <View
                                    style={{
                                        paddingHorizontal: wp('3.0%'),
                                        paddingVertical: hp('2.0%'),
                                        flexDirection: 'row',
                                        justifyContent: 'flex-start',
                                        alignItems: 'center',
                                    }}>
                                    <View
                                        style={{
                                            width: wp('20.0%'),
                                            justifyContent: 'center',
                                            alignItems: 'center',
                                        }}>
                                        <Icon
                                            name="logout"
                                            type="material-community"
                                            color="#888"
                                            size={hp('3.0%')}
                                        />
                                    </View>
                                    <Text
                                        style={{
                                            width: wp('80.0%'),
                                            textAlign: 'left',
                                            paddingHorizontal: wp('3.0%'),
                                            fontWeight: 'bold',
                                            color: '#888',
                                            fontSize: hp('2.0%'),
                                            letterSpacing: 2,
                                        }}>
                                        Log Out
                                    </Text>
                                </View>
                            </TouchableHighlight>
                        </View>
                    </ScrollView>
                </View>
                <TouchableOpacity
                    style={{
                        width: wp('0%'),
                        height: hp('100%'),
                        backgroundColor: 'transparent',
                        opacity: 1.0,
                    }}
                    onPress={() => {
                        this.props.navigation.goBack();
                    }}
                />
            </View>
        );
    }
}
const mapStateToProps = state => {
    return {};
};
const mapDispatchToProps = {
    signout: signOutRequest,
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(BurgerMenu);
