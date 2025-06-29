import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        height: Dimensions.get('screen').height * 0.175,
        width: '100%',
        backgroundColor: Colors.headerColor,
        elevation: 1,
        zIndex: 1,
    },
    headerIconBtn: {
        marginLeft: 15,
    },
    headerRightIcons: {
        flexDirection: 'row',
        marginLeft: 'auto',
        marginRight: 15,
        alignItems: 'center',
    },
    titleText: {
        position: 'absolute',
        color: Colors.headerTextColor,
        fontSize: 28,
        textAlign: 'center',
        width: '100%',
        left: 0,
        // fontWeight: 'bold',
    },
})