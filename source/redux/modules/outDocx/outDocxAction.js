/**
 * @author: duynn
 * @since: 30/03/2018
 * @description: các hành động đối với văn bản đi
 */

import * as types from './outDocxActionType';

//lấy danh sách văn bản
function getListDocx() {
    return {
        type: types.GET_LIST_DOCX
    }
}

/**
 * @description: lấy xong ds văn bản
 * @param {} data : dữ liệu văn bản
 */
function getListDocxFinished(data) {
    return {
        type: types.GET_LIST_DOCX_FINISHED,
        data
    }
}

//lấy chi tiết văn bản
function getDetailDocx() {
    return {
        type: types.GET_DETAIL_DOCX
    }
}

/**
 * @description: lấy xong chi tiết văn bản
 * @param {} data : dữ liệu chi tiết văn bản
 */
function getDetailDocxFinished(data) {
    return {
        type: types.GET_DETAIL_DOCX_FINISHED,
        data
    }
}

function setDocxType(docxType) {
    return {
        type: types.SET_DOCX_TYPE,
        docxType
    }
}

function setFilterInfo(filterValue, filterDocxType) {
    return {
        type: types.SET_FILTER_INFO,
        filterValue,
        filterDocxType
    }
}

export {
    getListDocx, getListDocxFinished, getDetailDocx,
    getDetailDocxFinished, setDocxType, setFilterInfo
}