/**
 * @author: duynn
 * @class: màn hình đăng nhập hệ thống
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import {
    ActivityIndicator, Alert, AsyncStorage, Image, ImageBackground, Keyboard,
    ScrollView, Text, TextInput, TouchableHighlight, View
} from 'react-native';

//lib
import _ from 'lodash';

//redux
import { connect } from 'react-redux';

//actions
import * as userThunk from '../../../redux/modules/user/userThunk';
import * as userAction from '../../../redux/modules/user/userAction';

import BaseComponent from '../../common/BaseComponent';
import { EMPTY_STRING, DEFAULT_API_URL } from '../../../common/constant';

/**
 * style
 */
import { loginStyle } from '../../../assets/styles/LoginStyle';

//lib
import renderIf from 'render-if';

//FCM
import FCM, { FCMEvent } from "react-native-fcm";

/**
 * đường dẫn đến ảnh
 */
const uriBackgroundImage = require('../../../assets/images/background-login.png');
const uriCompanyLogo = require('../../../assets/images/logo-hinet.png');
const uriUserNameIcon = require('../../../assets/images/user-name.png');
const uriPasswordIcon = require('../../../assets/images/password.png');
const uriLoginButton = require('../../../assets/images/login-button.png');

import * as docxTypes from '../../../common/constant';

class Login extends Component {
    constructor(props) {
        super(props);

        this.state = {
            userName: EMPTY_STRING,
            password: EMPTY_STRING,
            scrollFlex: 1,
            token: EMPTY_STRING,
            loading: false
        }

        //==> ?
        // this._keyboardDidHide = this._keyboardDidHide.bind(this);
        // this._keyboardDidShow = this._keyboardDidShow.bind(this);
    }

    //==> ?
    _keyboardDidShow() {
        // this.setState({
        //     scrollFlex: 0
        // })
    }

    //==> ?
    _keyboardDidHide() {
        // this.setState({
        //     scrollFlex: 1
        // })
    }

