/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import { AppRegistry, View, Text } from 'react-native';
import { Provider } from 'react-redux';

import BaseComponent from './source/views/common/BaseComponent';
import { CommonStackNavigator } from './source/views/common/CommonStackNavigator';

import { commonStore } from './source/redux/common/store';

// import App from './source/test/DemoFCM/App'
// import App from './source/test/DemoPanels/App';

export default class EbizVNIO extends Component {
	render() {
		return (
			<Provider store={commonStore}>
				<View style={{ flex: 1 }}>
					<CommonStackNavigator />
				</View>
			</Provider>
		);
	}
}



AppRegistry.registerComponent('EbizVNIO', () => EbizVNIO);
