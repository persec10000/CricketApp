import React from 'react';
import {ScrollView, View, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// components
import TopMenu from '../../components/TopMenu';
import BottomTabsMenu from '../../components/BottomTabsMenu';

// assets
import images from '../../constants/images';

class NewsDetailsScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedBottomTab: 'NewsDetails',
        };
    }

    onSelectBottomTab = value => {
        this.setState({selectedBottomTab: value});
    };

    render() {
        return (
            <View
                style={{
                    alignItems: 'center',
                    backgroundColor: '#f6f8fa',
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
                        height: hp('10%'),
                    }}>
                    <TopMenu navigation={this.props.navigation} leftMenu={false} title="NEWS" />
                </LinearGradient>
                <ScrollView
                    style={{
                        width: wp('100%'),
                        height: hp('80%'),
                    }}>
                    <View
                        style={{
                            alignItems: 'center',
                            marginVertical: hp('1.0%'),
                        }}>
                        <Image
                            source={images.teamProfileNewsJpg}
                            style={{
                                width: wp('96%'),
                                height: wp('56%'),
                                resizeMode: 'cover',
                            }}
                        />
                        <Text
                            style={{
                                width: wp('90%'),
                                marginVertical: hp('0.5%'),
                                fontSize: hp('3.0%'),
                                fontWeight: 'bold',
                                color: '#444',
                                textAlign: 'center',
                            }}>
                            ICC Cricket World Cup 2019:
                        </Text>
                        <Text
                            style={{
                                width: wp('94%'),
                                fontSize: hp('2.75%'),
                                fontWeight: 'bold',
                                color: '#444',
                                textAlign: 'center',
                            }}>
                            Ravi Shastri speaks about India
                        </Text>
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: wp('90%'),
                                marginVertical: hp('0.5%'),
                            }}>
                            <Text
                                style={{
                                    fontSize: hp('1.75%'),
                                    color: '#444',
                                }}>
                                10hrs ago, John Doe
                            </Text>
                            <View
                                style={{
                                    flexDirection: 'row',
                                }}>
                                <Icon
                                    name="heart"
                                    type="material-community"
                                    color="#eb4654"
                                    size={hp('2.0%')}
                                />
                                <Text
                                    style={{
                                        marginHorizontal: wp('2.0%'),
                                        fontSize: hp('1.75%'),
                                        color: '#666',
                                    }}>
                                    152
                                </Text>
                                <Icon
                                    name="share-variant"
                                    type="material-community"
                                    color="#444"
                                    size={hp('2.0%')}
                                />
                            </View>
                        </View>
                        <Text
                            style={{
                                width: wp('94%'),
                                fontSize: hp('2.0%'),
                                lineHeight: hp('3.0%'),
                                color: '#444',
                            }}>
                            Hi, I am a Full-Time, professional developer have specialized in
                            developing iOS/Android cross-platform mobile apps with Web
                            services(back-end/REST API), and can build your iOS/Android mobile apps
                            with React Native successfully.
                            {'\n'}React Native is the best solution for developing iOS/Android
                            cross-platform native mobile apps with flexible UI.
                            {'\n'}I specialize in React Native with Redux/Recompose/Axios, Apollo
                            Client/GraphQL, JSX, ES6, Node.js, Firebase Auth/Storage/Firestore, AWS
                            Cognito/S3/DynamoDB, PHP/MySQL/Laravel, MongoDB, Express.js/Mongoose,
                            REST API.
                            {'\n'}You can check my high skill at
                            https://play.google.com/store/apps/details?id=com.sws.tuurnt&hl=en_US,
                            https://itunes.apple.com/us/app/tuurnt-nearby-party-events/id1052603038?mt=8
                            and tuurnt.com.
                            {'\n'}My skills and experience meet your demand.
                            {'\n'}I will provide you High Quality work and hope Long-Term with you.
                        </Text>
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

export default NewsDetailsScreen;
