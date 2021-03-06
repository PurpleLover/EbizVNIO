import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import MainInfoOutDocx from './MainInfoOutDocx';
import HistoryOutDocx from './HistoryOutDocx';
import AttachmentOutDocx from './AttachmentOutDocx';

const router = {
    InfoScreen: {
        screen: MainInfoOutDocx
    }, HistoryScreen: {
        screen: HistoryOutDocx
    }, AttachmentScreen: {
        screen: AttachmentOutDocx
    }
}

const config = {
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let label = '';
            if (routeName == 'InfoScreen') {
                label = 'THÔNG TIN CHÍNH';
            } else if (routeName == 'HistoryScreen') {
                label = 'LỊCH SỬ XỬ LÝ';
            }else if(routeName == 'AttachmentScreen'){
                label = 'TÀI LIỆU ĐÍNH KÈM';
            }
            return <Text style={{ color: '#fff', fontWeight: 'bold' }}>{label}</Text>
        }
    }),
    tabBarOptions: {
        labelStyle: {
            fontWeight: 'bold'
        }, style: {
            backgroundColor: '#015aaa'
        }
    }, animationEnabled: true,
    swipeEnabled: true
}

export default TabNavigatorOutDocx = TabNavigator(router, config);