import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnStyle: {
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderRadius: 5,
    },
    title: {
        color: Colors.buttonTextColor,
        fontSize: 24,
    }
})