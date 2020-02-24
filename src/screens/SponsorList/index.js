import React from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';

// components
import TopMenu from '../../components/TopMenu';
import BottomTabsMenu from '../../components/BottomTabsMenu';

// assets
import images from '../../constants/images';

const sponsorList = [
    {
        key: '1',
        name: 'Tata Sky Limited',
        team: 'Kolkata',
        sponsorings: 20,
        image: require('../../assets/images/CSK.png'),
        expanded: false,
    },
    {
        key: '2',
        name: 'Suzuki India Pvt.Ltd',
        team: 'Hyderabad',
        sponsorings: 10,
        image: require('../../assets/images/KXIP.png'),
        expanded: false,
    },
    {
        key: '3',
        name: 'Honda Sports Limited',
        team: 'Hyderabo',
        sponsorings: 5,
        image: require('../../assets/images/KKR.png'),
        expanded: false,
    },
];

class SponsorListScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBottomTab: 'Following',
            sponsorList: sponsorList,
        };
    }

    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    onExpanded = key => {
        sponsorList[key].expanded = !sponsorList[key].expanded;
        this.forceUpdate();
    };

    render() {
        return (
            <View
                style={{
                    backgroundColor: '#f6f8fa',
                    alignItems: 'center',
                }}>
                <LinearGradient
                    colors={['#eb9edf', '#7a85de']}
                    start={{
                        x: 0.0,
                        y: 0.0,
                    }}
                    end={{
                        x: 1.0,
                        y: 1.0,
                    }}
                    style={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        width: wp('100%'),
                        height: hp('15%'),
                    }}>
                    <TopMenu navigation={this.props.navigation} title="SPONSOR" />
                    <View style={{height: hp('8.0%')}} />
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('CreateSponsor')}
                        style={{
                            marginHorizontal: wp('3.0%'),
                            marginVertical: hp('0.5%'),
                            alignSelf: 'flex-end',
                            width: hp('5.0%'),
                            height: hp('5.0%'),
                            justifyContent: 'center',
                            alignItems: 'center',
                            borderRadius: hp('2.5%'),
                        }}>
                        <Icon name="plus" type="octicon" color="#fff" size={hp('5.0%')} />
                    </TouchableOpacity>
                </LinearGradient>
                <ScrollView
                    style={{width: wp('100%'), paddingHorizontal: wp('2.0%'), height: hp('75%')}}>
                    <View style={{paddingVertical: hp('2.0%'), paddingHorizontal: wp('1.0%')}}>
                        {this.state.sponsorList.map((item, key) => {
                            return (
                                <View
                                    key={key}
                                    style={{
                                        marginBottom: hp('2.0%'),
                                        width: wp('94%'),
                                        alignItems: 'center',
                                        backgroundColor: '#fff',
                                        borderRadius: 10,
                                    }}>
                                    <View
                                        style={{
                                            flexDirection: 'row',
                                            justifyContent: 'space-between',
                                            alignItems: 'center',
                                            paddingVertical: hp('1.0%'),
                                            paddingHorizontal: wp('2.0%'),
                                            width: wp('94%'),
                                        }}>
                                        <TouchableOpacity
                                            style={{
                                                width: wp('20%'),
                                                height: wp('15%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                                alignSelf: 'center',
                                            }}
                                            onPress={() =>
                                                this.props.navigation.navigate('TeamProfile')
                                            }>
                                            <Image
                                                source={item.image}
                                                style={{
                                                    width: wp('12%'),
                                                    height: wp('12%'),
                                                    resizeMode: 'contain',
                                                }}
                                            />
                                        </TouchableOpacity>
                                        <View
                                            style={{
                                                paddingHorizontal: wp('2.0%'),
                                                width: wp('60%'),
                                                justifyContent: 'flex-start',
                                                alignItems: 'flex-start',
                                            }}>
                                            <TouchableOpacity
                                                onPress={() =>
                                                    this.props.navigation.navigate('TeamProfile')
                                                }>
                                                <Text
                                                    style={{
                                                        fontSize: hp('2.0%'),
                                                        fontWeight: 'bold',
                                                        color: '#444',
                                                    }}>
                                                    {item.name}
                                                </Text>
                                            </TouchableOpacity>
                                            <Text style={{fontSize: hp('1.5%'), color: '#888'}}>
                                                {item.team}
                                            </Text>
                                            <Text style={{fontSize: hp('1.5%'), color: '#888'}}>
                                                {item.sponsorings} Sponsorings
                                            </Text>
                                        </View>
                                        <TouchableOpacity
                                            onPress={() => this.onExpanded(key)}
                                            style={{
                                                alignSelf: 'center',
                                                width: wp('10%'),
                                                justifyContent: 'center',
                                                alignItems: 'center',
                                            }}>
                                            <Icon
                                                name={item.expanded ? 'down' : 'right'}
                                                type="antdesign"
                                                color="#ccc"
                                                size={hp('2.0%')}
                                            />
                                        </TouchableOpacity>
                                    </View>
                                    {item.expanded ? (
                                        <View
                                            style={{
                                                width: wp('60%'),
                                                paddingVertical: hp('1.0%'),
                                                flexDirection: 'row',
                                                justifyContent: 'flex-end',
                                                alignItems: 'center',
                                            }}>
                                            <Text
                                                style={{
                                                    marginHorizontal: wp('2.0%'),
                                                    paddingHorizontal: wp('4.0%'),
                                                    color: '#fff',
                                                    backgroundColor: '#de1775',
                                                    borderRadius: 20,
                                                    paddingVertical: hp('0.25%'),
                                                }}>
                                                Edit
                                            </Text>
                                            <Text
                                                style={{
                                                    marginHorizontal: wp('2.0%'),
                                                    paddingHorizontal: wp('4.0%'),
                                                    color: '#fff',
                                                    backgroundColor: '#57a42a',
                                                    borderRadius: 20,
                                                    paddingVertical: hp('0.25%'),
                                                }}>
                                                View
                                            </Text>
                                        </View>
                                    ) : null}
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

export default SponsorListScreen;
