import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Colors.backgroundColor,
    },
    screenCenter: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: Colors.backgroundColor,
    },
    fullScreen: {
        height: Dimensions.get('screen').height,
        width: Dimensions.get('screen').width,
    },
    popupBackground: {
        backgroundColor: '#000',
        opacity: 0.5,
    },
})