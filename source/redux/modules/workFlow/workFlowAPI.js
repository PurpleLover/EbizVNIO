/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: api lấy dữ liệu workflow
 */

import { DEFAULT_API_URL, IN_DOCX_TYPE_ID, OUT_DOCX_TYPE_ID } from '../../../common/constant';

/**
 * @description: lấy dữ liệu workflow từ api
 * @param {*} docxType: loại văn bản 
 * @param {*} docxId: mã văn bản
 * @param {*} userId: người xử lý 
 * @param {*} startStatus: trạng thái bắt đầu
 * @param {*} endStatus: trạng thái kết thúc
 */
async function apiGetWorkFlow(docxType, docxId, userId, startStatus, endStatus) {
    let result = [];
    let docxTypeUrlParam = 'vanbanden';
    if (docxType == OUT_DOCX_TYPE_ID) {
        docxTypeUrlParam = 'vanbandi';
    }

    let url = DEFAULT_API_URL + '/api/' + docxTypeUrlParam + '/chuyenvienxuly/' + userId + '/' + docxId + '/' + startStatus + '/' + endStatus;

    await fetch(url).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(result);
        }, 2000);
    });
}
/**
 * @description: xử lý luồng công việc
 * @param {} docxType: loại văn bản
 * @param {*} docxId: mã văn bản
 * @param {*} userId: người gửi xử lý
 * @param {*} startStatus: trạng thái bắt đầu
 * @param {*} endStatus: trạng thái kết thúc
 * @param {*} userProcessId: người được chọn xử lý
 * @param {*} comment: ghi chú
 * @param {*} deadline: hạn xử lý văn bản
 */
async function apiExecuteWorkFlow(data) {
    let result = [];
    let docxTypeUrlParam = 'vanbanden';
    if (data.docxType == OUT_DOCX_TYPE_ID) {
        docxTypeUrlParam = 'vanbandi';
    }
    let url = DEFAULT_API_URL + '/api/' + docxTypeUrlParam + '/SaveTrangThaiVB';

    let obj = JSON.stringify({
        userID: data.userId,
        vanbanID: data.docxId,
        state1: data.startStatus,
        state2: data.endStatus,
        USER_MAIN_PROCESS: data.userProcessId > 0 ? data.userProcessId : '',
        WF_comment: data.comment,
        WF_THOIHAN_XULY: data.deadline,
        USER_JOIN_PROCESS: null,
        UNIT_MAIN_PROCESS: null,
        UNIT_JOIN_PROCESS: null,
    });

    await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8',
        }, body: obj
    }).then((response) => response.json()).then((responseJson) => {
        result = responseJson;
    });

    return new Promise((resolve, reject) => {
        setTimeout(function () {
            resolve(result);
        }, 2000);
    });
}

export {
    apiGetWorkFlow, apiExecuteWorkFlow
}