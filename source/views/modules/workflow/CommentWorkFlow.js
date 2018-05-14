/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: màn hình nhập ghi chú cho luồng xử lý
 */

import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View } from 'react-native';

//redux
import { connect } from 'react-redux';
import { setComment } from '../../../redux/modules/workFlow/workFlowAction'

//base
import BaseComponent from '../../common/BaseComponent';

class CommentWorkFlow extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //khi nhập ghi chú
    onChangeCommentText = (value) => {
        this.props.setComment(value);
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <View style={this.defaultStyle.bodyMain}>
                    <TextInput style={commentStyles.commentInput} underlineColorAndroid={'transparent'}
                        onChangeText={(value) => this.onChangeCommentText(value)}
                        placeholder='Nhập ghi chú' placeholderTextColor='#ccc'
                        maxLength={255} multiline={true} numberOfLines={5} />
                </View>
            </View>
        );
    }
}

const commentStyles = StyleSheet.create({
    commentInput: {
        marginTop: 20,
        fontSize: 16,
        color: '#000',
        borderBottomWidth: 1,
        borderBottomColor: 'rgba(0,0,0,.15)'
    }
});

let mapDispatchToProps = (dispatch) => {
    return {
        setComment: (comment) => dispatch(setComment(comment))
    }
}

export default connect(null, mapDispatchToProps)(CommentWorkFlow);
