import {StyleSheet, Dimensions} from 'react-native'
import Colors from 'common/Colors'
import DetectNavbar from 'react-native-detect-navbar-android'

const hasSoftNavigation = () => {
    if (Platform.OS !== 'android') return false

    DetectNavbar.hasSoftKeys().then(bool => {
        return bool
    })
}

export default StyleSheet.create({
    page: {
        flex: 1,
        width: Dimensions.get('screen').width,
        paddingLeft: Dimensions.get('screen').width * 0.08,
        paddingRight: Dimensions.get('screen').width * 0.1,
        paddingTop: Dimensions.get('screen').height * 0.1,
        paddingBottom: Dimensions.get('screen').width * 0.05,
        alignItems: 'center',
    },
    text: {
        color: Colors.headerTextColor,
        fontSize: 18,
    },
    carouselIndicators: {
        marginBottom: Dimensions.get('screen').height * 0.05,
    },
    image: {
        // height: '40%',
        flex: 1,
        aspectRatio: 2.88,
        resizeMode: 'stretch',
    },
    gateHeading: {
        color: Colors.headerTextColor,
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 2,
    },
    gateInfoContainer: {
        flex: 1,
        width: '90%',
        marginLeft: hasSoftNavigation() ? -Dimensions.get('screen').width * 0.1 : 0,
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    gateImg: {
        marginLeft: 20,
    },
    section: {
        marginTop: '5%',
    }
})