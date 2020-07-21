import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnStyle: {
        backgroundColor: 'rgba(0, 0, 0, 0)',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.buttonColor,
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 20,
    }
})