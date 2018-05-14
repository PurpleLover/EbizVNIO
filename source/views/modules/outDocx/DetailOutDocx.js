/**
 * @author: duynn
 * @class: thông tin chi tiết văn bản đi
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, Text, View, TouchableOpacity } from 'react-native';
import BaseComponent from '../../common/BaseComponent';
import TabNavigatorOutDocx from './TabNavigationOutDocx';

//redux
import { connect } from 'react-redux';
import { thunkGetDetailOutDocx } from '../../../redux/modules/outDocx/outDocxThunk';
import { thunkGetWorkFlow } from '../../../redux/modules/workFlow/workFlowThunk';

import * as outDocxThunk from '../../../redux/modules/outDocx/outDocxThunk';
import * as workFlowThunk from '../../../redux/modules/workFlow/workFlowThunk';
import * as workFlowAction from '../../../redux/modules/workFlow/workFlowAction';

//lib
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import {
    Menu, MenuProvider, MenuTrigger,
    MenuOption, MenuOptions, renderers
} from 'react-native-popup-menu';
import renderIf from 'render-if';
import ScrollableTabView, { DefaultTabBar } from 'react-native-scrollable-tab-view';

//constants
import {
    IN_DOCX_TYPE_ID, OUT_DOCX_TYPE_ID, WORKFLOW_TYPE_1,
    WORKFLOW_TYPE_2, WORKFLOW_TYPE_3, WORKFLOW_TYPE_4,
    OUT_DOCX_JOIN_PROCESSED, OUT_DOCX_NOT_PROCESSED
} from '../../../common/constant';

//styles
import { workflowMenuStyle } from '../../../assets/styles/WorkflowMenuStyle';

import { processingEffect } from '../../../common/effect';

class DetailOutDocx extends BaseComponent {

    constructor(props) {
        super(props);

        let { params } = this.props.navigation.state;
        this.state = {
            docxId: params.docxId
        }
    }

    //trở về trang trước
    goBack() {
        let screenName = 'ListOutDocxNotProcessedScreen';
        if(this.props.docxType == OUT_DOCX_JOIN_PROCESSED){
            screenName = 'ListOutDocxJoinProcessedScreen'
        }
        this.props.navigation.navigate(screenName);
    }

    //sau khi giao diện đã được render
    componentDidMount = () => {
        this.props.getDetailOutDocx(this.state.docxId, this.props.userId);
    }

    //lấy dữ liệu workflow
    getWorkFlow(workFlowStepName, allowChangeDeadline, startStatus, endStatus) {
        let docxId = this.props.detailOutDocx.ID;
        let userId = this.props.userId;

        this.props.getWorkFlow(workFlowStepName, allowChangeDeadline,
            OUT_DOCX_TYPE_ID, docxId, userId, startStatus, endStatus).then(() => {
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
                                <MenuOption style={workflowMenuStyle.menuOption}
                                    key={index} onSelect={() => this.getWorkFlow(item.TENBUOC, item.IS_ALLOW_CHANGE_DEADLINE, item.TRANGTHAI_1, item.TRANGTHAI_2)}>
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
                                        THÔNG TIN VĂN BẢN ĐI
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
                            renderIf(this.props.gettingDetailOutDocx)(
                                <View style={this.defaultStyle.centerBodyMain}>
                                    <ActivityIndicator size={'large'}
                                        color={this.defaultMainheaderRightIconColor} />
                                </View>
                            )
                        }

                        {/* tải xong dữ liệu */}

                        {
                            renderIf(!this.props.gettingDetailOutDocx)(
                                <TabNavigatorOutDocx />
                            )
                        }

                        {/* hiệu ứng lấy thông tin luồng xử lý*/}
                        
                        {
                            processingEffect(this.props.workFlowState.gettingWorkFlow)
                        }
                    </View>
                </View>
            </MenuProvider>
        );
    }
}

let mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        docxType: state.outDocxState.docxType,
        detailOutDocx: state.outDocxState.detailOutDocx,
        gettingDetailOutDocx: state.outDocxState.gettingDetailOutDocx,
        workflowButtons: state.outDocxState.workflowButtons,
        workFlowState: state.workFlowState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        getDetailOutDocx: (docxId, userId) => dispatch(thunkGetDetailOutDocx(docxId, userId)),
        getWorkFlow: (workFlowStepName, allowChangeDeadline, docxType, docxId, userId, startStatus, endStatus) => dispatch(workFlowThunk.thunkGetWorkFlow(workFlowStepName, allowChangeDeadline, docxType, docxId, userId, startStatus, endStatus))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DetailOutDocx);