/**
 * @description: reducer xử lý trạng thái network
 * @author: duynn
 * @since: 25/04/2018
 */
import * as types from './networkActionType'

const initialState = {
    connectStatus: false
}

const networkReducer = (state = initialState, action) => {
    switch (action.type) {
        case types.UPDATE_NET_STATUS: {
            return {
                ...state,
                connectStatus: action.connectStatus
            }
        }
        default: {
            return state
        }
    }
}

export default networkReducer;