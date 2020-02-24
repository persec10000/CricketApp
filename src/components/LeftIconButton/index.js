import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LeftIconButton = props => {
    const {
        title,
        backgroundColor = '#27cfe9',
        iconName,
        iconType = 'material-community',
        onPress,
    } = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View
                style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: wp('45%'),
                    paddingVertical: hp('1.0%'),
                    borderRadius: 10,
                    backgroundColor: backgroundColor,
                }}>
                <View
                    style={{
                        width: wp('12%'),
                        alignItems: 'center',
                    }}>
                    <Icon name={iconName} type={iconType} color="#fff" size={hp('5.0%')} />
                </View>
                <View
                    style={{
                        width: wp('33%'),
                        alignItems: 'center',
                    }}>
                    <Text
                        style={{
                            fontSize: hp('2.0%'),
                            fontWeight: 'bold',
                            color: '#fff',
                            letterSpacing: 1,
                        }}>
                        {title}
                    </Text>
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default LeftIconButton;
