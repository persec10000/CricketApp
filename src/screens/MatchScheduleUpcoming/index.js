import React from 'react';
import {ScrollView, View, TouchableOpacity, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import MatchScheduleHeader from '../../components/MatchScheduleHeader';
import BottomTabsMenu from '../../components/BottomTabsMenu';
// import layout from '../../themes/layout';
// import styles from './styles';

const matchData = [
    {
        key: '1',
        matchDate: 'MONDAY 28 APRIL 2019',
        matchTime: '15:00',
        matchPhase: 'First stage - Rajiv Gandhi Intl. Cricket Stadium',
        homeTeam: 'CSK',
        homeTeamImage: require('../../assets/images/CSK.png'),
        awayTeam: 'SRH',
        awayTeamImage: require('../../assets/images/SRH.png'),
    },
    {
        key: '2',
        matchDate: 'MONDAY 27 APRIL 2019',
        matchTime: '09:00',
        matchPhase: 'First stage - Group B, Eden Garden, Kolkata',
        homeTeam: 'KXIP',
        homeTeamImage: require('../../assets/images/KXIP.png'),
        awayTeam: 'KKR',
        awayTeamImage: require('../../assets/images/KKR.png'),
    },
    {
        key: '3',
        matchDate: 'MONDAY 27 APRIL 2019',
        matchTime: '15:00',
        matchPhase: 'First stage - M. A. Chidambaram Stadium',
        homeTeam: 'MI',
        homeTeamImage: require('../../assets/images/MI.png'),
        awayTeam: 'CSK',
        awayTeamImage: require('../../assets/images/CSK.png'),
    },
    {
        key: '4',
        matchDate: 'MONDAY 25 APRIL 2019',
        matchTime: '09:00',
        matchPhase: 'First stage - Wankhede Stadium',
        homeTeam: 'KXIP',
        homeTeamImage: require('../../assets/images/KXIP.png'),
        awayTeam: 'MI',
        awayTeamImage: require('../../assets/images/MI.png'),
    },
    {
        key: '5',
        matchDate: 'MONDAY 20 APRIL 2019',
        matchTime: '15:00',
        matchPhase: 'First stage - M. A. Chidambaram Stadium',
        homeTeam: 'CSK',
        homeTeamImage: require('../../assets/images/CSK.png'),
        awayTeam: 'SRH',
        awayTeamImage: require('../../assets/images/SRH.png'),
    },
];

class MatchScheduleUpcomingScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBottomTab: 'MatchSchedule',
        };
    }

    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    render() {
        return (
            <View style={{backgroundColor: '#f5f5f5', alignItems: 'center'}}>
                <MatchScheduleHeader
                    navigation={this.props.navigation}
                    selectedTab="MatchScheduleUpcoming"
                />
                <ScrollView style={{paddingHorizontal: wp('2.0%'), height: hp('75%')}}>
                    <View style={{paddingTop: hp('1.0%'), paddingBottom: hp('2.0%')}}>
                        {matchData.map((item, key) => {
                            return (
                                <View
                                    key={key}
                                    style={{
                                        marginVertical: hp('0.75%'),
                                        width: wp('94%'),
                                        backgroundColor: '#fff',
                                        borderBottomColor: '#ccc',
                                        borderBottomWidth: 1,
                                        borderTopLeftRadius: 5,
                                        borderTopRightRadius: 5,
                                    }}>
                                    <Text
                                        style={{
                                            width: wp('94%'),
                                            textAlign: 'center',
                                            fontWeight: 'bold',
                                            color: '#444',
                                            backgroundColor: '#dedede',
                                            fontSize: hp('2.0%'),
                                            paddingVertical: hp('0.5%'),
                                            borderTopLeftRadius: 5,
                                            borderTopRightRadius: 5,
                                        }}>
                                        {item.matchDate}
                                    </Text>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-around',
                                            alignItems: 'center',
                                        }}>
                                        <View style={{width: wp('10%')}}>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'center',
                                                    alignItems: 'center',
                                                }}>
                                                <Icon
                                                    name="stadium"
                                                    type="material-community"
                                                    color="#aaa"
                                                    size={hp('2.5%')}
                                                />
                                                <Text
                                                    style={{
                                                        textAlign: 'center',
                                                        color: '#888',
                                                        fontSize: hp('1.6%'),
                                                        paddingVertical: hp('0.5%'),
                                                        paddingHorizontal: wp('1.0%'),
                                                    }}>
                                                    {item.matchPhase}
                                                </Text>
                                            </View>
                                            <View
                                                style={{
                                                    flexDirection: 'row',
                                                    justifyContent: 'space-around',
                                                    alignItems: 'flex-end',
                                                    paddingTop: hp('0.0%'),
                                                }}>
                                                <TouchableOpacity
                                                    style={{width: wp('15%'), alignItems: 'center'}}
                                                    onPress={() =>
                                                        this.props.navigation.navigate(
                                                            'TeamProfileOverview',
                                                        )
                                                    }>
                                                    <Image
                                                        source={item.homeTeamImage}
                                                        style={{
                                                            width: hp('5.0%'),
                                                            height: hp('5.0%'),
                                                            resizeMode: 'contain',
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: '#222',
                                                            fontSize: hp('2.0%'),
                                                            paddingVertical: hp('0.2%'),
                                                        }}>
                                                        {item.homeTeam}
                                                    </Text>
                                                </TouchableOpacity>
                                                <View>
                                                    <Text
                                                        style={{
                                                            marginVertical: hp('1.0%'),
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: '#222',
                                                            fontSize: hp('2.0%'),
                                                            paddingHorizontal: wp('5.0%'),
                                                        }}>
                                                        VS
                                                    </Text>
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: '#fff',
                                                            backgroundColor: '#3dc9ec',
                                                            fontSize: hp('1.5%'),
                                                            paddingVertical: hp('0.5%'),
                                                            paddingHorizontal: wp('6.0%'),
                                                            borderTopLeftRadius: 10,
                                                            borderTopRightRadius: 10,
                                                        }}>
                                                        {item.matchTime}
                                                    </Text>
                                                </View>
                                                <TouchableOpacity
                                                    style={{width: wp('15%'), alignItems: 'center'}}
                                                    onPress={() =>
                                                        this.props.navigation.navigate(
                                                            'TeamProfileOverview',
                                                        )
                                                    }>
                                                    <Image
                                                        source={item.awayTeamImage}
                                                        style={{
                                                            width: hp('5.0%'),
                                                            height: hp('5.0%'),
                                                            resizeMode: 'contain',
                                                        }}
                                                    />
                                                    <Text
                                                        style={{
                                                            textAlign: 'center',
                                                            fontWeight: 'bold',
                                                            color: '#222',
                                                            fontSize: hp('2.0%'),
                                                            paddingVertical: hp('0.2%'),
                                                        }}>
                                                        {item.awayTeam}
                                                    </Text>
                                                </TouchableOpacity>
                                            </View>
                                        </View>
                                        <TouchableOpacity style={{width: wp('10%')}}>
                                            <Icon
                                                name="right"
                                                type="antdesign"
                                                color="#ccc"
                                                size={hp('2.0%')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            );
                        })}
                    </View>
                </ScrollView>
                <BottomTabsMenu
                    navigation={this.props.navigation}
                    selectedTab={this.state.selectedBottomTab}
                    onSelectTab={value => this.onSelectBottomTab(value)}
                />
            </View>
        );
    }
}

export default MatchScheduleUpcomingScreen;
