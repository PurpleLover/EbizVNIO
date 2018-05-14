/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: màn hình thời hạn xử lý của văn bản (nếu có)
 */

import React, { Component } from 'react';
import {
    DatePickerAndroid, Image, StyleSheet,
    Text, TextInput, TouchableOpacity, View
} from 'react-native';

//redux
import { connect } from 'react-redux';
import { setDeadline } from '../../../redux/modules/workFlow/workFlowAction';


//base
import BaseComponent from '../../common/BaseComponent';
import { EMPTY_STRING } from '../../../common/constant';

//images
const uriCalendar = require('../../../assets/images/calendar_icon.png');

class DeadLineWorkFlow extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            deadline: EMPTY_STRING
        }
    }

    //chọn ngày xử lý
    async openAndroidDatePicker() {
        try {
            const { action, year, month, day } = await DatePickerAndroid.open({
                date: new Date(this.state.date)
            });
            if (action !== DatePickerAndroid.dismissedAction) {
                if (day < 10) {
                    day = '0' + day;
                }
                if (month < 10) {
                    month = '0' + (month + 1);
                }
                let deadline = day + '/' + month + '/' + year;
                this.setState({
                    deadline
                }, () => {
                    this.props.setDeadline(deadline);
                });
            }
        } catch ({ code, message }) {
            console.warn('Có lỗi xảy ra xin vui lòng thử  lại', message);
        }
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <View style={this.defaultStyle.bodyMain}>
                    <View style={styles.calendarContainer}>
                        <View style={styles.calendarInputContainer}>
                            <TextInput style={styles.calendarInput} editable={true} underlineColorAndroid={'transparent'}
                                value={this.state.deadline} placeholder='dd/mm/yyyy' placeholderTextColor='#ccc' />
                        </View>
                        <View style={styles.calendarIconContainer}>
                            <TouchableOpacity onPress={() => this.openAndroidDatePicker()}>
                                <Image source={uriCalendar} style={styles.calendarIcon} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    calendarContainer: {
        marginTop: 20,
        flexDirection: 'row'
    }, calendarInputContainer: {
        flex: 8,
        paddingHorizontal: 10
    }, calendarInput: {
        fontSize: 16,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.15)'
    }, calendarIconContainer: {
        flex: 2
    }, calendarIcon: {
        width: 40,
        height: 40
    }
});

let mapStateToProps = (state) => {
    return {
        workFlowProcessData: state.workFlowState.workFlowProcessData
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        setDeadline: (deadline) => dispatch(setDeadline(deadline))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(DeadLineWorkFlow);
