import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    screenCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: Dimensions.get('screen').height * 0.2,
    },
    image: {
        width: Dimensions.get('screen').height * 0.4,
        height: Dimensions.get('screen').height * 1.2,
        resizeMode: 'contain',
    },
    toastContainer: {
        width: '100%',
        alignItems: 'center',
    },
    toast: {
        position: 'absolute',
        bottom: 100,
    },
    tipTextContainer: {
        position: 'absolute',
        bottom: 50,
        width: '100%',
        paddingHorizontal: '10%',
        alignItems: 'center',
    },
    tipText: {
        color: Colors.headerTextColor,
        fontSize: 16,
        textAlign: 'center',
    }
})