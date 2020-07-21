import {StyleSheet, Dimensions} from 'react-native'
import Colors from '../../common/Colors'

export default StyleSheet.create({
    buttonsContainer: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        width: '40%',
    },
    btn: {
        marginVertical: Dimensions.get('screen').height * 0.03,
    },
    titleContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        color: Colors.buttonColor,
        fontWeight: 'bold'
    }
})