import React from 'react';
import PropTypes from 'prop-types';
import FastImage from 'react-native-fast-image';
import {NavigationEvents} from 'react-navigation';

import {StatusBar, View, TouchableOpacity, Text, Image} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import TopMenu from '../../components/TopMenu';
import BottomTabsMenu from '../../components/BottomTabsMenu';
import LeftIconButton from '../../components/LeftIconButton';
import LeftIconText from '../../components/LeftIconText';

import images from '../../constants/images';
import {STORE_API} from '../../service/cricketApi';

class PlayerProfileScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        navigate: PropTypes.func.isRequired,
        currentUser: PropTypes.object,
        UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        fetchPlayer: PropTypes.func.isRequired,
        player: PropTypes.object,
    };
    constructor(props) {
        super(props);
        const {navigation} = props;

        this.state = {
            playerId: navigation.dangerouslyGetParent().getParam('id', null),
        };
    }
    componentDidMount = () => {
        /*  console.warn('componentDidMount', 'componentDidMount');
        const {navigation, fetchPlayer} = this.props;
        const playerId = navigation.dangerouslyGetParent().getParam('id', null);
        fetchPlayer(playerId); */
    };
    fetchPlayerData = () => {
        const {navigation, fetchPlayer} = this.props;
        const playerId = navigation.dangerouslyGetParent().getParam('id', null);
        fetchPlayer(playerId);
    };
    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    render() {
        const {navigate, player} = this.props;
        const {playerProfile} = player;
        return (
            <View
                style={{
                    backgroundColor: '#f6f8fa',
                    alignItems: 'center',
                }}>
                <NavigationEvents
                    onWillFocus={payload => {
                        this.fetchPlayerData();
                    }}
                    onDidFocus={payload => console.log('did focus', payload)}
                    onWillBlur={payload => console.log('will blur', payload)}
                    onDidBlur={payload => console.log('did blur', payload)}
                />
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

                    {player.profile && (
                        <FastImage
                            style={{
                                top: hp('8.0%'),
                                width: hp('20%'),
                                height: hp('20%'),
                                position: 'absolute',
                                borderRadius: hp('10%'),
                            }}
                            source={{
                                uri: STORE_API + player.profile,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.cover}
                        />
                    )}
                </LinearGradient>
                {playerProfile && (
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
                            {player.name && player.name}
                        </Text>
                        <Text
                            style={{
                                marginVertical: hp('0.5%'),
                                color: '#aaa',
                                fontSize: hp('2.0%'),
                                letterSpacing: 1,
                            }}>
                            {playerProfile.playerRole && playerProfile.playerRole}
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: wp('90%'),
                                paddingVertical: hp('0.5%'),
                            }}>
                            <LeftIconText text="2109" iconName="heart" iconColor="#f14135" />
                            <LeftIconText text="920" iconName="like" iconColor="#2d9af9" />
                            <LeftIconText text="899" iconName="paper-plane" iconColor="#77b56c" />
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
                                    score={
                                        playerProfile.bowlingProfile &&
                                        playerProfile.bowlingProfile.matches_played
                                            ? playerProfile.bowlingProfile.matches_played
                                            : 0
                                    }
                                    title="Matches"
                                    iconColor="#f14135"
                                />
                                <ScoreRecord
                                    score={
                                        playerProfile.bowlingProfile &&
                                        playerProfile.bowlingProfile.runs
                                            ? playerProfile.bowlingProfile.runs
                                            : 0
                                    }
                                    title="Runs"
                                    iconColor="#2d9af9"
                                    center={true}
                                />
                                <ScoreRecord
                                    score={
                                        playerProfile.bowlingProfile &&
                                        playerProfile.bowlingProfile.wickets
                                            ? playerProfile.bowlingProfile.wickets
                                            : 0
                                    }
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
                                onPress={() => {}}
                            />
                            <LeftIconButton
                                title="LEAGUES"
                                iconName="cricket"
                                onPress={navigate('LeagueOverview')}
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
                                onPress={() => this.props.navigation.navigate('TeamProfile')}
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

export default PlayerProfileScreen;
