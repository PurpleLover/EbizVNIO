/**
 * @description: màn hình tài liệu đính kèm của văn bản đến
 * @author: duynn
 * @since: 20/04/2018
 */

import React, { Component } from 'react';
import { Alert, View, ScrollView, Text, FlatList, Image, TouchableOpacity } from 'react-native';

//lib
import _ from 'lodash';
import { List, ListItem, Icon } from 'react-native-elements';

//fetch blob
import RNFetchBlob from 'react-native-fetch-blob';

//redux
import { connect } from 'react-redux';

//styles
import { mainInfoStyle } from '../../../assets/styles/DetailOutDocxStyle';
import { listInDocxStyle, listOutDocxStyle } from '../../../assets/styles/ListOutDocxStyle';

//utility
import BaseComponent from '../../common/BaseComponent';
import * as constant from '../../../common/constant';
import { formatLongText } from '../../../common/utility';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

class AttachmentOutDocx extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            attachments: []
        }
    }

    componentDidMount() {
        this.setState({
            attachments: this.props.attachments
        });
    }

    downloadFile(fileName, fileUrl, mimeType) {
        if (!_.isNull(fileUrl) && !_.isEmpty(fileUrl)) {
            mimeType = mimeType || 'text/plain';
            const host = constant.DEFAULT_WEB_URL;

            //sửa lại đường dẫn
            fileUrl = fileUrl.replace(/\\/g, "/").replace('\\\\', '/');
            const finalFileUrl = host + '/Uploads' + fileUrl;

            //tải file xuống
            RNFetchBlob.config({
                addAndroidDownloads: {
                    useDownloadManager: true,
                    notification: true,
                    mediaScannable: true,
                    title: fileName,
                    mime: mimeType,
                    description: 'Tải tài liệu đính kèm của văn bản đến'
                }
            }).fetch('GET', finalFileUrl)
                .then((response) => {
                    response.path();
                }).catch((errr) => {

                });

        } else {
            Alert.alert(
                'THÔNG BÁO',
                'Không thể tải xuống! Đường dẫn file không hợp lệ.',
                [
                    { text: 'OK', onPress: () => { } }
                ]
            )
        }
    }

    renderItem = ({ item }) => (
        <ListItem
            leftIcon={
                <View style={listOutDocxStyle.leftContainer}>
                    <Image source={uriAttachmentIcon} style={listOutDocxStyle.leftIcon} />
                </View>
            }

            rightIcon={
                <View style={listOutDocxStyle.leftContainer}>
                    <TouchableOpacity onPress={() => this.downloadFile(item.TENTAILIEU, item.DUONGDAN_FILE, item.DINHDANG_FILE)}>
                        <Icon name='download' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="entypo" />
                    </TouchableOpacity>
                </View>
            }
            title={formatLongText(item.TENTAILIEU)}
        />
    );

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <ScrollView>
                    <FlatList
                        data={this.state.attachments}
                        renderItem={this.renderItem}
                        keyExtractor={(item, index) => index.toString()}
                        ListEmptyComponent={() =>
                            <View style={listOutDocxStyle.emptyDataBody}>
                                <Image source={uriEmptyDataIcon} style={listOutDocxStyle.emptyDataImage} />
                                <Text style={listOutDocxStyle.emptyDataMessage}>
                                    {this.emptyDataMessage}
                                </Text>
                            </View>
                        }
                    />
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        attachments: state.outDocxState.attachments
    }
}

export default connect(mapStateToProps, null)(AttachmentOutDocx);