    //đăng nhập
    login = async () => {
        this.setState({
            loading: true
        });
        const result = await fetch(DEFAULT_API_URL + '/api/Account/Login', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json; charset=utf-8',
            },
            body: JSON.stringify({
                userName: this.state.userName,
                passWord: this.state.password
            })
        }).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        }).catch(err => {
            alert(err);
        })

        if(!_.isNull(result)){
            this.setState({
                loading: false
            });

            AsyncStorage.setItem('userInfo', JSON.stringify(result)).then(()=> {
                this.props.navigation.navigate('ListInDocxNotProcessedScreen');
            });
            
        }

        // return false;
        // const json = await result.json();
        // if (!_.isNull(json)) {
        //     const userInfo = json;

        //     //tạo token cho thiết bị nếu lần đầu đăng nhập
        //     FCM.getFCMToken().then(token => {
        //         userInfo.Token = token;
        //     });

        //     //token lần đầu thường bị null nên sẽ phải reset lại
        //     if (_.isNull(this.state.token) || _.isEmpty(this.state.token)) {
        //         FCM.on(FCMEvent.RefreshToken, token => {
        //             userInfo.Token = token;
        //         });
        //     }

        //     AsyncStorage.setItem('userInfo', JSON.stringify(userInfo)).then(() => {
        //         this.props.setUserInfo(userInfo);
        //         this.props.getUserNotifyData(userInfo.ID).then(() => {
        //             //lưu thông tin token vào database
        //             this.props.activeUserToken(userInfo.ID, userInfo.Token).then((result) => {
        //                 if (result) {
        //                     this.props.navigation.navigate('ListInDocxNotProcessedScreen');
        //                 } else {
        //                     this.setState({
        //                         loading: false
        //                     });

        //                     Alert.alert(
        //                         'THÔNG BÁO',
        //                         'Hệ thống đang cập nhật! Vui lòng trở lại sau!',
        //                         [
        //                             {
        //                                 text: 'OK', onPress: () => { }
        //                             }
        //                         ]
        //                     )
        //                 }
        //             });
        //         });
        //     });
        // } else {
        //     this.setState({
        //         loading: false
        //     });
        //     Alert.alert(
        //         'THÔNG BÁO',
        //         'Tên đăng nhập hoặc mật khẩu không chính xác! Vui lòng thử  lại!',
        //         [
        //             {
        //                 text: 'OK', onPress: () => { }
        //             }
        //         ]
        //     )
        // }

    }

    //hiển thị nội dung trang
    render() {
        return (
            <ImageBackground source={uriBackgroundImage} style={{ flex: 1 }}>
                <ScrollView contentContainerStyle={{ flex: this.state.scrollFlex, justifyContent: 'center' }}>
                    <View style={loginStyle.container}>
                        <View style={loginStyle.header}>
                            <Image source={uriCompanyLogo} style={loginStyle.logo} />
                            <Text style={loginStyle.headerMainTitle}>
                                ĐĂNG NHẬP
                            </Text>
                            <Text style={loginStyle.headerSubTitle}>
                                HỆ THỐNG QUẢN LÝ VĂN BẢN
                            </Text>
                        </View>

                        {/* thông tin đăng nhập */}
                        {
                            renderIf(this.state.loading)(
                                <View style={loginStyle.indicatorBody}>
                                    <ActivityIndicator color={'#fff'} size={'large'} />
                                </View>
                            )
                        }

                        {
                            renderIf(!this.state.loading)(
                                <View style={loginStyle.body}>
                                    <View style={loginStyle.inputContainer}>

                                        {/* tên người dùng */}
                                        <View style={loginStyle.userNameContainer}>
                                            <View style={loginStyle.inputIconContainer}>
                                                <Image source={uriUserNameIcon} style={loginStyle.inputIcon} />
                                            </View>
                                            <TextInput style={loginStyle.input}
                                                onChangeText={(value) => this.setState({
                                                    userName: value
                                                })}
                                                defaultValue={this.state.userName}
                                                underlineColorAndroid='transparent'
                                                placeholder='Tên đăng nhập'
                                                placeholderTextColor='#999' />
                                        </View>

                                        {/* mật khẩu */}
                                        <View style={loginStyle.passwordContainer}>
                                            <View style={loginStyle.inputIconContainer}>
                                                <Image source={uriPasswordIcon} style={loginStyle.inputIcon} />
                                            </View>
                                            <TextInput style={loginStyle.input}
                                                secureTextEntry={true}
                                                onChangeText={(value) => this.setState({
                                                    password: value
                                                })}
                                                defaultValue={this.state.passWord}
                                                underlineColorAndroid='transparent' placeholder='Mật khẩu'
                                                placeholderTextColor='#999' />
                                        </View>
                                    </View>

                                    {/* nút đăng nhập + quên mật khẩu */}
                                    <TouchableHighlight style={loginStyle.button} onPress={() => this.login()}>
                                        <ImageBackground source={uriLoginButton} style={loginStyle.buttonBackground}>
                                            <Text style={loginStyle.buttonText}>
                                                ĐĂNG NHẬP
                                            </Text>
                                        </ImageBackground>
                                    </TouchableHighlight>

                                    <TouchableHighlight style={loginStyle.buttonForgotPassword}>
                                        <Text style={loginStyle.forgotPasswordText} >
                                            Quên mật khẩu?
                                        </Text>
                                    </TouchableHighlight>
                                </View>
                            )
                        }
                    </View>
                </ScrollView>
            </ImageBackground>
        );
    }
}

//kết nối view với store
let mapStateToProps = (state) => {
    return {
        userState: state.userState
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        login: (userName, password) => dispatch(userThunk.thunkLogin(userName, password)),
        setUserInfo: (userInfo) => dispatch(userAction.setUserInfo(userInfo)),
        getUserNotifyData: (userId) => dispatch(userThunk.thunkGetDataNumber(userId)),
        activeUserToken: (userId, token) => dispatch(userThunk.thunkActiveToken(userId, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);
