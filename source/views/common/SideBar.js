/**
 * @author: duynn
 * @class: màn hình menu bên tay trái
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import {
    Alert, AsyncStorage, Image, ImageBackground, ScrollView,
    Text, TouchableNativeFeedback, View
} from 'react-native';

import { List, ListItem, Badge } from 'react-native-elements';
import renderIf from 'render-if';
import BaseComponent from './BaseComponent';

//constants
import {
    IN_DOCX_NOT_PROCESSED, IN_DOCX_PROCESSED, IN_DOCX_JOIN_PROCESSED,
    OUT_DOCX_NOT_PROCESSED, OUT_DOCX_JOIN_PROCESSED
} from '../../common/constant';

//redux
import { connect } from 'react-redux';
import * as userThunk from '../../redux/modules/user/userThunk';
import * as userAction from '../../redux/modules/user/userAction';
import * as inDocxAction from '../../redux/modules/inDocx/inDocxAction';
import * as outDocxAction from '../../redux/modules/outDocx/outDocxAction';

/**
 * @style 
 */
import { sideBarStyle } from '../../assets/styles/SideBarStyle';

/**
 * @link images
 */
const uriButtonBack = require('../../assets/images/button-back.png');
const uriButtonSetting = require('../../assets/images/button-setting.png');
const uriAvatar = require('../../assets/images/avatar.png');
const uriCircleAvatar = require('../../assets/images/circle-avatar.png');
const uriAlertIcon = require('../../assets/images/button-alert.png');
const uriInDocxIcon = require('../../assets/images/button-delivery.png');
const uriOutDocxIcon = require('../../assets/images/button-transfer.png');
const uriButtonAccount = require('../../assets/images/button-account.png');
const uriButtonSignOut = require('../../assets/images/button-signout.png');

import Panel from './Panel';

class SideBar extends BaseComponent {
    constructor(props) {
        super(props);
    }

    //điều hướng văn bản đến
    navigateInDocx(type) {
        this.props.setInDocxType(type);
        let screenName = 'ListInDocxNotProcessedScreen';

        if (type == IN_DOCX_JOIN_PROCESSED) {
            screenName = 'ListInDocxJoinProcessedScreen';
        } else if (type == IN_DOCX_PROCESSED) {
            screenName = 'ListInDocxProcessedScreen';
        }

        this.props.navigation.navigate(screenName);
    }

    //điều hướng văn bản đi
    navigateOutDocx(type) {
        this.props.setOutDocxType(type);

        let screenName = 'ListOutDocxNotProcessedScreen';
        if (type == OUT_DOCX_JOIN_PROCESSED) {
            screenName = 'ListOutDocxJoinProcessedScreen'
        }

        this.props.navigation.navigate(screenName);
    }

    //điều hướng thông báo
    navigateNotify() {
        this.props.navigation.navigate('ListNotifyScreen');
    }

    //đăng xuất
    logOut = () => {
        Alert.alert(
            'ĐĂNG XUẤT',
            'Bạn có muốn thoát ứng dụng?',
            [
                { text: 'Không', onPress: () => true },
                {
                    text: 'Có', onPress: () => {
                        const userInfo = this.props.userInfo;
                        //vô hiệu hóa token của người dùng hiện tại
                        this.props.deActiveUserToken(userInfo.ID, userInfo.Token).then(() => {
                            AsyncStorage.removeItem('userInfo', () => {
                                this.props.navigation.navigate('LoadingScreen');
                            });
                        });
                    }
                },
            ],
            {
                cancelable: false
            }
        )
    }

