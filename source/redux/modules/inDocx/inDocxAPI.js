/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: api của văn bản đến
 */
'use strict'
import {
    DEFAULT_API_URL, IN_DOCX_NOT_PROCESSED,
    IN_DOCX_PROCESSED, IN_DOCX_JOIN_PROCESSED,
    EMPTY_STRING
} from '../../../common/constant';

//lấy danh sách văn bản đến
async function apiGetListInDocx(userId, type, pageSize, pageIndex, query) {
    if (query == undefined || query == null) {
        query = "";
    }

    let url = EMPTY_STRING;
    let result = {
        totalItem: 0,
        listItems: []
    }
    switch (type) {
        case IN_DOCX_NOT_PROCESSED:
            url = DEFAULT_API_URL + '/api/vanbanden/vanbanchuaxuly/' + userId + '/' + pageSize + '/' + pageIndex + '?query=' + query;
            break;
        case IN_DOCX_PROCESSED:
            url = DEFAULT_API_URL + '/api/vanbanden/vanbandaxuly/' + userId + '/' + pageSize + '/' + pageIndex + '?query=' + query;
            break;
        default:
            url = DEFAULT_API_URL + '/api/vanbanden/vanbanthamgiaxuly/' + userId + '/' + pageSize + '/' + pageIndex + '?query=' + query;
            break;
    }

    fetch(url)
        .then((response) => response.json())
        .then((resultJson) => {
            result = {
                listItems: resultJson.ListItem
            }
        });
    return new Promise((resolve, reject) => {
        return resolve(result);
    });
}

//lấy chi tiết văn bản đến
async function apiGetDetailInDocx(docxId, userId) {
    const url = DEFAULT_API_URL + '/api/vanbanden/GetDetail/' + docxId + '/' + userId;
    let result = {};

    await fetch(url).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson
        });
        
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(result);
        }, 2000);
    })
}

export {
    apiGetListInDocx, apiGetDetailInDocx
}