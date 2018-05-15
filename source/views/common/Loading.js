/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: màn hình tải dữ liệu
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, AsyncStorage, Image, ImageBackground, Text, View } from 'react-native';
import BaseComponent from './BaseComponent';
import * as docxTypes from '../../common/constant';

//lib
import _ from 'lodash';

//redux
import { connect } from 'react-redux';

//actions
import * as action from '../../redux/modules/user/userAction';
import * as thunk from '../../redux/modules/user/userThunk';

//styles
import { loadingStyle } from '../../assets/styles/LoadingStyle';
import { activityIndicatorSizeResponsive } from '../../assets/styles/ScalingAndIndicating';
import * as util from 'lodash';

//images
const uriBackgroundImage = require('../../assets/images/background-login.png');
const uriCompanyLogo = require('../../assets/images/logo-hinet.png');

class Loading extends Component {
    constructor(props) {
        super(props);
        this.state = {
            userInfo: {},
            hasLogin: false,
            notifyCount: 0,
            loading: false
        }
    }

    componentDidMount = async () => {
        //kiểm tra người dùng đã đăng nhập trên hệ thống chưa
        AsyncStorage.getItem('userInfo').then(result => {
            if (!_.isNull(result)) {
                const userInfo = JSON.parse(result);
                this.props.setUserInfo(userInfo);
                this.props.getUserNotifyData(userInfo.ID).then(() => {
                    this.props.navigation.navigate('ListInDocxNotProcessedScreen');
                });
            } else {
                this.props.navigation.navigate('LoginScreen');
            }
        });

        // Ngulon happends
        // this.setState({
        //     loading: true
        // })
        // console.log('before fetch')
        // const rss = await fetch('http://192.168.1.16:8098/api/notify/count/471')
        // .then(response => response.json())
        // .then(responseJson => {
        //     return responseJson;
        // })
        // .catch(err=>alert(err));

        // alert(rss);
        // // const request = await fetch('http://192.168.1.16:8098/api/notify/count/471');
        // // const json = await request.json();

        // // alert(json);
    }

    //hiển thị giao diện
    render() {
        return (
            <ImageBackground source={uriBackgroundImage} style={loadingStyle.background}>
                <View style={loadingStyle.container}>
                    <View style={loadingStyle.header}>
                        <Image source={uriCompanyLogo} style={loadingStyle.logo} />
                        <Text style={loadingStyle.headerSubTitle}>
                            HỆ THỐNG QUẢN LÝ VĂN BẢN
                        </Text>
                    </View>

                    <View style={loadingStyle.body}>
                        <ActivityIndicator color={(util.isNumber(this.state.notifyCount) && this.state.notifyCount > 0) ? '#f00' : '#fff'} size={activityIndicatorSizeResponsive} />
                        <Text>
                            {this.state.result}
                        </Text>
                    </View>
                </View>
            </ImageBackground>
        );
    }
}

//kết nối view với store
let mapDispatchToProps = (dispatch) => {
    return {
        setUserInfo: (user) => dispatch(action.setUserInfo(user)),
        getUserNotifyData: (userId) => dispatch(thunk.thunkGetDataNumber(userId))
    }
}

export default connect(null, mapDispatchToProps)(Loading);