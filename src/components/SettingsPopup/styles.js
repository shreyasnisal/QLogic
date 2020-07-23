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
    popupContainer: {
        backgroundColor: '#fff',
        width: '30%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
})