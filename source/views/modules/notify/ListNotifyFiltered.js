/**
 * @author: duynn
 * @class: danh sách kết quả tìm kiếm thông báo
 * @since: 19/04/2018
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';

//lib
import _ from 'lodash';
import { MenuProvider } from 'react-native-popup-menu';
import { Divider, Header, Icon, List, ListItem } from 'react-native-elements';
import renderIf from 'render-if';
import { connect } from 'react-redux';

//utility
import * as constant from '../../../common/constant';
import { getPageTitle } from '../../../common/utility';
import BaseComponent from '../../common/BaseComponent';
import { formatLongText } from '../../../common/utility';

//styles
import { listNotifyStyle } from '../../../assets/styles/ListNotifyStyle';
import { filterStyle } from '../../../assets/styles/FilterStyle';
import { activityIndicatorSizeResponsive } from '../../../assets/styles/ScalingAndIndicating';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

class ListNotifyFiltered extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            data: [],
            page: constant.DEFAULT_PAGE_INDEX,
            loading: false,

            filterInfo: this.props.filterInfo
        };
    }

    //lấy dữ liệu từ server
    fetchData = async () => {
        this.setState({ loading: true });
        const response = await fetch(
            `${constant.DEFAULT_API_URL}/api/notify/GetByUser/${this.props.userId}/${constant.DEFAULT_PAGE_SIZE}/${this.state.page}?query=${this.state.filterInfo}`
        );
        
        const json = await response.json();      
        this.setState(state => ({
            data: [...state.data, ...json],
            loading: false
        }));
    };

    //xóa tiêu chí tìm kiếm
    clearFilter() {
        this.setState({
            filterInfo: constant.EMPTY_STRING
        });
    }

    //tìm kiếm văn bản
    onFilter() {
        if (!_.isNull(this.state.filterInfo) && !_.isEmpty(this.state.filterInfo)) {
            this.setState({
                data: [],
                page: constant.DEFAULT_PAGE_INDEX,
            }, () => {
                this.fetchData(this.state.filterInfo);
            })
        }
    }

    //trở về
    onGoBack() {
        let screenName = 'ListNotifyScreen';
        this.props.navigation.navigate(screenName);
    }

    //sau khi các component được mount
    componentDidMount(){
    	this.fetchData(this.state.filterInfo);
    }

    //sự kiện khi người dùng mount đến cuối trang
    handleEnd(){
    	 if (this.state.data.length >= 10) {
            this.setState(state => ({ page: state.page + 1 }), () => this.fetchData(this.state.filterInfo));
        }
    }

    //điều hướng đến trang chi tiết
    navigateToDetail(notifyId) {
        this.props.navigation.navigate('DetailNotifyScreen', {
            notifyId
        });
    }

    //hiển thị từng dòng thông báo
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.navigateToDetail(item.ID)}>
                <ListItem
                    leftIcon={
                        <View style={[listNotifyStyle.circleTitle, item.IS_READ === true ? listNotifyStyle.circleTitleRead : listNotifyStyle.circleTitleNotRead]}>
                            <Text style={[listNotifyStyle.circleTitleText]}>
                                {_.toUpper(item.TIEUDE[0])}
                            </Text>
                        </View>
                    }
                    title={
                        <Text style={(item.IS_READ === true ? listNotifyStyle.TIEUDE_READ : listNotifyStyle.TIEUDE)}>
                            {item.TIEUDE}
                        </Text>
                    }
                    subtitle={item.NOIDUNG}
                    rightIcon={
                        <Text style={listNotifyStyle.rightText}>
                            {item.NGAYGUI_TEXT}
                        </Text>
                    }
                />
            </TouchableOpacity>
        );
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
            	<View style={this.defaultStyle.headerMain}>
            		<Header
                            backgroundColor={'#fff'}
                            leftComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.onGoBack()}>
                                        <Icon name='arrow-left'
                                            size={this.defaultMainHeaderRightIconSize}
                                            color={'#888'}
                                            type="material-community" />
                                    </TouchableOpacity>
                                </View>
                            }
                            centerComponent={
                                <View style={[this.defaultStyle.headerMainComponent, { justifyContent: 'center' }]}>
                                    <TextInput placeholder="Tiêu đề hoặc tên người gửi"
                                        value={this.state.filterInfo}
                                        onChangeText={(filterInfo) => this.setState({ filterInfo })}
                                        onSubmitEditing={() => this.onFilter()}
                                        style={filterStyle.filterInput}
                                        placeholderTextColor={'#888'} />
                                </View>
                            }
                            rightComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.clearFilter()}>
                                        <Icon name='close'
                                            size={this.defaultMainHeaderRightIconSize}
                                            color={'#888'}
                                            type="material-community" />
                                    </TouchableOpacity>
                                </View>
                            }
                        />
            	</View>
            	<Divider style={this.defaultStyle.divider} />
            	<View style={this.defaultStyle.bodyMain}>
                        <FlatList
                            onEndReached={() => this.handleEnd()}
                            onEndReachedThreshold={0.1}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                            ListFooterComponent={() => this.state.loading ? <ActivityIndicator size={activityIndicatorSizeResponsive} animating color={this.defaultMainheaderRightIconColor} /> : null}
                            data={this.state.data}

                            ListEmptyComponent={() =>
                                this.state.loading ? null : (
                                    <View style={listNotifyStyle.emptyDataBody}>
                                        <Image source={uriEmptyDataIcon} style={listNotifyStyle.emptyDataImage} />
                                        <Text style={listNotifyStyle.emptyDataMessage}>
                                            {this.emptyDataMessage}
                                        </Text>
                                    </View>
                                )
                            }
                        />
                    </View>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        filterInfo: state.notifyState.filterInfo
    }
}

export default connect(mapStateToProps, null)(ListNotifyFiltered);