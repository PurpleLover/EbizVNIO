/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: thunk workflow
 */

import * as action from './workFlowAction';
import * as api from './workFlowAPI';

function thunkGetWorkFlow(workFlowStepName, allowChangeDeadline, docxType, docxId, userId, startStatus, endStatus) {
    return (dispatch) => {
        return new Promise((resolve, reject) => {
            dispatch(action.getWorkFlow());
            api.apiGetWorkFlow(docxType, docxId, userId, startStatus, endStatus).then((workFlowUserProcess) => {

                //tạo dữ liệu để xử lý văn bản hiện tại
                let workFlowProcessData = {
                    docxType,
                    docxId,
                    userId,
                    startStatus,
                    endStatus
                }
                dispatch(action.getWorkFlowFinished(workFlowStepName, allowChangeDeadline, workFlowUserProcess, workFlowProcessData));
            }).then(() => {
                resolve();
            })
        });
    }
}

/**
 * @description: xử  lý văn bản
 * @param {*} data: dữ liệu để xử lý
 */
function thunkExecuteWorkFlow(data) {
    return (dispatch) => {
        dispatch(action.executeWorkFlow());
        api.apiExecuteWorkFlow(data).then((result) => {
            dispatch(action.executeWorkFlowFinished(result));
        });
    }
}

export {
    thunkGetWorkFlow, thunkExecuteWorkFlow
}