/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: middleware của user
 */
import * as api from './userAPI';
import * as action from './userAction';
//lib
import _ from 'lodash';

//đăng nhập
const thunkLogin = (userName, password) => {
    return (dispatch) => {
        dispatch(action.login());
        api.apiLogin(userName, password).then(result => {
            if (!_.isNull(result)) {
                dispatch(action.loginSuccess());

                //tạo thông tin người dùng
                dispatch(action.setUserInfo(result));

                //tạo thông tin thông báo
                dispatch(thunkGetDataNumber(result.ID));
            } else {
                dispatch(action.loginFail());
            }
        });
    }
}

//thông tin thông báo
const thunkGetDataNumber = (userId) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            api.apiGetDataNumber(userId).then((result) => {
                dispatch(action.setNotifyInfo(result));

                setTimeout(function () {
                    resolve();
                }, 2000);
            });
        });
    }
}


//cập nhật token
const thunkActiveToken = (userId, token) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            api.apiActiveToken(userId, token).then(result => {
                resolve(result);
            });
        })
    }
}

//vô hiệu hóa token
const thunkDeActiveToken = (userId, token) => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            api.apiDeActiveToken(userId, token).then(result => {
                resolve(result);
            });
        })
    }
}

const thunkReadNotifyDetail = () => {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(action.readDetailNotify());
            resolve();
        });
    }
}


export {
    thunkLogin, thunkGetDataNumber, thunkActiveToken, thunkDeActiveToken,
    thunkReadNotifyDetail
}