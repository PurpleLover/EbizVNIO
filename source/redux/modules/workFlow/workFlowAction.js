/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: phân loại hành động của luồng công việc
 */
import * as action from './workFlowActionType';

function getWorkFlow() {
    return {
        type: action.GET_WORKFLOW
    }
}

/**
 * @description: lấy dữ liệu của luồng xử lý
 * @param {*} workFlowCurrentStepName: tên bước chuyển trạng thái hiện tại 
 * @param {*} allowChangeDeadline: có cho phép thay đổi hạn xử lý không?
 * @param {*} workflowUserProcess: dữ liệu luồng xử lý
 * @param {*} workFlowProcessData: dữ liệu để xử lý luồng
 */
function getWorkFlowFinished(workFlowCurrentStepName, allowChangeDeadline, workflowUserProcess, workFlowProcessData) {
    return {
        type: action.GET_WORKFLOW_FINISHED,
        workFlowCurrentStepName,
        allowChangeDeadline,
        workflowUserProcess,
        workFlowProcessData
    }
}

function executeWorkFlow() {
    return {
        type: action.EXECUTE_WORKFLOW
    }
}

function setUserProcess(userId, userToken) {
    return {
        type: action.SET_USER_PROCESS,
        userId,
        userToken
    }
}

function setDeadline(deadline) {
    return {
        type: action.SET_DEADLINE,
        deadline
    }
}

function setComment(comment) {
    return {
        type: action.SET_COMMENT,
        comment
    }
}


function executeWorkFlowFinished(processResult) {
    return {
        type: action.EXECUTE_WORKFLOW_FINISHED,
        processResult
    }
}

//làm mới dữ liệu luồng xử lý
function refreshWorkFlowExecuteState() {
    return {
        type: action.REFRESH_WORKFLOW_STATE
    }
}

//lưu thông số của màn hình chi tiết trước đó
function setPreviousNavigatorState(screenName, docxId){
    return {
        type: action.SET_PREVIOUS_NAVIGATOR_STATE,
        screenName, 
        docxId
    }
}

export {
    getWorkFlow, getWorkFlowFinished, executeWorkFlow, executeWorkFlowFinished,
    setUserProcess, setDeadline, setComment, refreshWorkFlowExecuteState,
    setPreviousNavigatorState
}

