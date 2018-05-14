import * as type from './notifyActionType';

/**
 * @description: lấy danh sách thông báo
 */
function getListNotify() {
    return {
        type: type.GET_LIST_NOTIFY
    }
}

/**
 * @description: lấy danh sách thông báo xong và trả về kết quả
 */

function getListNotifyFinished(data) {
    return {
        type: type.GET_LIST_NOTIFY_FINISHED,
        data
    }
}

/**
 * @description: lấy chi tiết thông báo
 */
function getDetailNotify() {
    return {
        type: type.GET_DETAIL_NOTIFY
    }
}

/**
 * @description: lấy chi tiết thông báo xong
 * @param {@} data: kết quả trả về từ server
 */
function getDetailNotifyFinished(data) {
    return {
        type: type.GET_DETAIL_NOTIFY_FINISHED,
        data
    }
}

/**
 * @description: thiết lập giá trị tìm kiếm
 * @param {@} filterInfo: giá trị tìm kiếm
 */
function setFilterInfo(filterInfo) {
    return {
        type: type.SET_FILTER_INFO,
        filterInfo
    }
}


export { getListNotify, getListNotifyFinished, getDetailNotify, getDetailNotifyFinished, setFilterInfo }