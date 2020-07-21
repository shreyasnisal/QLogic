import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    BackHandler,
    ScrollView,
    FlatList,
    Dimensions,
    AsyncStorage,
} from 'react-native'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import commonStyles from 'common/styles'
import styles from './styles'
import LevelButton from 'components/LevelButton/LevelButton'
import Levels from 'common/Levels'
import CarouselIndicators from 'components/CarouselIndicators/CarouselIndicators'
import Header from 'components/Header/Header'
import Background from 'components/Background/Background'

export default class LevelSelect extends Component {

    constructor(props) {
        super(props)

        const pages = []
        const rows = []
        for (let i = 0; i < Levels.length; i++) {
            if (i % 15 === 0)
                pages.push(pages.length)

            if (i % 5 === 0)
                rows.push(rows.length)
        }

        this.state = {
            pages: pages,
            rows: rows,
            currentPage: 0,
            levelData: []
        }
    }

    getLevelData = async () => {
        const levelData = JSON.parse(await AsyncStorage.getItem('levelData'))
        this.setState({
            levelData: levelData
        })
    }

    backButton = () => {
        this.props.navigation.navigate('Home')
    }

    handleScroll = (event) => {
        const pageNumber = Math.round(event.nativeEvent.contentOffset.x / Dimensions.get('screen').width)
        this.setState({
            currentPage: pageNumber
        })
    }
    
    render() {

        const {levelData, pages, rows} = this.state

        return(
            <View style={commonStyles.container}>
                <Header title='Select a Level' onPressBack={this.backButton} />
                <Background />
                <ScrollView
                    style={styles.levelPagesScrollView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={Dimensions.get('screen').width}
                    onMomentumScrollEnd={this.handleScroll}
                >
                    {pages.map((pageNumber, pageIndex) => {
                        return(
                            <View key={pageIndex} style={styles.levelsContainer}>
                                {rows.map((rowNumber, rowIndex) => {
                                    if (rowNumber >= pageNumber * 3 && rowNumber < 3 + pageNumber * 3)
                                        return(
                                            <View key={rowIndex} style={styles.levelsRow}>
                                                {Levels.map((value, index) => {
                                                    if (index >= rowNumber * 5 && index < 5 + rowNumber * 5)
                                                    return(
                                                        <LevelButton
                                                            key={index}
                                                            style={styles.levelBtn}
                                                            isLocked={index > levelData.length}
                                                            stars={levelData[index]}
                                                            levelNumber={index + 1}
                                                            onPress={() => {this.props.navigation.navigate('Game', {levelId: index})}}
                                                        />
                                                    )
                                                })}
                                            </View>
                                        )
                                })}
                            </View>
                        )
                    })}
                </ScrollView>
                <CarouselIndicators style={styles.carouselIndicators} numPages={this.state.pages.length} currentPage={this.state.currentPage} />
            </View>
        )
    }

}