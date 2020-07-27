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
        width: '100%',
        flexDirection: 'row',
    },
    star1: {
        position: "absolute",
        left: -16,
        bottom: -20,
    },
    star2: {
        position: "absolute",
        left: 16.75,
        bottom: -20,
    },
    star3: {
        position: "absolute",
        right: -16,
        bottom: -20,
    },
    lock: {
        position: "absolute",
        right: -17,
        bottom: -17,
    }
})