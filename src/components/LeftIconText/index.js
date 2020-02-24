import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const LeftIconText = props => {
    const {text, iconName, iconType = 'simple-line-icon', iconColor, onPress} = props;

    return (
        <TouchableOpacity
            style={{
                flexDirection: 'row',
                alignItems: 'center',
                marginHorizontal: wp('3.0%'),
            }}
            onPress={onPress}>
            <Icon name={iconName} type={iconType} color={iconColor} size={hp('2.0%')} />
            <Text
                style={{
                    paddingHorizontal: wp('2.0%'),
                    color: '#aaa',
                    fontSize: hp('2.0%'),
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default LeftIconText;
