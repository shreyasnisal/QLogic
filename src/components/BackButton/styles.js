import {StyleSheet, Dimensions} from 'react-native'

export default StyleSheet.create({
    btn: {
        position: 'absolute',
        top: Dimensions.get('screen').height * 0.05,
        left: Dimensions.get('screen').width * 0.05,
    }
})