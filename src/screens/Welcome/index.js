import React from 'react';
import {StatusBar, View, TouchableOpacity, Text, Image} from 'react-native';
import {Icon} from 'react-native-elements';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import LinearGradient from 'react-native-linear-gradient';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

// assets
import images from '../../constants/images';

class WelcomeScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            activeSlide: 0,
        };
    }

    sliders = [
        {
            image: images.slide1Png,
            text:
                'Below is an interactive demo that lets you explore the visual results of the different settings.',
        },
        {
            image: images.slide2Png,
            text:
                'Some columns have multiple widths defined, causing the layout to change at the defined breakpoint.',
        },
        {
            image: images.slide3Png,
            text:
                'There is one limitation with the negative margin we use to implement the spacing between items.',
        },
    ];

    renderItem = ({item}) => {
        return (
            <View>
                <Image
                    source={item.image}
                    style={{
                        width: wp('90%'),
                        height: hp('50%'),
                        marginVertical: hp('5.0%'),
                        resizeMode: 'contain',
                    }}
                />
                <Text
                    style={{
                        height: hp('15%'),
                        fontSize: hp('1.75%'),
                        color: '#444',
                        textAlign: 'center',
                    }}>
                    {item.text}
                </Text>
            </View>
        );
    };

    Pagination = () => {
        const {activeSlide} = this.state;
        return (
            <Pagination
                dotsLength={3}
                activeDotIndex={activeSlide}
                dotStyle={{
                    backgroundColor: '#804ac5',
                }}
                inactiveDotOpacity={0.2}
                inactiveDotScale={1.0}
            />
        );
    };

    gotoNextSlide = () => {
        this.setState({activeSlide: this.state.activeSlide + 1});
    };

    render() {
        const {Pagination, sliders} = this;
        const {activeSlide} = this.state;
        return (
            <View
                style={{
                    flex: 1,
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
                        flexDirection: 'row',
                        justifyContent: 'flex-end',
                        alignItems: 'center',
                        width: wp('90%'),
                        height: hp('5.0%'),
                    }}>
                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('SigninScreen')}>
                        <Text
                            style={{
                                paddingHorizontal: wp('2.0%'),
                                paddingVertical: hp('1.0%'),
                                fontSize: hp('2.25%'),
                                color: '#804ac5',
                                letterSpacing: 1,
                            }}>
                            SKIP
                        </Text>
                    </TouchableOpacity>
                </View>
                <View
                    style={{
                        alignItems: 'center',
                        height: hp('90.0%'),
                    }}>
                    <Carousel
                        ref={'slider'}
                        data={sliders}
                        renderItem={this.renderItem}
                        sliderWidth={wp('90%')}
                        itemWidth={wp('90%')}
                        onSnapToItem={slideIndex => this.setState({activeSlide: slideIndex})}
                    />
                    {activeSlide == 2 ? (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: wp('100%'),
                                height: hp('15.0%'),
                            }}>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SignupScreen')}>
                                <Text
                                    style={{
                                        width: wp('50%'),
                                        paddingVertical: hp('1.5%'),
                                        fontSize: hp('2.5%'),
                                        color: '#804ac5',
                                        textAlign: 'center',
                                    }}>
                                    Signup
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                onPress={() => this.props.navigation.navigate('SigninScreen')}>
                                <LinearGradient
                                    colors={['#804ac5', '#eb9edf']}
                                    start={{
                                        x: 0.0,
                                        y: 0.0,
                                    }}
                                    end={{
                                        x: 1.0,
                                        y: 1.0,
                                    }}
                                    style={{
                                        justifyContent: 'center',
                                        alignItems: 'center',
                                        width: wp('50%'),
                                        height: hp('6.0%'),
                                        backgroundColor: '#804ac5',
                                        borderTopLeftRadius: hp('3.0%'),
                                        borderBottomLeftRadius: hp('3.0%'),
                                    }}>
                                    <Text
                                        style={{
                                            fontSize: hp('2.5%'),
                                            color: '#fff',
                                        }}>
                                        Login
                                    </Text>
                                </LinearGradient>
                            </TouchableOpacity>
                        </View>
                    ) : (
                        <View
                            style={{
                                flexDirection: 'row',
                                justifyContent: 'space-between',
                                alignItems: 'center',
                                width: wp('90%'),
                                height: hp('15.0%'),
                            }}>
                            <Pagination />
                            <TouchableOpacity onPress={() => this.refs.slider.snapToNext()}>
                                <Icon
                                    name="right"
                                    containerStyle={{
                                        padding: hp('1.0%'),
                                        borderWidth: 1,
                                        borderColor: '#ccc',
                                        borderRadius: hp('2.5%') + 1,
                                    }}
                                    type="antdesign"
                                    color="#804ac5"
                                    size={hp('3.0%')}
                                />
                            </TouchableOpacity>
                        </View>
                    )}
                </View>
            </View>
        );
    }
}

export default WelcomeScreen;
