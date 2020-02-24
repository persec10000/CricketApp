import React from 'react';
import {StatusBar, View, TouchableOpacity, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {connect} from 'react-redux';

// components
import TopMenu from '../../components/TopMenu';
import BottomTabsMenu from '../../components/BottomTabsMenu';
import LeftIconButton from '../../components/LeftIconButton';
import LeftIconText from '../../components/LeftIconText';

// assets
import images from '../../constants/images';

// reducers
import {setAccount} from '../../modules/account/actions';

import API from '../../service/API';

class MyProfileScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount = () => {};

    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#f6f8fa',
                    alignItems: 'center',
                }}>
                <StatusBar barStyle="light-content" />
                <LinearGradient
                    colors={['#eb9edf', '#7a85de']}
                    start={{x: 0.0, y: 0.0}}
                    end={{x: 1.0, y: 1.0}}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: wp('100%'),
                        height: hp('25%'),
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            height: hp('15.0%'),
                        }}>
                        <TopMenu navigation={this.props.navigation} />
                    </View>
                    <View
                        style={{
                            width: wp('100%'),
                            height: hp('0.0%'),
                            backgroundColor: 'transparent',
                            borderLeftWidth: wp('50%'),
                            borderRightWidth: wp('50%'),
                            borderTopWidth: hp('10.0%'),
                            borderLeftColor: '#f6f8fa',
                            borderRightColor: '#f6f8fa',
                            borderTopColor: 'transparent',
                        }}
                    />
                    <TouchableOpacity
                        activeOpacity={0.5}
                        style={{
                            top: hp('8.0%'),
                            position: 'absolute',
                        }}>
                        <Image
                            source={
                                this.props.account.photo == null
                                    ? images.profilePersonJpg
                                    : this.props.account.photo
                            }
                            style={{
                                width: hp('20%'),
                                height: hp('20%'),
                                borderRadius: hp('10%'),
                            }}
                        />
                    </TouchableOpacity>
                </LinearGradient>
                {this.props.account.profile.id !== null ? (
                    <View
                        style={{
                            marginVertical: hp('4.0%'),
                            paddingHorizontal: wp('3.0%'),
                            height: hp('57%'),
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                marginVertical: hp('0.5%'),
                                fontWeight: 'bold',
                                color: '#666',
                                fontSize: hp('2.5%'),
                                letterSpacing: 1,
                            }}>
                            {this.props.account.firstname}&nbsp;{this.props.account.lastname}
                        </Text>
                        <Text
                            style={{
                                marginVertical: hp('0.5%'),
                                color: '#aaa',
                                fontSize: hp('2.0%'),
                                letterSpacing: 1,
                            }}>
                            {this.props.account.profile.team.name}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: wp('90%'),
                                paddingVertical: hp('0.5%'),
                            }}>
                            <LeftIconText
                                text={this.props.account.hearts}
                                iconName="heart"
                                iconColor="#f14135"
                            />
                            <LeftIconText
                                text={this.props.account.likes}
                                iconName="like"
                                iconColor="#2d9af9"
                            />
                            <LeftIconText
                                text={this.props.account.messages}
                                iconName="paper-plane"
                                iconColor="#77b56c"
                            />
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                marginVertical: hp('2.0%'),
                                backgroundColor: '#fff',
                                borderRadius: 20,
                            }}>
                            <View
                                style={{
                                    paddingHorizontal: wp('2.0%'),
                                    paddingVertical: hp('2.0%'),
                                    width: wp('94%'),
                                    flexDirection: 'row',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}>
                                <ScoreRecord
                                    score={this.props.account.matches}
                                    title="Matches"
                                    iconColor="#f14135"
                                />
                                <ScoreRecord
                                    score={this.props.account.runs}
                                    title="Runs"
                                    iconColor="#2d9af9"
                                    center={true}
                                />
                                <ScoreRecord
                                    score={this.props.account.wickets}
                                    title="Wickets"
                                    iconColor="#77b56c"
                                />
                            </View>
                            <TouchableOpacity>
                                <Icon
                                    name="arrow-down-bold-hexagon-outline"
                                    type="material-community"
                                    color="#22d498"
                                    size={hp('5.0%')}
                                />
                            </TouchableOpacity>
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: wp('94%'),
                                marginVertical: hp('1.0%'),
                            }}>
                            <LeftIconButton
                                title="STATISTICS"
                                iconName="chart-line"
                                onPress={() =>
                                    this.props.navigation.navigate('PlayerStatisticsScreen')
                                }
                            />
                            <LeftIconButton
                                title="LEAGUES"
                                iconName="cricket"
                                onPress={() =>
                                    this.props.navigation.navigate('LeagueOverviewScreen')
                                }
                            />
                        </View>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: wp('94%'),
                                marginVertical: hp('1.0%'),
                            }}>
                            <LeftIconButton
                                title="MY TEAM"
                                iconName="shield-check-outline"
                                onPress={() => this.props.navigation.navigate('TeamProfileScreen')}
                            />
                            <LeftIconButton
                                title="SETTINGS"
                                iconName="settings-outline"
                                onPress={() =>
                                    this.props.navigation.navigate('PlayerSettingsScreen')
                                }
                            />
                        </View>
                    </View>
                ) : (
                    <View
                        style={{
                            marginVertical: hp('4.0%'),
                            paddingHorizontal: wp('3.0%'),
                            height: hp('57%'),
                            alignItems: 'center',
                        }}>
                        <Text
                            style={{
                                marginVertical: hp('0.5%'),
                                fontWeight: 'bold',
                                color: '#666',
                                fontSize: hp('2.5%'),
                                letterSpacing: 1,
                            }}>
                            {this.props.account.name}&nbsp;{this.props.account.surname}
                        </Text>
                        <TouchableOpacity
                            activeOpacity={0.5}
                            style={{
                                marginVertical: hp('2.0%'),
                            }}
                            onPress={() => this.props.navigation.navigate('JoinRequest')}>
                            <Text
                                style={{
                                    width: wp('80%'),
                                    paddingVertical: hp('1.0%'),
                                    fontSize: hp('2.25%'),
                                    color: '#fff',
                                    backgroundColor: '#22d498',
                                    borderRadius: 5,
                                    textAlign: 'center',
                                }}>
                                Join a Team
                            </Text>
                        </TouchableOpacity>
                    </View>
                )}
                <BottomTabsMenu
                    navigation={this.props.navigation}
                    selectedTab="PlayerProfile"
                    onSelectTab={value => this.onSelectBottomTab(value)}
                />
            </View>
        );
    }
}

