import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnStyle: {
        backgroundColor: Colors.buttonColor,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: '2%',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: Colors.buttonColor,
        flexDirection: 'row',
    },
    reduceLeftPadding: {
        marginLeft: -5,
    },
    title: {
        color: Colors.backgroundColor,
        fontSize: 20,
    },
    prefixIcon: {
        marginRight: 10,
    },
    reduceMargin: {
        marginRight: 4,
        marginLeft: -15,
    }
})