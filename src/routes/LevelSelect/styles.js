import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    levelsContainer: {
        flex: 1,
        width: Dimensions.get('screen').width,
        alignItems: 'center',
    },
    levelsRow: {
        width: '100%',
        paddingHorizontal: Dimensions.get('screen').width * 0.04,
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: Dimensions.get('screen').height * 0.05,
        marginBottom: Dimensions.get('screen').height * 0.02,
    },
    levelBtn: {
        width: Dimensions.get('screen').height * 0.16,
        height: Dimensions.get('screen').height * 0.16,
        marginHorizontal: Dimensions.get('screen').width * 0.05,
    },
    carouselIndicators: {
        width: '100%',
        alignSelf: 'center',
        marginBottom: Dimensions.get('screen').height * 0.05,
    },
    coinContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinImage: {
        width: 25,
        height: 25,
        marginLeft: 5,
    },
    coinText: {
        fontSize: 20,
        color: Colors.buttonColor,
    },
    toastContainer: {
        width: '100%',
        alignItems: 'center',
    },
    toast: {
        position: 'absolute',
        bottom: 80,
    }
})