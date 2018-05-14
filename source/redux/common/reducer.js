/**
 * @author:duynn
 * @since: 16/03/2018
 * @description: reducer tổng hợp của toàn hệ thống
 */
import { combineReducers } from 'redux';
import userReducer from '../modules/user/userReducer';
import notifyReducer from '../modules/notify/notifyReducer';
import inDocxReducer from '../modules/inDocx/inDocxReducer';
import workFlowReducer from '../modules/workFlow/workFlowReducer';
import outDocxReducer from '../modules/outDocx/outDocxReducer';
import networkReducer from '../modules/network/networkReducer';

export const commonReducer = combineReducers({
    userState: userReducer,
    inDocxState: inDocxReducer,
    outDocxState: outDocxReducer,
    workFlowState: workFlowReducer,
    notifyState: notifyReducer,
    networkState: networkReducer
});