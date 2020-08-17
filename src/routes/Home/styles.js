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
    btnRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    halfBtn: {
        width: '45%',
    },
    titleContainer: {
        marginBottom: 10,
    },
    title: {
        fontSize: 36,
        color: Colors.buttonColor,
        fontWeight: 'bold'
    },
    coinContainer: {
        position: 'absolute',
        bottom: 20,
        right: 20,
        flexDirection: 'row',
        alignItems: 'center',
    },
    coinImage: {
        width: 25,
        height: 25,
        marginLeft: 5,
    },
    coinText: {
        fontSize: 20,
        color: Colors.buttonColor,
    },
})