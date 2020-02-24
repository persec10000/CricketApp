import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        width: wp('90%'),
        paddingVertical: hp('1.0%'),
        borderRadius: 10,
        backgroundColor: '#27ae60',
    },

    leftView: {
        width: wp('15%'),
    },

    rightIconView: {
        alignItems: 'center',
    },

    title: {
        width: wp('60%'),
        fontSize: hp('2.5%'),
        fontWeight: 'bold',
        color: 'white',
        textAlign: 'center',
    },
});

export default styles;
