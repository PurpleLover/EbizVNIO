/**
 * @author: duynn
 * @class: thông tin chi tiết thông báo
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { Text, View, TouchableOpacity, ActivityIndicator } from 'react-native';
import BaseComponent from '../../common/BaseComponent';

//redux
import { connect } from 'react-redux';
import * as thunk from '../../../redux/modules/notify/notifyThunk';

//lib
import _ from 'lodash';
import { MenuProvider } from 'react-native-popup-menu';
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import renderIf from 'render-if';

//styles
import { detailNotifyStyle } from '../../../assets/styles/DetailNotifyStyle';

class DetailNoitfy extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            notifyId: this.props.navigation.state.params.notifyId
        }
    }

    goBack() {
        this.props.navigation.navigate('ListNotifyScreen');
    }

    componentDidMount() {
        this.props.getDetailNotify(this.state.notifyId);
    }

    render() {
        return (
            <MenuProvider style={this.defaultStyle.container}>
                <View style={this.defaultStyle.container}>
                    <View style={this.defaultStyle.headerMain}>
                        <Header
                            innerContainerStyles={this.defaultStyle.headerMainInnerContainer}
                            backgroundColor={this.defaultMainHeaderBackgroundColor}
                            leftComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.goBack()}>
                                        <Icon name='arrow-bold-left' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="entypo" />
                                    </TouchableOpacity>
                                </View>
                            }
                            centerComponent={
                                <View tyle={this.defaultStyle.headerMainComponent}>
                                    <Text style={this.defaultStyle.headerMainTitle}>
                                        NỘI DUNG THÔNG BÁO
                                    </Text>
                                </View>
                            }
                            rightComponent={
                                <View>
                                </View>
                            }
                        />
                    </View>
                    <Divider style={this.defaultStyle.divider} />

                    <View style={this.defaultStyle.bodyMain}>
                        {
                            renderIf(this.props.notifyState.gettingDetailNotify)(
                                <View style={detailNotifyStyle.body}>
                                    <ActivityIndicator size={'large'}
                                        color={this.defaultMainheaderRightIconColor} />
                                </View>
                            )
                        }

                        {
                            renderIf(!this.props.notifyState.gettingDetailNotify)(
                                <View style={this.defaultStyle.bodyMain}>
                                    <View style={detailNotifyStyle.title}>
                                        <Text style={detailNotifyStyle.titleText}>
                                            {this.props.detailNotify.TIEUDE}
                                        </Text>
                                    </View>
                                    <Divider style={this.defaultStyle.divider} />
                                    <ListItem
                                        hideChevron={true}
                                        leftIcon={
                                            <View style={[detailNotifyStyle.circleTitle]}>
                                                <Text style={[detailNotifyStyle.circleTitleText]}>
                                                    {_.toUpper(this.props.detailNotify.TEN_NGUOIGUI == null ? "" : this.props.detailNotify.TEN_NGUOIGUI[0])}
                                                </Text>
                                            </View>
                                        }
                                        title={this.props.detailNotify.TEN_NGUOIGUI}
                                        subtitle={this.props.detailNotify.NGAYGUI_TEXT}
                                    />
                                    <View style={detailNotifyStyle.content}>
                                        <Text style={detailNotifyStyle.contentText}>
                                            {this.props.detailNotify.NOIDUNG}
                                        </Text>
                                    </View>
                                </View>
                            )
                        }
                    </View>
                </View>
            </MenuProvider>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        userInfo: state.userState.userInfo,
        notifyState: state.notifyState,
        detailNotify: state.notifyState.detailNotify
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getDetailNotify: (id) => dispatch(thunk.thunkGetDetailNotify(id))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(DetailNoitfy);