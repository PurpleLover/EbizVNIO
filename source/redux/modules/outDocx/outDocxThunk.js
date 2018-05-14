/**
 * @author: duynn
 * @since: 30/03/2018
 * @description: thunk văn bản đi
 */

import * as action from './outDocxAction';
import * as api from './outDocxAPI';

function thunkGetListOutDocx(userId, type, pageSize, pageIndex, query) {
    return (dispatch) => {
        dispatch(action.getListDocx());
        api.apiGetListOutDocx(userId, type, pageSize, pageIndex, query).then((result) => {
            dispatch(action.getListDocxFinished(result));
        });
    }
}

function thunkGetDetailOutDocx(docxId, userId) {
    return (dispatch) => {
        dispatch(action.getDetailDocx());
        api.apiGetDetailOutDocx(docxId, userId).then((result) => {
            dispatch(action.getDetailDocxFinished(result));
        });
    }
}

export {
    thunkGetListOutDocx, thunkGetDetailOutDocx
}