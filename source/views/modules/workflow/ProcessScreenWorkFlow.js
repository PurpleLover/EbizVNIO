/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: màn hình cập nhật hiển thị văn bản đến
 */

import React, { Component } from 'react';
import { Alert, Text, TouchableOpacity, View } from 'react-native';

//lib
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import _ from 'lodash';

//redux
import { connect } from 'react-redux';
import { thunkExecuteWorkFlow } from '../../../redux/modules/workFlow/workFlowThunk';
import { refreshWorkFlowExecuteState, setPreviousNavigatorState } from '../../../redux/modules/workFlow/workFlowAction';

import BaseComponent from '../../common/BaseComponent';

//constants
import {
    WORKFLOW_TYPE_1, WORKFLOW_TYPE_2, WORKFLOW_TYPE_3, WORKFLOW_TYPE_4,
    IN_DOCX_TYPE_ID, IN_DOCX_PROCESSED, OUT_DOCX_TYPE_ID, OUT_DOCX_JOIN_PROCESSED, OUT_DOCX_NOT_PROCESSED
} from '../../../common/constant';

import { processingEffect } from '../../../common/effect';

import TabNavigatorWorkFlowV1 from './TabNavigatorWorkFlowV1';
import TabNavigatorWorkFlowV2 from './TabNavigatorWorkFlowV2';
import TabNavigatorWorkFlowV3 from './TabNavigatorWorkFlowV3';
import TabNavigatorWorkFlowV4 from './TabNavigatorWorkFlowV4';

