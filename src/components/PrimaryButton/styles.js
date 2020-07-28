import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnStyle: {
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderRadius: 5,
        flexDirection: 'row',
    },
    title: {
        color: Colors.backgroundColor,
        fontSize: 20,
    },
    prefixIcon: {
        marginRight: 5,
    }
})