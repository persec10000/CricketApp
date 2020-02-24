import React from 'react';
import {View, TextInput} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

const LeftIconInputBox = props => {
    const {
        value = value,
        iconType = 'material-community',
        iconName,
        iconColor = '#27ae60',
        placeholder,
        secureTextEntry = false,
        keyboardType = 'default',
        autoCapitalize = 'sentences',
        onChangeText,
    } = props;

    return (
        <View style={styles.container}>
            <Icon name={iconName} type={iconType} color={iconColor} size={hp('3.0%')} />
            <TextInput
                value={value}
                style={styles.textInput}
                placeholder={placeholder}
                secureTextEntry={secureTextEntry}
                keyboardType={keyboardType}
                autoCapitalize={autoCapitalize}
                onChangeText={value => onChangeText(value)}
            />
        </View>
    );
};

export default LeftIconInputBox;
