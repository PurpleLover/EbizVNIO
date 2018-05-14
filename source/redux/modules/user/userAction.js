/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: định nghĩa các hành động
 */
import * as types from './userActionType';

function login() {
    return {
        type: types.LOGIN
    }
}

function logOut() {
    return {
        type: types.LOGOUT
    }
}

function loginSuccess() {
    return {
        type: types.LOGIN_SUCCESS
    }
}

function loginFail() {
    return {
        type: types.LOGIN_FAIL
    }
}

function executeLogin() {
    return {
        type: types.EXECUTE_LOGIN
    }
}

function setUserInfo(userInfo) {
    return {
        type: types.SET_USER_INFO,
        userInfo
    }
}

function setNotifyInfo(notifyInfo) {
    return {
        type: types.SET_NOTIFY_INFO,
        notifyInfo
    }
}

function readDetailNotify() {
    return {
        type: types.READ_DETAIL_NOTIFY
    }
}


export {
    login, logOut, loginSuccess, loginFail,
    executeLogin, setUserInfo,
    setNotifyInfo,
    readDetailNotify
}