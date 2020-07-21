import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    container: {
        position: "absolute",
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
    },
    background: {
        backgroundColor: '#000',
        opacity: 0.7,
    },
    popupContainer: {
        backgroundColor: '#fff',
        width: '30%',
        alignItems: 'center',
    },
    starsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsRow: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    }
})