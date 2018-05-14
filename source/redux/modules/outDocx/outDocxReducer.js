/**
 * @author: duynn
 * @since: 30/03/2018
 * @description: xử lý các hành động trong văn bản đi
 */

import * as types from './outDocxActionType'
import { OUT_DOCX_NOT_PROCESSED, EMPTY_STRING } from '../../../common/constant';

const outDocxState = {
    docxType: OUT_DOCX_NOT_PROCESSED,

    listOutDocx: [],
    totalOutDocx: 0,
    gettingListOutDocx: false,
    detailOutDocx: {},
    attachments: [], //tài liệu đính kèm
    gettingDetailOutDocx: false,

    //workflow
    workflowHistory: [],
    workflowButtons: [],

    filterDocxType: EMPTY_STRING,
    filterValue: EMPTY_STRING
}

const outDocxReducer = (state = outDocxState, action) => {
    switch (action.type) {
        case types.SET_FILTER_INFO:
            return {
                ...state,
                filterValue: action.filterValue,
                filterDocxType: action.filterDocxType
            }
        case types.SET_DOCX_TYPE:
            return {
                ...state,
                docxType: action.docxType
            }
        case types.GET_LIST_DOCX:
            return {
                ...state,
                gettingListOutDocx: true
            }
        case types.GET_LIST_DOCX_FINISHED:
            return {
                ...state,
                gettingListOutDocx: false,
                totalOutDocx: action.data.Count || 0,
                listOutDocx: action.data.ListItem || []
            }
        case types.GET_DETAIL_DOCX:
            return {
                ...state,
                gettingDetailOutDocx: true
            }
        case types.GET_DETAIL_DOCX_FINISHED:
            return {
                ...state,
                detailOutDocx: action.data.VanBanDi,
                attachments: action.data.LstTaiLieuDinhKem,
                workflowHistory: action.data.listWfHistory,
                workflowButtons: action.data.LIST_BUTTON_CHUYENTRANGTHAI,
                gettingDetailOutDocx: false
            }
        default:
            return state;
    }
}

export default outDocxReducer;