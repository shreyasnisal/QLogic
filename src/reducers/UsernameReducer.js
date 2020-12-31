import * as types from 'actions/action-types'

export default (state = [], action) => {
    switch(action.type) {
        case types.USERNAME_VERIFIED:
            return {
                ...state,
                usernameVerified: action.updatePayload.data
            }
        case types.USERNAME_UNAVAILABLE:
            return {
                ...state,
                usernameUnavailable: action.updatePayload.data
            }
    }
}