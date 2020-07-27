import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    container: {
        backgroundColor: Colors.headerColor,
        paddingVertical: 5,
        paddingHorizontal: 20,
        borderRadius: 4,
    },
    toastText: {
        color: Colors.headerTextColor,
        fontSize: 16,
    }
})