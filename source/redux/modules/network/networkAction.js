/**
 * @description: các loại hành động network
 * @since: 25/04/2018
 * @author: duynn
 */
import * as types from './networkActionType';


function updateNetStatus(connectStatus) {
    return {
        type: types.UPDATE_NET_STATUS,
        connectStatus
    }
}

export { updateNetStatus }