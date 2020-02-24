import React from 'react';
import {TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const CheckBox = props => {
    const {
        checked,
        iconColor = '#27ae60',
        text,
        fontSize = hp('2.0%'),
        onPress,
        width = wp('90%'),
    } = props;

    return (
        <TouchableOpacity
            style={{
                width: width,
                flexDirection: 'row',
                alignItems: 'center',
            }}
            onPress={onPress}>
            <Icon
                name={checked ? 'check-circle-outline' : 'checkbox-blank-circle-outline'}
                type="material-community"
                color={iconColor}
                size={hp('3.0%')}
            />
            <Text
                style={{
                    marginLeft: wp('2.0%'),
                    color: '#444',
                    fontSize: fontSize,
                }}>
                {text}
            </Text>
        </TouchableOpacity>
    );
};

export default CheckBox;
