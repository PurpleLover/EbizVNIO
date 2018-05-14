'use strict'
import React, { Component } from 'react';
import {
    StyleSheet, Text, TouchableOpacity,
    FlatList, Image, StatusBar, View
} from 'react-native';

//lib
import DropdownAlert from 'react-native-dropdownalert';

//constants
const MAIN_INFO_COLOR = '#2B73B6';
const MAIN_WARN_COLOR = '#cd853f';
const MAIN_ERROR_COLOR = '#cc3232';
const MAIN_SUCCESS_COLOR = '#32A54A';
const MAIN_CUSTOM_COLOR = '#6441A4';
const MAIN_DISMISS_COLOR = '#748182';

export default class DemoDropdownAlert extends Component {

    constructor(props) {
        super(props);

        const items = [
            {
                key: 0,
                backgroundColor: MAIN_INFO_COLOR,
                type: 'info', title: 'Info',
                message: 'System is going down at 12 AM tonight for routine maintenance. We\'ll notify you when the system is back online.'
            }
        ]

        this.state = {
            items
        }
    }

    renderItem = ({ item }) => {
        return (
            <TouchableOpacity style={[styles.button, { borderColor: item.backgroundColor }]} onPress={() => this.showAlert(item)}>
                <Text style={[styles.text, { color: item.backgroundColor }]}>
                    {item.title}
                </Text>
            </TouchableOpacity>
        );
    }


    render() {
        const { items } = this.state;

        return (
            <View style={styles.container}>
                <StatusBar backgroundColor='blue' barStyle="light-content" />

                <FlatList style={styles.listContainer}
                    data={items}
                    renderItem={this.renderItem}
                />

                <DropdownAlert
                    ref={(ref) => {
                        this.dropdown = ref;
                    }}
                    containerStyle={{
                        backgroundColor: MAIN_CUSTOM_COLOR
                    }}
                    showCancel={true}
                    onClose={(data) => this.onClose(data)}
                    onCancel={(data) => this.onClose(data)}
                    imageSrc={'https://facebook.github.io/react/img/logo_og.png'}
                />
            </View>
        );
    }

    showAlert(item){
        if(item.type =='close'){
            this.closeAlert();
        }else{
            const random = Math.floor((Math.random() * 1000) + 1);
            const title = item.title + '#' + random;
            this.dropdown.alertWithType(item.type, title, item.message);
        }
    }

    closeAlert(){
        this.dropdown.close();
    }

    onClose(){

    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#222222'
    },
    listContainer: {
        paddingTop: 22
    },
    button: {
        padding: 8,
        alignItems: 'center',
        borderRadius: 8,
        margin: 8,
        backgroundColor: '#222222',
        borderWidth: 1,
    },
    text: {
        fontSize: 20,
        textAlign: 'center',
        color: 'white',
        fontWeight: 'bold',
    },
});