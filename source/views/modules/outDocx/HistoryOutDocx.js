/**
 * @author: duynn
 * @class: lịch sử xử lý văn bản đi
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';

import _ from 'lodash';
import Timeline from 'react-native-timeline-listview';

import { EMPTY_STRING } from '../../../common/constant';
import { convertDateToString } from '../../../common/utility';
import BaseComponent from '../../common/BaseComponent';

//redux
import { connect } from 'react-redux';

class HistoryOutDocx extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            outDocxHistory: [],
            outDocxHistoryTimeline: []
        }
    }

    componentDidMount = () => {
        this.setState({
            outDocxHistory: this.props.outDocxHistory
        }, () => {
            let timeline = [];
            let histories = this.state.outDocxHistory;
            for (let i = 0; i < histories.length; i++) {
                let executer = EMPTY_STRING;
                if (!_.isNull(histories[i].ListNhanVienXuLyChinh) && histories[i].ListNhanVienXuLyChinh.length > 0) {
                    executer = histories[i].ListNhanVienXuLyChinh[0].HOTEN;
                }

                let item = {
                    time: convertDateToString(histories[i].NGAYTAO),
                    title: histories[i].TEN_TRANGTHAI_2,
                    description: 'Người nhận: ' + executer,
                    subDescription: 'Người xử lý: ' + histories[i].TEN_NGUOIXULY,
                }
                timeline.push(item);
            }
            this.setState({
                outDocxHistoryTimeline: timeline
            });
        });
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <ScrollView>
                    <Timeline
                        circleSize={20}
                        circleColor='#005aab'
                        lineColor='#005aab'
                        timeContainerStyle={{ width: 100, marginLeft: 5 }}
                        timeStyle={{
                            fontSize: 10,
                            textAlign: 'center',
                            color: 'white',
                            paddingHorizontal: 5,
                            paddingVertical: 10,
                            fontWeight: 'bold',
                            backgroundColor: '#888',
                            borderRadius: 10
                        }}
                        options={{
                            style: { marginTop: 10, marginHorizontal: 5 }
                        }}
                        innerCircle={'dot'}
                        data={this.state.outDocxHistoryTimeline}
                    />
                </ScrollView>
            </View>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        outDocxHistory: state.outDocxState.workflowHistory
    }
}

export default connect(mapStateToProps, null)(HistoryOutDocx);
