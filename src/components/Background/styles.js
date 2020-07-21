import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    container: {
        position: 'absolute',
        width: Dimensions.get('screen').width,
        height: Dimensions.get('screen').height * 0.825,
        left: 0,
        top: Dimensions.get('screen').height * 0.175,
        justifyContent: 'space-evenly',
        backgroundColor: 'rgba(0, 0, 0, 0)',
    },
    qubitLineContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        paddingLeft: '5%',
    },
    indeneted: {
        paddingLeft: '10%',
    },
    chip: {
        backgroundColor: Colors.backgroundGreyColor,
        height: Dimensions.get('screen').width * 0.03,
        width: Dimensions.get('screen').width * 0.1,
        borderRadius: Dimensions.get('screen').width * 0.1,
    },
    line: {
        borderColor: Colors.backgroundGreyColor,
        borderBottomWidth: 2,
        width: '65%',
    },
    long: {
        width: '70%',
    },
    dash: {
        marginLeft: '1%',
        width: '7%',
    }
})