/**
 * @author: duynn
 * @class: quản lý các đường dẫn trong ứng dụng
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';

import { DrawerNavigator } from 'react-navigation';

import { width } from '../../common/constant';
/**
 * màn hình văn bản đến chưa xử lý + đã xử lý + tham gia xử lý
 */
import ListInDocxJoinProcessed from '../modules/inDocx/ListInDocxJoinProcessed';
import ListInDocxNotProcessed from '../modules/inDocx/ListInDocxNotProcessed';
import ListInDocxProcessed from '../modules/inDocx/ListInDocxProcessed';

import ListInDocxFiltered from '../modules/inDocx/ListInDocxFiltered';
/**
 * màn hình văn bản đi tham gia xử lý + chưa xử lý
 */
import ListOutDocxJoinProcessed from '../modules/outDocx/ListOutDocxJoinProcessed';
import ListOutDocxNotProcessed from '../modules/outDocx/ListOutDocxNotProcessed';
import ListOutDocxFiltered from '../modules/outDocx/ListOutDocxFiltered';

/**
 * chi tiết văn bản đi + văn bản đến
 */
import DetailInDocx from '../modules/inDocx/DetailInDocx';
import DetailOutDocx from '../modules/outDocx/DetailOutDocx';

/**
 * danh sách + chi tiết thông báo
 */
import ListNotify from '../modules/notify/ListNotify';
import DetailNotify from '../modules/notify/DetailNotify';
import ListNotifyFiltered from '../modules/notify/ListNotifyFiltered';

import Login from '../modules/user/Login';
import Loading from '../common/Loading';
import BaseComponent from '../common/BaseComponent';
import SideBar from './SideBar';

import ProcessScreenWorkFlow from '../modules/workflow/ProcessScreenWorkFlow';

const routes = {
    BaseScreen: {
        screen: BaseComponent
    }
    , ListInDocxJoinProcessedScreen: {
        screen: ListInDocxJoinProcessed
    }, ListInDocxNotProcessedScreen: {
        screen: ListInDocxNotProcessed
    }, ListInDocxProcessedScreen: {
        screen: ListInDocxProcessed
    }, ListInDocxFilteredScreen: {
        screen: ListInDocxFiltered
    }, ListOutDocxJoinProcessedScreen: {
        screen: ListOutDocxJoinProcessed
    }, ListOutDocxNotProcessedScreen: {
        screen: ListOutDocxNotProcessed
    },ListOutDocxFilteredScreen: {
        screen: ListOutDocxFiltered
    }, DetailInDocxScreen: {
        screen: DetailInDocx
    }, DetailOutDocxScreen: {
        screen: DetailOutDocx
    }, ListNotifyScreen: {
        screen: ListNotify
    }, DetailNotifyScreen: {
        screen: DetailNotify
    }, ListNotifyFilteredScreen: {
        screen: ListNotifyFiltered
    },
    LoadingScreen: {
        screen: Loading
    }, LoginScreen: {
        screen: Login,
        navigationOptions: {
            drawerLockMode: 'locked-closed'
        }
    }, ProcessScreenWorkFlowScreen: {
        screen: ProcessScreenWorkFlow
    }
}

const config = {
    headerMode: 'none',
    initialRouteName: 'LoadingScreen',
    drawerWidth: width * 0.9,
    contentComponent: props => <SideBar {...props} />
}

export const CommonStackNavigator = DrawerNavigator(routes, config);
