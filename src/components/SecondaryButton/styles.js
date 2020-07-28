import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnStyle: {
        backgroundColor: Colors.backgroundColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.buttonColor,
        flexDirection: 'row',
    },
    title: {
        color: Colors.buttonColor,
        fontSize: 20,
    },
    prefixIcon: {
        marginRight: 5,
    }
})