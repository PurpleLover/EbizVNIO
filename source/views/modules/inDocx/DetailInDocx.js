/**
 * @author: duynn
 * @class: thông tin chi tiết văn bản đến
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, Modal, Text, TouchableOpacity, View } from 'react-native';
import BaseComponent from '../../common/BaseComponent';

import TabNavigatorInDocx from './TabNavigatorInDocx';

//views
import CommentWorkFlow from '../../../views/modules/workflow/CommentWorkFlow';
import DeadLineWorkFlow from '../../../views/modules/workflow/DeadLineWorkFlow';
import UsersProcessWorkFlow from '../../../views/modules/workflow/UsersProcessWorkFlow';

//redux
import { connect } from 'react-redux';
import * as inDocxThunk from '../../../redux/modules/inDocx/inDocxThunk';
import * as workFlowThunk from '../../../redux/modules/workFlow/workFlowThunk';
import * as workFlowAction from '../../../redux/modules/workFlow/workFlowAction';
//lib
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import {
    Menu, MenuProvider, MenuTrigger,
    MenuOption, MenuOptions, renderers
} from 'react-native-popup-menu';
import renderIf from 'render-if';
import ScrollableTabView, { DefaultTabBar, } from 'react-native-scrollable-tab-view';
import _ from 'lodash';

//constants
import {
    IN_DOCX_TYPE_ID, OUT_DOCX_TYPE_ID, WORKFLOW_TYPE_1,
    WORKFLOW_TYPE_2, WORKFLOW_TYPE_3, WORKFLOW_TYPE_4, IN_DOCX_JOIN_PROCESSED, IN_DOCX_NOT_PROCESSED, IN_DOCX_PROCESSED
} from '../../../common/constant';

//styles
import { workflowMenuStyle } from '../../../assets/styles/WorkflowMenuStyle';

//effect
import { processingEffect } from '../../../common/effect';

class DetailInDocx extends BaseComponent {

    constructor(props) {
        super(props);
        this.state = {
            docxId: this.props.navigation.state.params.docxId
        }
    }

    //quay trở về
    goBack = () => {
        const docxType = this.props.docxType;
        let screenName = 'ListInDocxNotProcessedScreen';

        if (docxType == IN_DOCX_JOIN_PROCESSED) {
            screenName = 'ListInDocxJoinProcessedScreen';
        } else if (docxType == IN_DOCX_PROCESSED) {
            screenName = 'ListInDocxProcessedScreen';
        }

        this.props.navigation.navigate(screenName);
    }

    //sau khi render giao diện
    componentDidMount = () => {
        this.props.getDetailInDocx(this.state.docxId, this.props.userId);
    }

    //lấy dữ liệu workflow
    getWorkFlow(workFlowStepName, allowChangeDeadline, startStatus, endStatus) {
        let docxId = this.props.detailInDocx.ID;
        let userId = this.props.userId;

        this.props.getWorkFlow(workFlowStepName, allowChangeDeadline,
            IN_DOCX_TYPE_ID, docxId, userId, startStatus, endStatus).then(() => {
                this.props.navigation.navigate('ProcessScreenWorkFlowScreen');
            });
    }

    render() {
        var rightComp = (
            <View></View>
        );

        if (this.props.workflowButtons != null && this.props.workflowButtons.length > 0) {
            rightComp = (
                <Menu>
                    <MenuTrigger>
                        <View style={this.defaultStyle.headerMainComponent}>
                            <Icon name='dots-three-horizontal' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="entypo" />
                        </View>
                    </MenuTrigger>
                    <MenuOptions style={workflowMenuStyle.menuOptions}>
                        {
                            this.props.workflowButtons.map((item, index) => (
                                <MenuOption style={workflowMenuStyle.menuOption} key={index}
                                    onSelect={() => this.getWorkFlow(item.TENBUOC, item.IS_ALLOW_CHANGE_DEADLINE, item.TRANGTHAI_1, item.TRANGTHAI_2)}>
                                    <Text style={workflowMenuStyle.menuOptionText}>
                                        {item.TENBUOC}
                                    </Text>
                                </MenuOption>
                            ))
                        }
                    </MenuOptions>
                </Menu>
            );
        }

        return (
            <MenuProvider style={this.defaultStyle.container}>
                <View style={this.defaultStyle.container}>
                    <View style={this.defaultStyle.headerMain}>
                        <Header
                            innerContainerStyles={{ alignItems: 'center' }}
                            backgroundColor={this.defaultMainHeaderBackgroundColor}
                            leftComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.goBack()}>
                                        <Icon name='arrow-bold-left' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="entypo" />
                                    </TouchableOpacity>
                                </View>
                            }
                            centerComponent={
                                <View tyle={this.defaultStyle.headerMainComponent}>
                                    <Text style={this.defaultStyle.headerMainTitle}>
                                        THÔNG TIN VĂN BẢN ĐẾN
                                    </Text>
                                </View>
                            }
                            rightComponent={
                                rightComp
                            }
                        />
                    </View>
                    <Divider style={this.defaultStyle.divider} />

                    <View style={this.defaultStyle.bodyMain}>
                        {/* tải dữ liệu */}

                        {
                            renderIf(this.props.gettingDetailInDocx)(
                                <View style={this.defaultStyle.centerBodyMain}>
                                    <ActivityIndicator size={'large'}
                                        color={this.defaultMainheaderRightIconColor} />
                                </View>
                            )
                        }

                        {/* tải xong dữ liệu */}

                        {
                            renderIf(!this.props.gettingDetailInDocx)(
                                <TabNavigatorInDocx />
                            )
                        }

                        {/* hiệu ứng tải dữ liệu luồng công việc */}

                        {
                            processingEffect(this.props.workFlowState.gettingWorkFlow)
                        }
                    </View>

                    {/* hiệu ứng lấy dữ liệu luồng xử lý */}
                </View>
            </MenuProvider>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        docxType: state.inDocxState.docxType,
        gettingDetailInDocx: state.inDocxState.gettingDetailInDocx,
        detailInDocx: state.inDocxState.detailInDocx,
        workflowButtons: state.inDocxState.workflowButtons,
        workFlowState: state.workFlowState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getDetailInDocx: (docxId, userId) => dispatch(inDocxThunk.thunkGetDetailInDocx(docxId, userId)),
        getWorkFlow: (workFlowStepName, allowChangeDeadline, docxType, docxId, userId, startStatus, endStatus) => dispatch(workFlowThunk.thunkGetWorkFlow(workFlowStepName, allowChangeDeadline, docxType, docxId, userId, startStatus, endStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailInDocx);