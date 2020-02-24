import React from 'react';
import PropTypes from 'prop-types';

import {ScrollView, View, Text, Image, ImageBackground, TouchableOpacity} from 'react-native';
import {Icon} from 'react-native-elements';
import Swiper from 'react-native-swiper';
import FastImage from 'react-native-fast-image';

import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import TopMenu from '../../components/TopMenu';
import BottomTabsMenu from '../../components/BottomTabsMenu';
import MatchesSlide from '../../components/MatchesSlide';

// assets
import images from '../../constants/images';

import API from '../../service/API';
import {STORE_API} from '../../service/cricketApi';

const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};
class HomeScreen extends React.Component {
    static propTypes = {
        navigation: PropTypes.object.isRequired,
        currentUser: PropTypes.object,
        UserId: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        topLeaders: PropTypes.array.isRequired,
        topClubs: PropTypes.array.isRequired,
        recentMatches: PropTypes.array.isRequired,
        navigate: PropTypes.func.isRequired,
    };
    constructor(props) {
        super(props);
        this.state = {
            slider: [
                {
                    title: 'New League Starting soon...',
                    description: 'Kookatpally, Hyderabd, TG India',
                    image: images.homeTopSlider1Jpg,
                },
                {
                    title: 'New League Starting soon...',
                    description: 'Kookatpally, Hyderabd, TG India',
                    image: images.homeTopSlider2Jpg,
                },
                {
                    title: 'New League Starting soon...',
                    description: 'Kookatpally, Hyderabd, TG India',
                    image: images.homeTopSlider3Jpg,
                },
                {
                    title: 'New League Starting soon...',
                    description: 'Kookatpally, Hyderabd, TG India',
                    image: images.homeTopSlider4Jpg,
                },
                {
                    title: 'New League Starting soon...',
                    description: 'Kookatpally, Hyderabd, TG India',
                    image: images.homeTopSlider5Jpg,
                },
            ],
            leaders: [
                {
                    title: 'Best Bowling Figures',
                    color: '#132c69',
                    players: [
                        {
                            firstname: 'Alzari',
                            lastname: 'Joseph',
                            score: '369',
                            image: images.searchPlayersPlayerJpg,
                        },
                    ],
                },
                {
                    title: 'Fairplay Awards',
                    color: '#01948f',
                    players: [
                        {
                            firstname: 'Alzari',
                            lastname: 'Joseph',
                            score: '6/12',
                            image: images.searchPlayersPlayerJpg,
                        },
                    ],
                },
                {
                    title: 'Highest Score',
                    color: '#132c69',
                    players: [
                        {
                            firstname: 'Alzari',
                            lastname: 'Joseph',
                            score: '114',
                            image: images.searchPlayersPlayerJpg,
                        },
                    ],
                },
                {
                    title: 'Most Valuable Player',
                    color: '#d72140',
                    players: [
                        {
                            firstname: 'Alzari',
                            lastname: 'Joseph',
                            score: '360',
                            image: images.searchPlayersPlayerJpg,
                        },
                    ],
                },
            ],
            news: [
                {
                    title: 'Best Bowling Figures',
                    author: 'Joseph',
                    time: '2 min ago',
                    number: '146,2558',
                    image: images.teamProfileNewsJpg,
                },
                {
                    title: 'Best Bowling Figures',
                    author: 'Joseph',
                    time: '2 min ago',
                    number: '146,2558',
                    image: images.teamProfileNewsJpg,
                },
                {
                    title: 'Best Bowling Figures',
                    author: 'Joseph',
                    time: '2 min ago',
                    number: '146,2558',
                    image: images.teamProfileNewsJpg,
                },
            ],
            teams: [
                {
                    name: 'Best Bowling Figures',
                    image: require('../../assets/images/CSK.png'),
                    stadium: 'Kolkata Garden',
                    color: '#01948f',
                },
                {
                    name: 'Best Bowling Figures',
                    image: require('../../assets/images/DD.png'),
                    stadium: 'Kolkata Garden',
                    color: '#132c69',
                },
                {
                    name: 'Best Bowling Figures',
                    image: require('../../assets/images/SRH.png'),
                    stadium: 'Kolkata Garden',
                    color: '#d72140',
                },
                {
                    name: 'Best Bowling Figures',
                    image: require('../../assets/images/KKR.png'),
                    stadium: 'Kolkata Garden',
                    color: '#132c69',
                },
            ],
        };
    }

    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    onSelectMatch = () => {
        this.props.navigation.navigate('MatchCenterScoreCard');
    };

