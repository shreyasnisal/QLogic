import {StyleSheet, Dimensions} from 'react-native'

export default StyleSheet.create({
    gatesContainer: {
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
    },
    gateBtn: {
        height: Dimensions.get('screen').height * 0.15,
        width: Dimensions.get('screen').height * 0.15,
    }
})