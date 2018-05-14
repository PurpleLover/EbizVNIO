/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: danh sách nhân viên xử lý luồng công việc(nếu có)
 */

import React, { Component } from 'react';
import { FlatList, ScrollView, StyleSheet, Text, View } from 'react-native';

//redux
import { connect } from 'react-redux';
import { setUserProcess } from '../../../redux/modules/workFlow/workFlowAction';

//base
import BaseComponent from '../../common/BaseComponent';

//lib
import { RadioGroup, RadioButton } from 'react-native-flexi-radio-button';
import { Divider } from 'react-native-elements';

class UsersProcessWorkFlow extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //chọn người dùng
    selectUserProcess = (userId, index) => {
        //lấy thông tin người dùng được chọn
        const userProcess = this.props.workflowUserProcess[index].listWfUsers.find((item) => {
            return item.DM_NGUOIDUNG_ID == userId;
        });
        this.props.setUserProcess(userId, userProcess.token);
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <View style={[this.defaultStyle.centerBodyMain]}>
                    {/* danh sách người xử lý chính với nút radio */}
                    <ScrollView>
                        <FlatList keyExtractor={(item, index) => item.ID}
                            data={this.props.workflowUserProcess}
                            renderItem={({ item }) => (
                                <RadioGroup highlightColor='#eaeaea' onSelect={(index, value) => this.selectUserProcess(value, index)}>
                                    {
                                        item.listWfUsers.map((user, i) => (
                                            <RadioButton value={user.DM_NGUOIDUNG_ID} key={user.DM_NGUOIDUNG_ID}
                                                style={styles.radioWorkFlow}>
                                                <Text key={user.DM_NGUOIDUNG_ID}>
                                                    <Text style={styles.textWorkFlowUsrName}>
                                                        {user.HOTEN + " "}
                                                    </Text>
                                                    <Text style={styles.textWorkFlowDeptName}>
                                                        ({user.tenPhongBan})
                                                    </Text>
                                                </Text>
                                            </RadioButton>
                                        ))
                                    }
                                </RadioGroup>
                            )}
                        />
                    </ScrollView>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    radioWorkFlow: {
        padding: 5,
        alignSelf: 'stretch',
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5',
    }, textWorkFlowDeptName: {
        color: 'black',
        fontWeight: 'bold'
    }, textWorkFlowUsrName: {
        color: 'black',
    }
});

let mapStateToProps = (state) => {
    return {
        workflowUserProcess: state.workFlowState.workflowUserProcess
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setUserProcess: (userId, userToken) => dispatch(setUserProcess(userId, userToken))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersProcessWorkFlow);