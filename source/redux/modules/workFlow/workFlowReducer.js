/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: reducer của luồng công việc
 */
import * as type from './workFlowActionType';
import { EMPTY_STRING, WORKFLOW_TYPE_1, WORKFLOW_TYPE_2, WORKFLOW_TYPE_3, WORKFLOW_TYPE_4 } from '../../../common/constant';

const workFlowState = {
    gettingWorkFlow: false,
    executingWorkFlow: false,
    workflowUserProcess: [], //danh sách người xử lý workflow

    workFlowCurrentStepName: EMPTY_STRING, //tên bước xử lý hiện tại của văn bản,
    allowChangeDeadline: false, //bước xử lý hiện tại có cho phép thay đổi thời hạn xử lý của văn bản không
    workFlowType: WORKFLOW_TYPE_1,

    workFlowProcessData: { //dữ liệu để có thể xử lý workflow
        docxType: EMPTY_STRING,
        docxId: 0,
        userId: 0,
        startStatus: 0,
        endStatus: 0,
        userProcessId: 0,
        deadline: null,
        comment: EMPTY_STRING
    },
    workFlowProcessResult: {
        status: false,
        message: EMPTY_STRING,
        groupTokens: []
    },

    prevScreenName: EMPTY_STRING, //tên màn hình trước khi xử lý
    prevDocxId: 0 //mã đối tượng trước khi xử lý
}

const workFlowReducer = (state = workFlowState, action) => {
    switch (action.type) {
        case type.GET_WORKFLOW:
            return {
                ...state,
                gettingWorkFlow: true
            }
        case type.GET_WORKFLOW_FINISHED:
            let workFlowType = WORKFLOW_TYPE_1;

            if (action.workflowUserProcess.length > 0 && action.allowChangeDeadline) {
                workFlowType = WORKFLOW_TYPE_1;
            } else if (action.workflowUserProcess.length > 0 && !action.allowChangeDeadline) {
                workFlowType = WORKFLOW_TYPE_2;
            } else if (action.workflowUserProcess.length <= 0 && action.allowChangeDeadline) {
                workFlowType = WORKFLOW_TYPE_3;
            } else if (action.workflowUserProcess.length <= 0 && !action.allowChangeDeadline) {
                workFlowType = WORKFLOW_TYPE_4;
            }

            return {
                ...state,
                gettingWorkFlow: false,
                workFlowType,
                workFlowCurrentStepName: action.workFlowCurrentStepName,
                allowChangeDeadline: action.allowChangeDeadline,
                workflowUserProcess: action.workflowUserProcess,
                workFlowProcessData: {
                    ...state.workFlowProcessData,
                    docxType: action.workFlowProcessData.docxType,
                    docxId: action.workFlowProcessData.docxId,
                    userId: action.workFlowProcessData.userId,
                    startStatus: action.workFlowProcessData.startStatus,
                    endStatus: action.workFlowProcessData.endStatus
                }
            }
        case type.EXECUTE_WORKFLOW:
            return {
                ...state,
                executingWorkFlow: true
            }
        case type.EXECUTE_WORKFLOW_FINISHED:
            return {
                ...state,
                executingWorkFlow: false,
                workFlowProcessResult: {
                    ...state.workFlowProcessResult,
                    status: action.processResult.Status,
                    message: action.processResult.Message,
                    groupTokens: action.processResult.GroupTokens
                }
            }
        case type.SET_USER_PROCESS:
            return {
                ...state,
                workFlowProcessData: {
                    ...state.workFlowProcessData,
                    userProcessId: action.userId,
                }
            }
        case type.SET_DEADLINE:
            return {
                ...state,
                workFlowProcessData: {
                    ...state.workFlowProcessData,
                    deadline: action.deadline
                }
            }
        case type.SET_COMMENT:
            return {
                ...state,
                workFlowProcessData: {
                    ...state.workFlowProcessData,
                    comment: action.comment
                }
            }
        case type.REFRESH_WORKFLOW_STATE:
            return {
                ...state,
                workFlowProcessData: {
                    ...state.workFlowProcessData,
                    docxId: 0,
                    userId: 0,
                    startStatus: 0,
                    endStatus: 0,
                    userProcessId: 0,
                    deadline: null,
                    comment: EMPTY_STRING
                },
                workFlowProcessResult: {
                    status: false,
                    message: EMPTY_STRING,
                    groupTokens: []
                }
            }
        case type.SET_PREVIOUS_NAVIGATOR_STATE:
            return {
                ...state,
                prevScreenName: action.screenName,
                prevDocxId: action.docxId
            }
        default:
            return state;
    }
}

export default workFlowReducer;