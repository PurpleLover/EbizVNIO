import React, { Component } from 'react';
import { View, Text, StyleSheet, StatusBar, ListView } from 'react-native';

//native-base
import { Container, Content, Header, Button, Form, Input, Item, Label, Icon, List, ListItem } from 'native-base';

//firebase
import * as firebase from 'firebase';

//config
import { FIREBASE_CONFIG, EMPTY_STRING } from '../common/constant.js'

firebase.initializeApp(FIREBASE_CONFIG);

export default class DemoSwipeableToDo extends Component {
	constructor(props) {
	  super(props);
	
	  this.ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
	  this.state = {
	  	listViewData: [],
	  	newContact: EMPTY_STRING
	  }
	}

	addRow(data){
		var key = firebase.database().ref('/contacts').push().key
  		firebase.database().ref('/contacts').child(key).set({ name: data })
	}

	async deleteRow(secId, rowId, rowMap, data){
		await firebase.database().ref('/contacts/' + data.key).set(null);

		rowMap[`${secId}${rowId}`].props.closeRow();

		var newData = [...this.state.listViewData];
		newData.splice(rowId, 1);
		this.setState({
			listViewData: newData
		});
	}

	showInformation(){

	}

	componentDidMount(){
		// const comp = this;

		// firebase.database().ref('/contacts').on('child_added', function(data){
		// 	let newData = [...comp.state.listViewData];
		// 	newData.push(data);
		// 	comp.setState({
		// 		listViewData: newData
		// 	});
		// });
	}

    render() {
        return (
            <Container style={styles.container}>
            	<Header style={{marginTop: StatusBar.currentHeigt, backgroundColor: '#fff'}}>
            		<Content>
            			<Item>
            				<Input placeholder="Add name" 
            					onChangeText={(newContact) => this.setState({newContact})} />

            				<Button onPress={()=> this.addRow(this.state.newContact)}>
            					<Icon name="add"/>
            				</Button>
            			</Item>
            		</Content>
            	</Header>

            	<Content>
            		<List enableEmptySections dataSource={this.ds.cloneWithRows(this.state.listViewData)}
	            		renderRow={data => 
	            			<ListItem>
	            				<Text>
	            					{data.val().name}
	            				</Text>
	            			</ListItem>
	            		}

	            		renderLeftHiddenRow={data => 
	            			<Button full info>
	            				<Icon name='information-circle'/>
	            			</Button>
	            		}

	            		renderRightHiddenRow={(data, secId, rowId, rowMap) => 
	            			<Button full danger onPress={()=> this.deleteRow(secId, rowId, rowMap, data)}>
	            				<Icon name='trash'/>
	            			</Button>
	            		}
	            		leftOpenValue={-75}
	            		rightOpenValue={-75}
            		/>
            	</Content>
           	</Container>
        );
    }
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: '#fff'
	}
});