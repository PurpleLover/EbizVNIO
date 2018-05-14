/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: kho lưu trữ trạng thái của toàn ứng dụng
 */
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk'
import { commonReducer } from './reducer';

export const commonStore = createStore(commonReducer, applyMiddleware(thunk));