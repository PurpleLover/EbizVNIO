/**
 * @author: duyn
 * @since: 30/03/2018
 * @description: api của văn bản đi
 */
'use strict'
import {
    DEFAULT_API_URL, OUT_DOCX_NOT_PROCESSED,
    OUT_DOCX_JOIN_PROCESSED, EMPTY_STRING
} from '../../../common/constant';


//lấy danh sách văn bản đi
async function apiGetListOutDocx(userId, type, pageSize, pageIndex, query) {
    let url = EMPTY_STRING;
    let result = [];

    if (query == undefined || query == null) {
        query = EMPTY_STRING;
    }

    switch (type) {
        case OUT_DOCX_NOT_PROCESSED:
            url = DEFAULT_API_URL + '/api/vanbandi/vbchuaxuly/' + userId + '/' + pageSize + '/' + pageIndex + '?query=' + query;
            break;
        default:
            url = DEFAULT_API_URL + '/api/vanbandi/vbthamgiaxuly/' + userId + '/' + pageSize + '/' + pageIndex + '?query=' + query;
            break;
    }

    fetch(url).then((response) => response.json())
        .then((resultJson) => {
            result = resultJson
        });
    


    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(result);
        }, 2000);
    });
}

//lấy chi tiết văn bản đi
async function apiGetDetailOutDocx(docxId, userId) {
    let url = DEFAULT_API_URL + '/api/vanbandi/GetDetail/' + docxId + '/' + userId;
    let result = {};

    await fetch(url).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result);
        }, 2000);
    });
}

export {
    apiGetListOutDocx, apiGetDetailOutDocx
}