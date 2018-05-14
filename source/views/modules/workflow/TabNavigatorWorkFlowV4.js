/**
 * @author: duynn
 * @since: 19/03/2018
 * @description: màn hình xử lý workflow dạng 4
 */
import React, { Component } from 'react';
import { Text, View } from 'react-native';
import { TabNavigator } from 'react-navigation';
import CommentWorkFlow from '../../modules/workflow/CommentWorkFlow';

//styles
import { workFlowLabelStyle } from '../../../assets/styles/WorkFlowStyle';

const router = {
    CommentScreen: {
        screen: CommentWorkFlow
    }
}

const config = {
    navigationOptions: ({ navigation }) => ({
        tabBarLabel: ({ focused, tintColor }) => {
            const { routeName } = navigation.state;
            let label = '';
            if (routeName === 'CommentScreen') {
                label = 'GHI CHÚ';
            }
            return <Text style={workFlowLabelStyle.tabLabel}>{label}</Text>
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


export default TabNavigatorWorkFlowV4 = new TabNavigator(router, config);

