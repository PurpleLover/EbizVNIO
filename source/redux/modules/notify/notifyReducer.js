import * as types from './notifyActionType';

const notifyState = {
    gettingListNotify: false,
    listNotify: [],

    gettingDetailNotify: false,
    detailNotify: {},
    filterInfo: ''
}

const notifyReducer = (state = notifyState, action) => {
    switch (action.type) {
        case types.GET_LIST_NOTIFY:
            return {
                ...state,
                gettingListNotify: true
            }
        case types.GET_LIST_NOTIFY_FINISHED:
            return {
                ...state,
                gettingListNotify: false,
                listNotify: action.data
            }
        case types.GET_DETAIL_NOTIFY:
            return {
                ...state,
                gettingDetailNotify: true
            }
        case types.GET_DETAIL_NOTIFY_FINISHED:
            return {
                ...state,
                gettingDetailNotify: false,
                detailNotify: action.data
            }
        case types.SET_FILTER_INFO: 
            return {
                ...state,
                filterInfo: action.filterInfo
            }
        default:
            return state;
    }
}

export default notifyReducer;