    renderLeaders(leaders) {
        const {navigate} = this.props;
        if (leaders.length !== 0) {
            return leaders.map((leader, key) => {
                return (
                    <View
                        key={key}
                        style={{
                            marginHorizontal: wp('1.0%'),
                            alignItems: 'center',
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 5,
                        }}>
                        <View
                            style={{
                                alignItems: 'center',
                                width: hp('15%'),
                                paddingHorizontal: wp('2.0%'),
                                paddingVertical: hp('0.25%'),
                                // backgroundColor: '#132c69',
                                backgroundColor: getRandomColor(),
                                borderTopLeftRadius: 5,
                                borderTopRightRadius: 5,
                            }}>
                            <TouchableOpacity
                                onPress={navigate('PlayerProfile', {id: leader.player_id})}>
                                <FastImage
                                    style={{
                                        width: hp('8.0%'),
                                        height: hp('8.0%'),
                                        marginVertical: hp('0.75%'),
                                        borderRadius: hp('8.0%'),
                                        resizeMode: 'cover',
                                    }}
                                    source={{
                                        uri: STORE_API + leader.profile,
                                        priority: FastImage.priority.normal,
                                    }}
                                    resizeMode={FastImage.resizeMode.cover}
                                />
                                {/* <Image
                                    source={leader.players[0].image}
                                    style={{
                                        width: hp('8.0%'),
                                        height: hp('8.0%'),
                                        marginVertical: hp('0.75%'),
                                        borderRadius: hp('8.0%'),
                                        resizeMode: 'cover',
                                    }}
                                /> */}
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: hp('1.25%'),
                                    color: '#fff',
                                }}>
                                {leader.account}
                            </Text>
                        </View>
                        <View
                            style={{
                                alignItems: 'center',
                                paddingVertical: hp('0.5%'),
                            }}>
                            <Text
                                style={{
                                    fontSize: hp('1.25%'),
                                    color: '#444',
                                }}>
                                {leader.name}
                            </Text>
                            {/*  <Text
                                style={{
                                    fontSize: hp('1.75%'),
                                    fontWeight: 'bold',
                                    fontStyle: 'italic',
                                    color: '#444',
                                }}>
                                {leader.players[0].lastname}
                            </Text> */}
                            <Text
                                style={{
                                    fontSize: hp('2.75%'),
                                    fontWeight: 'bold',
                                    color: '#222',
                                }}>
                                {leader.highest_score}
                            </Text>
                            {/* <TouchableOpacity>
                                <Text
                                    style={{
                                        paddingVertical: hp('0.5%'),
                                        fontSize: hp('1.25%'),
                                        fontWeight: 'bold',
                                        color: '#888',
                                    }}>
                                    VIEW TOP 50
                                </Text>
                            </TouchableOpacity> */}
                        </View>
                    </View>
                );
            });
        }
    }

    renderNews(news) {
        if (news.length != 0) {
            return news.map((item, key) => {
                return (
                    <ImageBackground
                        source={item.image}
                        key={key}
                        imageStyle={{
                            borderRadius: 5,
                        }}
                        style={{
                            width: hp('20%'),
                            height: hp('13%'),
                            marginHorizontal: wp('1.5%'),
                        }}>
                        <LinearGradient
                            colors={['transparent', '#000']}
                            start={{
                                x: 0.0,
                                y: 0.5,
                            }}
                            end={{
                                x: 0.0,
                                y: 1.0,
                            }}
                            style={{
                                justifyContent: 'flex-end',
                                alignItems: 'center',
                                width: hp('20%'),
                                height: hp('13%'),
                                paddingHorizontal: wp('2.0%'),
                                paddingVertical: hp('0.5%'),
                                borderRadius: 5,
                            }}>
                            <View
                                style={{
                                    top: hp('4.0%'),
                                    position: 'absolute',
                                    zIndex: -1,
                                }}>
                                <TouchableOpacity
                                    onPress={() => this.props.navigation.navigate('NewsDetails')}>
                                    <Icon
                                        name="playcircleo"
                                        type="antdesign"
                                        color="#fff"
                                        size={hp('4.0%')}
                                    />
                                </TouchableOpacity>
                            </View>
                            <Text
                                style={{
                                    paddingVertical: hp('0.5%'),
                                    fontSize: hp('1.25%'),
                                    color: '#fff',
                                }}>
                                {item.title}
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    width: hp('20%') - wp('4.0%'),
                                }}>
                                <Text
                                    style={{
                                        fontSize: hp('0.75%'),
                                        color: '#fff',
                                    }}>
                                    By {item.author}
                                </Text>
                                <Text
                                    style={{
                                        fontSize: hp('0.75%'),
                                        color: '#fff',
                                    }}>
                                    {item.time}
                                </Text>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                    }}>
                                    <Icon
                                        name="eye"
                                        type="material-community"
                                        color="#fff"
                                        size={hp('0.75%')}
                                    />
                                    <Text
                                        style={{
                                            fontSize: hp('0.75%'),
                                            color: '#fff',
                                        }}>
                                        {item.number}
                                    </Text>
                                </View>
                            </View>
                        </LinearGradient>
                    </ImageBackground>
                );
            });
        }
    }

    renderTeams(teams) {
        if (teams.length != 0) {
            return teams.map((team, key) => {
                return (
                    <View
                        key={key}
                        style={{
                            alignItems: 'center',
                            width: hp('15%'),
                            height: hp('20%'),
                            marginHorizontal: wp('1.0%'),
                            borderWidth: 1,
                            borderColor: '#ddd',
                            borderRadius: 5,
                        }}>
                        <FastImage
                            style={{
                                width: hp('10%'),
                                height: hp('10%'),
                                marginVertical: hp('1.0%'),
                                resizeMode: 'contain',
                            }}
                            source={{
                                uri: STORE_API + team.logo,
                                priority: FastImage.priority.normal,
                            }}
                            resizeMode={FastImage.resizeMode.contain}
                        />
                        {/*   <Image
                            source={team.image}
                            style={{
                                width: hp('10%'),
                                height: hp('10%'),
                                marginVertical: hp('1.0%'),
                                resizeMode: 'contain',
                            }}
                        /> */}
                        <View
                            style={{
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: hp('15%'),
                                height: hp('8.0%'),
                                paddingHorizontal: wp('2.0%'),
                                paddingVertical: hp('0.5%'),
                                backgroundColor: getRandomColor(),
                                borderBottomLeftRadius: 5,
                                borderBottomRightRadius: 5,
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('TeamProfile')}>
                                <Text
                                    style={{
                                        fontSize: hp('1.75%'),
                                        color: '#ccc',
                                        textAlign: 'center',
                                    }}>
                                    {team.name}
                                </Text>
                            </TouchableOpacity>
                            <Text
                                style={{
                                    fontSize: hp('1.25%'),
                                    fontStyle: 'italic',
                                    color: '#fff',
                                }}>
                                {team.stadium}
                            </Text>
                        </View>
                    </View>
                );
            });
        }
    }

    render() {
        const {topLeaders, topClubs, recentMatches} = this.props;
        return (
            <View
                style={{
                    backgroundColor: '#f6f8fa',
                    alignItems: 'center',
                }}>
                <ScrollView
                    contentContainerStyle={{
                        alignItems: 'center',
                    }}>
                    <TopMenu navigation={this.props.navigation} />
                    <Swiper
                        activeDotColor="red"
                        dotColor="white"
                        containerStyle={{
                            width: wp('100%'),
                            height: hp('45%'),
                            zIndex: -1,
                        }}
                        showsButtons={false}
                        loop={true}
                        autoplay={true}
                        autoplayTimeout={5.0}
                        // pagingEnabled={true}
                    >
                        {this.state.slider.map((item, key) => (
                            <ImageBackground
                                key={key}
                                resizeMode={'cover'}
                                source={item.image}
                                style={{}}>
                                <LinearGradient
                                    colors={['transparent', 'rgba(0,0,0,0.6)']}
                                    start={{
                                        x: 0.0,
                                        y: 0.5,
                                    }}
                                    end={{
                                        x: 0.0,
                                        y: 1.0,
                                    }}
                                    style={{
                                        height: hp('45%'),
                                        paddingHorizontal: wp('7.5%'),
                                        paddingVertical: hp('10.0%'),
                                        justifyContent: 'flex-end',
                                        alignItems: 'flex-start',
                                    }}>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            paddingVertical: hp('0.5%'),
                                            fontSize: hp('2.5%'),
                                        }}>
                                        {item.title}
                                    </Text>
                                    <Text
                                        style={{
                                            color: '#fff',
                                            fontSize: hp('2.0%'),
                                        }}>
                                        {item.description}
                                    </Text>
                                </LinearGradient>
                            </ImageBackground>
                        ))}
                    </Swiper>
                </ScrollView>
                <ScrollView
                    style={{
                        height: hp('45%'),
                    }}>
                    <View
                        style={{
                            paddingVertical: hp('1.0%'),
                        }}>
                        <View
                            style={{
                                paddingVertical: hp('0.75%'),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    width: wp('100%'),
                                }}>
                                <Text
                                    style={{
                                        marginHorizontal: wp('5.0%'),
                                        fontSize: hp('2.25%'),
                                        fontWeight: 'bold',
                                        color: '#222',
                                    }}>
                                    Matches
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: wp('5.0%'),
                                            fontSize: hp('1.75%'),
                                            color: '#222',
                                        }}>
                                        See all >
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <MatchesSlide
                                onSelectMatch={() => this.onSelectMatch()}
                                matches={recentMatches}
                            />
                        </View>
                        <View
                            style={{
                                paddingVertical: hp('0.75%'),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    width: wp('100%'),
                                }}>
                                <Text
                                    style={{
                                        marginHorizontal: wp('5.0%'),
                                        fontSize: hp('2.25%'),
                                        fontWeight: 'bold',
                                        color: '#222',
                                    }}>
                                    Leaders
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: wp('5.0%'),
                                            fontSize: hp('1.75%'),
                                            color: '#222',
                                        }}>
                                        See all >
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    paddingVertical: hp('1.0%'),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginHorizontal: wp('2.0%'),
                                    }}>
                                    {topLeaders.length > 0 && this.renderLeaders(topLeaders)}
                                </View>
                            </ScrollView>
                        </View>
                        <View
                            style={{
                                paddingVertical: hp('0.75%'),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    width: wp('100%'),
                                }}>
                                <Text
                                    style={{
                                        marginHorizontal: wp('5.0%'),
                                        fontSize: hp('2.25%'),
                                        fontWeight: 'bold',
                                        color: '#222',
                                    }}>
                                    Teams
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: wp('5.0%'),
                                            fontSize: hp('1.75%'),
                                            color: '#222',
                                        }}>
                                        See all >
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    paddingVertical: hp('1.0%'),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginHorizontal: wp('2.0%'),
                                    }}>
                                    {this.renderTeams(topClubs)}
                                </View>
                            </ScrollView>
                        </View>

                        {/* <View
                            style={{
                                paddingVertical: hp('0.75%'),
                            }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    alignItems: 'baseline',
                                    width: wp('100%'),
                                }}>
                                <Text
                                    style={{
                                        marginHorizontal: wp('5.0%'),
                                        fontSize: hp('2.25%'),
                                        fontWeight: 'bold',
                                        color: '#222',
                                    }}>
                                    News
                                </Text>
                                <TouchableOpacity>
                                    <Text
                                        style={{
                                            marginHorizontal: wp('5.0%'),
                                            fontSize: hp('1.75%'),
                                            color: '#222',
                                        }}>
                                        See all >
                                    </Text>
                                </TouchableOpacity>
                            </View>
                            <ScrollView
                                horizontal={true}
                                showsHorizontalScrollIndicator={false}
                                style={{
                                    paddingVertical: hp('1.0%'),
                                }}>
                                <View
                                    style={{
                                        flexDirection: 'row',
                                        marginHorizontal: wp('1.5%'),
                                    }}>
                                    {this.renderNews(this.state.news)}
                                </View>
                            </ScrollView>
                        </View>
                     */}
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

export default HomeScreen;
