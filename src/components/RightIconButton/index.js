import React from 'react';
import {TouchableOpacity, Text, View} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

const RightIconButton = props => {
    const {title, onPress} = props;

    return (
        <TouchableOpacity onPress={onPress}>
            <View style={styles.container}>
                <View style={styles.leftView} />
                <Text style={styles.title}>{title}</Text>
                <View style={[styles.leftView, styles.rightIconView]}>
                    <Icon
                        name="hand-pointing-right"
                        type="material-community"
                        color="#fff"
                        size={hp('3.0%')}
                    />
                </View>
            </View>
        </TouchableOpacity>
    );
};

export default RightIconButton;
