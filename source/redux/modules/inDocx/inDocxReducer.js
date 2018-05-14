/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: xử lý các action của văn bản
 */

import * as types from './inDocxActionType'
import { IN_DOCX_NOT_PROCESSED } from '../../../common/constant';

const inDocxState = {
    docxType: IN_DOCX_NOT_PROCESSED,
    listInDocx: [],
    gettingListInDocx: false,

    detailInDocx: {},
    //tài liệu đính kèm
    attachments: [],
    gettingDetailInDocx: false,

    //các action trong luồng xử lý
    workflowHistory: [],
    workflowButtons: [],

    //giá trị lọc
    filterDocxType: '',
    filterValue: '',
}

const inDocxReducer = (state = inDocxState, action) => {
    switch (action.type) {
        case types.SET_DOCX_TYPE: {
            return {
                ...state,
                docxType: action.docxType
            }
        }
        case types.GET_LIST_DOCX:
            return {
                ...state,
                gettingListInDocx: true
            }
        case types.GET_LIST_DOCX_FINISHED:
            return {
                ...state,
                gettingListInDocx: false,
                listInDocx: action.data.listItems,
            }
        case types.GET_DETAIL_DOCX:
            return {
                ...state,
                gettingDetailInDocx: true
            }
        case types.GET_DETAIL_DOCX_FINISHED:
            return {
                ...state,
                detailInDocx: action.data.vanBanDen,
                attachments: action.data.LstTaiLieuDinhKem,
                workflowHistory: action.data.listWfHistory,
                workflowButtons: action.data.LIST_BUTTON_CHUYENTRANGTHAI,
                gettingDetailInDocx: false
            }
        case types.SET_FILTER_INFO:
            return {
                ...state,
                filterValue: action.filterValue,
                filterDocxType: action.filterDocxType
            }
        case types.RESET_FILTER_VALUE:
            return {
                ...state,
                filterValue: ''
            }
        default:
            return state;
    }
}

export default inDocxReducer;