    render() {
        //số lượng thông báo
        let notifycationBadge = this.props.notifyInfo.notifycationNumber > 0 ?
            (<Badge value={this.props.notifyInfo.notifycationNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        //số lượng văn bản đến chưa xử lý
        let inDocxNotProcessedBadge = this.props.notifyInfo.inDocxNotProcessedNumber > 0 ?
            (<Badge value={this.props.notifyInfo.inDocxNotProcessedNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        //số lượng văn bản đến đã xử lý
        let inDocxProcessedBadge = this.props.notifyInfo.inDocxProcessedNumber > 0 ?
            (<Badge value={this.props.notifyInfo.inDocxProcessedNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        //số lượng văn bản đến tham gia xử lý
        let inDoxcJoinProcessedBadge = this.props.notifyInfo.inDocxJoinProcessedNumber > 0 ?
            (<Badge value={this.props.notifyInfo.inDocxJoinProcessedNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        //số lượng văn bản đi chưa xử lý
        let outDocxNotProcessedBadge = this.props.notifyInfo.outDocxNotProcessedNumber > 0 ?
            (<Badge value={this.props.notifyInfo.outDocxNotProcessedNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);
        //số lượng văn bản đi tham gia xử  lý
        let outDocxJoinProcessedBadge = this.props.notifyInfo.outDocxJoinProcessedNumber > 0 ?
            (<Badge value={this.props.notifyInfo.outDocxJoinProcessedNumber}
                containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        return (
            <View style={this.defaultStyle.container}>
                <View style={sideBarStyle.header}>
                    <View style={sideBarStyle.headerNavigator}>
                        {/* <TouchableNativeFeedback background={TouchableNativeFeedback.SelectableBackground()}
                            onPress={() => this.closeSideBar()} >
                            <Image source={uriButtonBack} style={sideBarStyle.headerNavigatorIcon} />
                        </TouchableNativeFeedback> */}
                    </View>

                    <View style={sideBarStyle.headerProfile}>
                        <ImageBackground source={uriCircleAvatar} style={sideBarStyle.circleAvatar}>
                            <Image source={uriAvatar} style={sideBarStyle.avatar} />
                        </ImageBackground>
                        <Text style={sideBarStyle.headerProfileName}>
                            {this.props.userInfo.HoTen}
                        </Text>
                        <Text style={sideBarStyle.headerProfilePosition}>
                            Nhân viên phòng nhân sự
                        </Text>
                    </View>
                </View>

                <View style={sideBarStyle.body}>
                    <ScrollView>
                        <List containerStyle={sideBarStyle.listContainer}>
                            {/* thông báo */}
                            <TouchableNativeFeedback onPress={() => this.navigateNotify()}>
                                <ListItem
                                    leftIcon={
                                        <Image source={uriAlertIcon} style={sideBarStyle.itemIcon} />
                                    }
                                    rightIcon={
                                        notifycationBadge
                                    }
                                    containerStyle={sideBarStyle.itemContainer}
                                    roundAvatar
                                    title={
                                        <View style={sideBarStyle.titleContainer}>
                                            <Text style={sideBarStyle.titleText}>
                                                Thông báo
                                            </Text>
                                        </View>
                                    }
                                />
                            </TouchableNativeFeedback>

                            {/* văn bản đến */}
                            <Panel title='Văn bản đến' icon={uriInDocxIcon} number={this.props.notifyInfo.inDocxNumber}>
                                <View style={sideBarStyle.subContainer}>
                                    <TouchableNativeFeedback onPress={() => this.navigateInDocx(IN_DOCX_NOT_PROCESSED)}>
                                        <ListItem roundAvatar
                                            rightIcon={
                                                inDocxNotProcessedBadge
                                            }
                                            containerStyle={sideBarStyle.subItemContainer}
                                            title={
                                                <View style={sideBarStyle.subTitleContainer}>
                                                    <Text style={sideBarStyle.subTitleText}>
                                                        Văn bản đến chưa xử lý
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback onPress={() => this.navigateInDocx(IN_DOCX_PROCESSED)}>
                                        <ListItem roundAvatar
                                            rightIcon={
                                                inDocxProcessedBadge
                                            }
                                            containerStyle={sideBarStyle.subItemContainer}
                                            title={
                                                <View style={sideBarStyle.subTitleContainer}>
                                                    <Text style={sideBarStyle.subTitleText}>
                                                        Văn bản đến đã xử lý
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback onPress={() => this.navigateInDocx(IN_DOCX_JOIN_PROCESSED)}>
                                        <ListItem roundAvatar
                                            rightIcon={
                                                inDoxcJoinProcessedBadge
                                            }
                                            containerStyle={sideBarStyle.subItemContainer}
                                            title={
                                                <View style={sideBarStyle.subTitleContainer}>
                                                    <Text style={sideBarStyle.subTitleText}>
                                                        Văn bản đến tham gia xử lý
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </TouchableNativeFeedback>
                                </View>
                            </Panel>

                            {/* văn bản đi */}
                            <Panel title='Văn bản đi' icon={uriOutDocxIcon} number={this.props.notifyInfo.outDocxNumber}>
                                <View style={sideBarStyle.subContainer}>
                                    <TouchableNativeFeedback onPress={() => this.navigateOutDocx(OUT_DOCX_NOT_PROCESSED)}>
                                        <ListItem roundAvatar
                                            rightIcon={
                                                outDocxNotProcessedBadge
                                            }
                                            containerStyle={sideBarStyle.subItemContainer}
                                            title={
                                                <View style={sideBarStyle.subTitleContainer}>
                                                    <Text style={sideBarStyle.subTitleText}>
                                                        Văn bản đi chưa xử lý
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </TouchableNativeFeedback>

                                    <TouchableNativeFeedback onPress={() => this.navigateOutDocx(OUT_DOCX_JOIN_PROCESSED)}>
                                        <ListItem roundAvatar
                                            rightIcon={
                                                outDocxJoinProcessedBadge
                                            }
                                            containerStyle={sideBarStyle.subItemContainer}
                                            title={
                                                <View style={sideBarStyle.subTitleContainer}>
                                                    <Text style={sideBarStyle.subTitleText}>
                                                        Văn bản đi tham gia xử lý
                                                    </Text>
                                                </View>
                                            }
                                        />
                                    </TouchableNativeFeedback>
                                </View>
                            </Panel>

                            {/* đăng xuất */}
                            <TouchableNativeFeedback onPress={() => this.logOut()}>
                                <ListItem roundAvatar
                                    leftIcon={
                                        <Image source={uriButtonSignOut} style={sideBarStyle.itemIcon} />
                                    }
                                    containerStyle={sideBarStyle.itemContainer}
                                    hideChevron={true}
                                    title={
                                        <View style={sideBarStyle.titleContainer}>
                                            <Text style={sideBarStyle.titleText}>
                                                Đăng xuất
                                            </Text>
                                        </View>
                                    }
                                />
                            </TouchableNativeFeedback>
                        </List>
                    </ScrollView>
                </View>
            </View>
        );
    }
}

//kết nối view với store
let mapStateToProps = (state) => {
    return {
        userInfo: state.userState.userInfo,
        notifyInfo: state.userState.notifyInfo
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        deActiveUserToken: (userId, token) => dispatch(userThunk.thunkDeActiveToken(userId, token)),
        setInDocxType: (docxType) => dispatch(inDocxAction.setDocxType(docxType)),
        setOutDocxType: (docxType) => dispatch(outDocxAction.setDocxType(docxType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(SideBar);

