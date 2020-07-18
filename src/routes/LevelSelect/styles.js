import {StyleSheet, Dimensions} from 'react-native'

export default StyleSheet.create({
    titleContainer: {
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        marginTop: Dimensions.get('screen').height * 0.05,
    },
    title: {
        fontSize: 24,
    },
    levelPagesScrollView: {

    },
    levelsContainer: {
        flex: 1,
        width: Dimensions.get('screen').width,
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    levelsRow: {
        width: '100%',
        paddingHorizontal: Dimensions.get('screen').width * 0.1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: Dimensions.get('screen').height * 0.05,
    },
    levelBtn: {
        width: Dimensions.get('screen').height * 0.16,
        height: Dimensions.get('screen').height * 0.2,
        marginRight: Dimensions.get('screen').width * 0.02,
    },
    carouselIndicators: {
        width: '5%',
        alignSelf: 'center',
        marginTop: Dimensions.get('screen').height * 0.05,
    },
})