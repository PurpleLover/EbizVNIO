/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: màn hình xử lý workflow dạng 2
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';

import UsersProcessWorkFlow from '../../modules/workflow/UsersProcessWorkFlow';
import CommentWorkFlow from '../../modules/workflow/CommentWorkFlow';

//styles
import { workFlowLabelStyle } from '../../../assets/styles/WorkFlowStyle';

const router = {
    UserProcessScreen: {
        screen: UsersProcessWorkFlow
    }, CommentScreen: {
        screen: CommentWorkFlow
    }
}

const config = {
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let tabLabel = null;
            if (routeName === 'UserProcessScreen') {
                tabLabel = <Text style={workFlowLabelStyle.tabLabel}>{'NGƯỜI XỬ LÝ'}<Text style={workFlowLabelStyle.importantLabel}>*</Text></Text>
            }else if (routeName === 'CommentScreen') {
                tabLabel = <Text  style={workFlowLabelStyle.tabLabel}>{'GHI CHÚ'}</Text>;
            }
            return tabLabel;
        }
    }), tabBarOptions: {
        style: {
            backgroundColor: '#fff',
        }, indicatorStyle: {
            backgroundColor: '#015aaa',
        }
    },
    animationEnabled: true,
    swipeEnabled: true
}

export default TabNavigatorWorkFlowV2 = new TabNavigator(router, config);



