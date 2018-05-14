/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: định nghĩa reducer của user
 */
import * as types from './userActionType';

//các trạng thái của người dùng
const userState = {
    executingLogin: false,
    loginSuccess: false,
    loginFail: false,

    userInfo: {},

    notifyInfo: {
        notifycationNumber: 0,
        inDocxNotProcessedNumber: 0,
        inDocxProcessedNumber: 0,
        inDocxJoinProcessedNumber: 0,

        outDocxNotProcessedNumber: 0,
        outDocxJoinProcessedNumber: 0,

        inDocxNumber: 0,
        outDocxNumber: 0
    }
}

//reducer của người dùng
const userReducer = (state = userState, action) => {
    switch (action.type) {
        case types.LOGIN:
            return {
                ...state,
                loginFail: false,
                loginSuccess: false,
                executingLogin: true
            }
        case types.LOGIN_FAIL:
            return {
                ...state,
                loginFail: true,
                loginSuccess: false,
                executingLogin: false
            }
        case types.LOGIN_SUCCESS:
            return {
                ...state,
                loginFail: false,
                loginSuccess: true,
                executingLogin: false
            }
        case types.EXECUTE_LOGIN:
            return {
                ...state,
                loginFail: false,
                loginSuccess: false,
                executingLogin: true
            }
        case types.SET_USER_INFO: {
            return {
                ...state,
                userInfo: action.userInfo
            }
        }

        case types.SET_NOTIFY_INFO: {
            return {
                ...state,
                notifyInfo: {
                    notifycationNumber: action.notifyInfo.notifycationNumber,

                    inDocxNotProcessedNumber: action.notifyInfo.inDocxNotProcessedNumber,
                    inDocxProcessedNumber: action.notifyInfo.inDocxProcessedNumber,
                    inDocxJoinProcessedNumber: action.notifyInfo.inDocxJoinProcessedNumber,
                    inDocxNumber: (action.notifyInfo.inDocxNotProcessedNumber +
                        action.notifyInfo.inDocxProcessedNumber +
                        action.notifyInfo.inDocxJoinProcessedNumber),

                    outDocxNotProcessedNumber: action.notifyInfo.outDocxNotProcessedNumber,
                    outDocxJoinProcessedNumber: action.notifyInfo.outDocxJoinProcessedNumber,
                    outDocxNumber: (action.notifyInfo.outDocxNotProcessedNumber +
                        action.notifyInfo.outDocxJoinProcessedNumber)
                }
            }
        }
        case types.READ_DETAIL_NOTIFY: {
            return {
                ...state,
                notifyInfo: {
                    ...state.notifyInfo,
                    notifycationNumber: state.notifyInfo.notifycationNumber - 1
                }
            }
        }

        case types.READ_DETAIL_INDOCX_NOT_PROCESSED: {
            return {
                ...state,
                notifyInfo: {
                    ...state.notifyInfo,
                    inDocxNotProcessedNumber: state.notifyInfo.inDocxNotProcessedNumber - 1,
                    inDocxNumber: state.notifyInfo.inDocxNumber - 1
                }
            }
        }

        case types.READ_DETAIL_INDOCX_PROCESSED: {
            return {
                ...state,
                notifyInfo: {
                    ...state.notifyInfo,
                    inDocxProcessedNumber: state.notifyInfo.inDocxProcessedNumber - 1,
                    inDocxNumber: state.notifyInfo.inDocxNumber - 1
                }
            }
        }

        case types.READ_DETAIL_INDOCX_JOIN_PROCESSED: {
            return {
                ...state,
                notifyInfo: {
                    ...state.notifyInfo,
                    inDocxJoinProcessedNumber: state.notifyInfo.inDocxJoinProcessedNumber - 1,
                    inDocxNumber: state.notifyInfo.inDocxNumber - 1
                }
            }
        }

        default:
            return state;
    }
}

export default userReducer;