const ScoreRecord = props => {
    const {score, title, iconColor = '#27cfe9', center = false} = props;

    return (
        <View
            style={
                center
                    ? {
                          paddingHorizontal: wp('4.0%'),
                          paddingVertical: wp('2.0%'),
                          marginHorizontal: wp('4.0%'),
                          borderLeftColor: '#ccc',
                          borderRightColor: '#ccc',
                          borderLeftWidth: 1,
                          borderRightWidth: 1,
                          alignItems: 'center',
                      }
                    : {
                          alignItems: 'center',
                      }
            }>
            <View
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                }}>
                <Icon name="circle-o" type="font-awesome" color={iconColor} size={hp('2.0%')} />
                <Text
                    style={{
                        fontSize: hp('3.5%'),
                        paddingLeft: wp('2.0%'),
                        fontWeight: 'bold',
                        color: '#444',
                    }}>
                    {score}
                </Text>
            </View>
            <Text
                style={{
                    color: '#888',
                    fontSize: hp('1.75%'),
                    letterSpacing: 1,
                }}>
                {title}
            </Text>
        </View>
    );
};

const mapStateToProps = state => {
    return {
        // account: state.account,
    };
};

const mapDispatchToProps = dispatch => {
    return {
        setAccount: account => {
            dispatch(setAccount(account));
        },
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps,
)(MyProfileScreen);
