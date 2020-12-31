import Axios from "axios"

import * as types from './actions-types'
import axios from 'axios'
import {AsyncStorage} from '@react-native-community/async-storage'

const BASE_URL = 'http://localhost:5001/qlogic-30e7e/us-central1'

export const verifyUsername = (username) => {
    return async dispatch => {
        axios({
            method: 'get',
            url: BASE_URL + '/verifyUsername?username=' + username,
        }).then(response => {
            if (response) {
                if (response.data === 'success')
                    dispatch({ type: types.USERNAME_VERIFIED, updatePayload: response })
                else
                    dispatch({ type: types.USERNAME_UNAVAILABLE, updatePayload: response })
            }
        }).catch(error => {
            alert('Request failed')
        })
    }
}