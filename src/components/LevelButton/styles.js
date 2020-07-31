import {StyleSheet} from 'react-native'
import Colors from 'common/Colors'

export default StyleSheet.create({
    btnContainer: {
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    btn: {
        height: '100%',
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        borderRadius: 5,
        backgroundColor: '#333',
        borderColor: Colors.headerTextColor,
        borderWidth: 1,
    },
    lockedBtn: {
        backgroundColor: Colors.backgroundColor,
    },
    activeBtn: {
        backgroundColor: Colors.headerTextColor,
        borderWidth: 0,
    },
    text: {
        fontSize: 24,
    },
    lockedText: {
        color: Colors.headerTextColor,
    },
    unlockedText: {
        color: Colors.backgroundColor,
    },
    starRow: {
        flexDirection: 'row',
        position: 'absolute',
        bottom: -15,
        left: -14,
        right: -14,
        justifyContent: 'space-between',
    },
    lock: {
        position: "absolute",
        right: -17,
        bottom: -17,
    }
})