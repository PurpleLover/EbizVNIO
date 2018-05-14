import * as action from './notifyAction';
import * as api from './notifyAPI';

/**
 * @description: lấy danh sách thông báo
 * @param {} userId 
 * @param {*} pageSize 
 * @param {*} pageIndex 
 */
function thunkGetListNotify(userId, pageSize, pageIndex) {
    return (dispatch) => {
        dispatch(action.getListNotify());

        api.apiGetListNotify(userId, pageSize, pageIndex).then((result) => {
            dispatch(action.getListNotifyFinished(result));
        });
    }
}


function thunkGetDetailNotify(notifyId){
    return(dispatch)=> {
        dispatch(action.getDetailNotify());

        api.apiGetDetailNotify(notifyId).then((result)=> {
            dispatch(action.getDetailNotifyFinished(result));
        });
    }
}


export {
    thunkGetListNotify,
    thunkGetDetailNotify
}