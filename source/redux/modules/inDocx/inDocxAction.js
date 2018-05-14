/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: các hành động trong văn bản đến
 */
import * as types from './inDocxActionType';

//tạo giá trị kiểu văn bản
function setDocxType(docxType){
    return {
        type: types.SET_DOCX_TYPE,
        docxType
    }
}

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

/**
 * @description: tạo giá trị tìm kiếm
 * @param {} filterValue 
 */
function setFilterInfo(filterValue, filterDocxType) {
    return {
        type: types.SET_FILTER_INFO,
        filterValue,
        filterDocxType
    }
}

/**
 * @description: reset giá trị tìm kiếm
 */
function resetFilterValue() {
    return {
        type: types.RESET_FILTER_VALUE
    }
}

export {
    setDocxType, getListDocx, getListDocxFinished, getDetailDocx,
    getDetailDocxFinished, setFilterInfo, resetFilterValue
}