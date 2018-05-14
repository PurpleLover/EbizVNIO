import { DEFAULT_API_URL } from '../../../common/constant';

/**
 * @description: api lấy danh sách thông báo
 * @param {*} userId 
 * @param {*} pageSize 
 * @param {*} pageIndex 
 */
function apiGetListNotify(userId, pageSize, pageIndex) {
    const url = DEFAULT_API_URL + '/api/notify/GetByUser/' + userId + '/' + pageSize + '/' + pageIndex;
    let result = [];

    fetch(url).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson
        });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(result);
        }, 2000);
    });
}

/**
 * @description: api lấy chi tiết thông báo
 * @param {*} notifyId 
 */
function apiGetDetailNotify(notifyId) {
    const url = DEFAULT_API_URL + '/api/notify/Detail/' + notifyId;
    let result = {};

    fetch(url).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(result);
        }, 2000);
    });
}


export {
    apiGetListNotify, apiGetDetailNotify
}