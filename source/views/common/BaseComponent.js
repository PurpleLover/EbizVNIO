/**
 * @author: duynn
 * @class: lớp BaseComponent để các lớp View khác kế thừa
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { AppState, Alert, AsyncStorage, Text, View, NetInfo } from 'react-native';

import {
    width, height, HEX_WHITE_COLOR_CODE,
    ICON_SIZE, HEX_HEADER_ICON_COLOR_CODE,

    DEFAULT_SOCKET_URL,
    EMPTY_STRING,
    FIREBASE_CONFIG
} from '../../common/constant.js';
//socket io
// import io from 'react-native-socket.io-client';

//FCM
import FCM, { NotificationActionType } from "react-native-fcm";

import { registerAppListener } from '../../firebase/FireBaseListener';
import { sendNotify } from '../../firebase/FireBaseClient';

import { connect } from 'react-redux';

export default class BaseComponent extends Component {
    constructor(props) {
        super(props);

        this.defaultStyle = {
            container: {
                flex: 1
            }, headerMain: {
                height: height * 0.1
            }, headerMainInnerContainer: {
                alignItems: 'center'
            }, headerMainComponent: {
                alignItems: 'center',
                flexDirection: 'row'
            }, headerMainTitle: {
                color: '#005aab',
                fontWeight: 'bold',
                fontSize: 12
            }, bodyMain: {
                backgroundColor: '#fff',
                flex: 1,
            }, divider: {
                backgroundColor: '#e5e5e5'
            }, footerMain: {
                height: height * 0.1
            }, centerBodyMain: {
                backgroundColor: '#fff',
                flex: 1,
                alignItems: 'center',
                justifyContent: 'center'
            }, modalHeaderTitle: {
                color: '#fff',
                fontWeight: 'bold',
                fontSize: 12
            }
        };

        this.defaultMainHeaderBackgroundColor = HEX_WHITE_COLOR_CODE;

        this.defaultModalHeaderBackgroundColor = '#005aab';

        this.defaultMainHeaderRightIconSize = ICON_SIZE;
        this.defaultMainheaderRightIconColor = HEX_HEADER_ICON_COLOR_CODE;

        this.defaultMainHeaderLeftIconSize = ICON_SIZE;
        this.defaultMainHeaderLeftIconColor = HEX_HEADER_ICON_COLOR_CODE;

        this.emptyDataMessage = 'KHÔNG CÓ DỮ LIỆU';
    }

    //hiển thị menu bên tay trái
    showSideBar = () => {
        // this.props.navigation.navigate('DrawerOpen');
        this.props.navigation.openDrawer();
    }

    //ẩn menu bên tay trái
    closeSideBar = () => {
        this.props.navigation.navigate;
    }

    async componentDidMount() {
        registerAppListener(this.props.navigation);

        //thông báo mới nhất trước khi đóng app
        FCM.getInitialNotification().then(notif => {
            console.log('Initialize Notification', notif);
        });

        //yêu cầu quyền sử dụng
        try {
            const requestPermissionResult = await FCM.requestPermissions({
                badge: true,
                sound: true,
                alert: true
            });
        } catch (err) {
            console.log('Request Permission Error', err);
        }

        FCM.getFCMToken().then(token => {
            AsyncStorage.setItem('DeviceFCMToken', token);
        });
    }

    sendRemoteNotification(targetToken, content) {
        //for android only
        let body = {
            to: targetToken,
            data: {
                custom_notification: {
                    title: 'THÔNG BÁO',
                    body: content.message,
                    sound: 'default',
                    priority: 'high',
                    show_in_foreground: true,

                    //custom config
                    targetScreen: content.targetScreen,
                    targetDocxId: content.targetDocxId
                }
            },
            priority: 10
        };
        sendNotify(JSON.stringify(body), "notification");
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
            </View>
        );
    }
}