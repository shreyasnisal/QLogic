import React, {Component} from 'react'
import {
    Platform,
    View,
    Text,
    BackHandler,
    ScrollView,
    FlatList,
    Dimensions,
} from 'react-native'
import PrimaryButton from 'components/PrimaryButton/PrimaryButton'
import SecondaryButton from 'components/SecondaryButton/SecondaryButton'
import styles from './styles'
import LevelButton from 'components/LevelButton/LevelButton'
import BackButton from 'components/BackButton/BackButton'
import Levels from 'common/Levels'

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
        }
    }

    backButton = () => {
        this.props.navigation.navigate('Home')
    }
    
    render() {
        return(
            <View style={styles.container}>
                <BackButton onPress={this.backButton} />
                <View style={styles.titleContainer}>
                    <Text style={styles.title}>Select a Level</Text>
                </View>
                <ScrollView
                    style={styles.levelPagesScrollView}
                    horizontal
                    showsHorizontalScrollIndicator={false}
                    snapToInterval={Dimensions.get('screen').width}
                >
                    {this.state.pages.map((pageNumber, pageIndex) => {
                        return(
                            <View key={pageIndex} style={styles.levelsContainer}>
                                {this.state.rows.map((rowNumber, rowIndex) => {
                                    if (rowNumber >= pageNumber * 3 && rowNumber < 3 + pageNumber * 3)
                                        return(
                                            <View key={rowIndex} style={styles.levelsRow}>
                                                {Levels.map((value, index) => {
                                                    if (index >= rowNumber * 5 && index < 5 + rowNumber * 5)
                                                    return(
                                                        <LevelButton
                                                            key={index}
                                                            style={styles.levelBtn}
                                                            isLocked={false}
                                                            stars={2}
                                                            levelNumber={index + 1}
                                                            onPress={() => {}}
                                                        />
                                                    )
                                                })}
                                            </View>
                                        )
                                })}
                            </View>

                        )
                    })}
                    {/* <View style={styles.levelsContainer}>
                        {Levels.map((value, index) => {
                            return(
                                <LevelButton
                                    key={index}
                                    style={styles.levelBtn}
                                    isLocked={false}
                                    stars={2}
                                    levelNumber={index + 1}
                                    onPress={() => {}}
                                />
                            )
                        })}
                    </View> */}
                </ScrollView>
            </View>
        )
    }

}