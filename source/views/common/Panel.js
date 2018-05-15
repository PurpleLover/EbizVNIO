'use strict'
import React, { Component } from 'react';
import { Animated, View, Text, TouchableOpacity, StyleSheet, Image } from 'react-native';

import { ListItem, Badge } from 'react-native-elements';
import { sideBarStyle } from '../../assets/styles/SideBarStyle';

export default class Panel extends Component {
    constructor(props) {
        super(props);

        this.icons = {
            'up': require('../../assets/images/button-up.png'),
            'down': require('../../assets/images/button-down.png')
        }

        this.state = {
            number: props.number,
            icon: props.icon,
            title: props.title,
            expanded: false,
            animation: new Animated.Value(60),
            isShow: false,
        }
    }

    toggle() {
        const initialValue = this.state.expanded ? (this.state.minHeight + this.state.maxHeight) : this.state.minHeight;
        const finalValue = this.state.expanded ? this.state.minHeight : (this.state.minHeight + this.state.maxHeight);

        this.setState({
            expanded: !this.state.expanded,
            isShow: !this.state.isShow,
        });

        this.state.animation.setValue(initialValue);

        Animated.spring(this.state.animation, {
            toValue: finalValue
        }).start();
    }

    setMinHeight(event) {
        this.setState({
            minHeight: event.nativeEvent.layout.height
        });
    }

    setMaxHeight(event) {
        this.setState({
            maxHeight: event.nativeEvent.layout.height
        });
    }

    render() {
        let icon = this.icons['down'];
        if (this.state.expanded) {
            icon = this.icons['up'];
        }

        const badge = this.props.number > 0 ? (<Badge value={this.props.number}
            containerStyle={sideBarStyle.badgeContainer} textStyle={sideBarStyle.badgeText} />) :
            (<Text />);

        const thisChildren = this.state.isShow ? this.props.children : null;

        return (
            <Animated.View style={[styles.container, { height: this.state.animation }]}>
                <View style={styles.titleContainer} onLayout={this.setMinHeight.bind(this)}>
                    <TouchableOpacity onPress={() => this.toggle()}>
                        <ListItem
                            containerStyle={sideBarStyle.itemContainer}
                            leftIcon={
                                <Image source={this.state.icon} style={sideBarStyle.itemIcon} />
                            }
                            rightIcon={
                                badge
                            }
                            title={
                                <View style={sideBarStyle.titleContainer}>
                                    <Text style={sideBarStyle.titleText}>
                                        {this.state.title}
                                    </Text>

                                    <Image source={icon} style={sideBarStyle.toggleIcon} />
                                </View>
                            } />
                    </TouchableOpacity>
                </View>
                {/*
                  * thisFunction
                  * onLayout={this.setMaxHeight.bind(this)}
                */}
                <View 
                    style={styles.body} 
                    
                >
                    {thisChildren}
                </View>
            </Animated.View>
        );
    }
}


const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }, titleContainer: {
    }, body: {
        //backgroundColor: 'red',
    }
});