class ProcessScreenWorkFlow extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //trở về
    goBack = () => {
        if (!_.isNull(this.props.prevScreenName) && !_.isEmpty(this.props.prevScreenName) && this.props.prevDocxId > 0) {
            this.props.navigation.navigate(this.props.prevScreenName, {
                docxId: this.props.prevDocxId
            });
        } else {
            this.props.navigation.goBack();
        }
    }


    componentDidMount() {
        //thiết lập thông tin màn hình trước đó
        const docxType = this.props.workFlowState.workFlowProcessData.docxType;
        const docxId = this.props.workFlowState.workFlowProcessData.docxId;
        const screenName = _.isEqual(docxType, IN_DOCX_TYPE_ID) ? 'DetailInDocxScreen' : 'DetailOutDocxScreen';
        this.props.setPreviousNavigatorState(screenName, docxId);
    }

    //chuyển văn bản theo luồng công việc
    processWorkFlow = () => {
        let workflowUserProcess = this.props.workFlowState.workflowUserProcess;
        let allowChangeDeadline = this.props.workFlowState.allowChangeDeadline;
        let workFlowProcessData = this.props.workFlowState.workFlowProcessData;

        if (_.isNull(workflowUserProcess) == false && workflowUserProcess.length > 0 && workflowUserProcess.userProcessId <= 0) {
            Alert.alert(
                'THÔNG BÁO',
                'Vui lòng chọn người xử lý chính!',
                [
                    { text: 'OK', onPress: () => { } }
                ]
            )
        } else if (allowChangeDeadline && _.isNull(workFlowProcessData.deadline)) {
            Alert.alert(
                'THÔNG BÁO',
                'Vui lòng chọn thời hạn xử lý!',
                [
                    { text: 'OK', onPress: () => { } }
                ]
            )
        } else {
            let processData = {
                docxType: this.props.workFlowState.workFlowProcessData.docxType,
                docxId: this.props.workFlowState.workFlowProcessData.docxId,
                userId: this.props.workFlowState.workFlowProcessData.userId,
                startStatus: this.props.workFlowState.workFlowProcessData.startStatus,
                endStatus: this.props.workFlowState.workFlowProcessData.endStatus,
                userProcessId: this.props.workFlowState.workFlowProcessData.userProcessId,
                deadline: this.props.workFlowState.workFlowProcessData.deadline,
                comment: this.props.workFlowState.workFlowProcessData.comment
            }
            this.props.executeWorkFlow(processData);
        }
    }

    componentDidUpdate = () => {
        const docxId = this.props.workFlowState.workFlowProcessData.docxId;
        const docxType = this.props.workFlowState.workFlowProcessData.docxType;
        const processResultMessage = this.props.workFlowState.workFlowProcessResult.message;
        const processResultStatus = this.props.workFlowState.workFlowProcessResult.status;
        
        if (!_.isEmpty(processResultMessage)) {
            //nếu cập nhật thành công gửi notify đến thiết bị của người dùng kia
            const groupTokens = this.props.workFlowState.workFlowProcessResult.groupTokens;
            if (!_.isEmpty(groupTokens)) {
                const message = this.props.userInfo.HoTen + " đã trình bạn 1 văn bản mới";
                const targetScreen = _.isEqual(docxType, IN_DOCX_TYPE_ID) ? 'DetailInDocxScreen' : 'DetailOutDocxScreen';
                const targetDocxId = docxId;

                const content = {
                    message,
                    targetScreen,
                    targetDocxId
                }

                groupTokens.forEach(token => {
                    this.sendRemoteNotification(token, content);
                });
            }

            //tải lại dữ liệu xử lý cũ
            this.props.refreshWorkFlow();
            Alert.alert(
                'THÔNG BÁO',
                processResultMessage,
                [
                    {
                        text: 'OK', onPress: () => {
                            //trở về trang danh sách đã xử lý
                            if (_.isEqual(docxType, IN_DOCX_TYPE_ID)) {

                                this.props.navigation.navigate('ListInDocxProcessedScreen');

                            } else if (_.isEqual(docxType, OUT_DOCX_TYPE_ID)) {
                                this.props.navigation.navigate('ListOutDocxNotProcessedScreen')
                            }
                        }
                    }
                ]
            )
        }
    }


    //hiển thị view
    render() {
        const workFlowType = this.props.workFlowState.workFlowType;
        let mainTabs = <TabNavigatorWorkFlowV1 />

        if (this.props.workFlowState.workFlowType == WORKFLOW_TYPE_2) {
            mainTabs = <TabNavigatorWorkFlowV2 />
        } else if (this.props.workFlowState.workFlowType == WORKFLOW_TYPE_3) {
            mainTabs = <TabNavigatorWorkFlowV3 />
        } else if (this.props.workFlowState.workFlowType == WORKFLOW_TYPE_4) {
            mainTabs = <TabNavigatorWorkFlowV4 />
        }

        return (
            <View style={this.defaultStyle.container}>
                <View style={this.defaultStyle.headerMain}>
                    <Header
                        innerContainerStyles={this.defaultStyle.headerMainInnerContainer}
                        backgroundColor={this.defaultModalHeaderBackgroundColor}
                        leftComponent={
                            <View style={this.defaultStyle.headerMainComponent}>
                                <TouchableOpacity onPress={() => this.goBack()}>
                                    <Icon name='arrow-bold-left' size={this.defaultMainHeaderRightIconSize} color={'#FFF'} type="entypo" />
                                </TouchableOpacity>
                            </View>
                        }
                        centerComponent={
                            <View tyle={this.defaultStyle.headerMainComponent}>
                                <Text style={this.defaultStyle.modalHeaderTitle}>
                                    {_.toUpper(this.props.workFlowState.workFlowCurrentStepName)}
                                </Text>
                            </View>
                        }
                        rightComponent={
                            <View style={this.defaultStyle.headerMainComponent}>
                                <TouchableOpacity onPress={() => this.processWorkFlow()}>
                                    <Icon name='check' size={this.defaultMainHeaderRightIconSize} color={'#FFF'} type="font-awesome" />
                                </TouchableOpacity>
                            </View>
                        }
                    />
                </View>

                <Divider style={this.defaultStyle.divider} />

                <View style={this.defaultStyle.bodyMain}>
                    {
                        mainTabs
                    }

                    {
                        processingEffect(this.props.workFlowState.executingWorkFlow)
                    }
                </View>
            </View>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userInfo: state.userState.userInfo,
        workFlowState: state.workFlowState,
        prevScreenName: state.workFlowState.prevScreenName,
        prevDocxId: state.workFlowState.prevDocxId
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        executeWorkFlow: (data) => dispatch(thunkExecuteWorkFlow(data)),
        refreshWorkFlow: () => dispatch(refreshWorkFlowExecuteState()),
        setPreviousNavigatorState: (screenName, docxId) => dispatch(setPreviousNavigatorState(screenName, docxId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ProcessScreenWorkFlow);