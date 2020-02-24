import {StyleSheet} from 'react-native';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

const styles = StyleSheet.create({
    container: {
        width: wp('96%'),
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: hp('0.5%'),
        position: 'absolute',
        top: hp('4.0%'),
    },

    subView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    leftIconView: {
        paddingHorizontal: wp('1.0%'),
        alignItems: 'center',
    },

    rightIconView: {
        paddingHorizontal: wp('1.0%'),
        alignItems: 'center',
    },
});

export default styles;
