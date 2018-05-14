/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: thunk của văn bản đến
 */

import * as action from './inDocxAction';
import * as api from './inDocxAPI';

function thunkGetListInDocx(userId, type, pageSize, pageIndex, query) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(action.getListDocx());
            api.apiGetListInDocx(userId, type, pageSize, pageIndex, query).then((result) => {
                dispatch(action.getListDocxFinished(result));
            });
        }).then(() => {
            return resolve(true);           
        });
    }
}

function thunkGetDetailInDocx(docxId, userId) {
    return (dispatch) => {
        dispatch(action.getDetailDocx());
        api.apiGetDetailInDocx(docxId, userId).then((result) => {
            dispatch(action.getDetailDocxFinished(result));
        })
    }
}

export {
    thunkGetListInDocx, thunkGetDetailInDocx
}