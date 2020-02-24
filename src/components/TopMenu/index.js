import React from 'react';
import {View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'react-native-elements';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import styles from './styles';

const TopMenu = props => {
    const {navigation, title = '', leftMenu = true} = props;

    return (
        <View style={styles.container}>
            <View style={styles.subView}>
                {leftMenu ? (
                    <TouchableOpacity
                        style={styles.leftIconView}
                        onPress={() => {
                            navigation.openDrawer();
                        }}>
                        <Icon name="sort" type="material" color="#fff" size={hp('3.5%')} />
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        style={styles.leftIconView}
                        onPress={() => {
                            navigation.navigate('TeamProfileNews');
                        }}>
                        <Icon name="arrow-back" type="material" color="#fff" size={hp('3.5%')} />
                    </TouchableOpacity>
                )}
                <Text
                    style={{
                        paddingHorizontal: wp('1.0%'),
                        fontSize: hp('2.25%'),
                        fontWeight: 'bold',
                        color: 'white',
                    }}>
                    {title}
                </Text>
            </View>
            <View style={styles.subView}>
                <TouchableOpacity
                    style={styles.rightIconView}
                    onPress={() => {
                        navigation.navigate('SearchPlayers');
                    }}>
                    <Icon name="search" type="material" color="#fff" size={hp('3.5%')} />
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.rightIconView}
                    onPress={() => {
                        navigation.navigate('NotificationCenter');
                    }}>
                    <Icon
                        name="bell-outline"
                        type="material-community"
                        color="#fff"
                        size={hp('3.5%')}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
};

export default TopMenu;
