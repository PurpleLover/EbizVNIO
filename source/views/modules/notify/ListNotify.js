/**
 * @author: duynn
 * @class: danh sách thông báo
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import {
    ActivityIndicator, FlatList, Image, Text, TextInput,
    TouchableOpacity, View, Modal
} from 'react-native';

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

//redux
import * as action from '../../../redux/modules/notify/notifyAction';
import * as userThunk from '../../../redux/modules/user/userThunk'

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

class ListNotify extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            showFilter: false,
            filterValue: constant.EMPTY_STRING,

            data: [],
            pageSize: constant.DEFAULT_PAGE_SIZE,
            pageIndex: constant.DEFAULT_PAGE_INDEX,
            loading: false
        }
    }

    fetchData = async () => {
        this.setState({ loading: true });
        const response = await fetch(
            `${constant.DEFAULT_API_URL}/api/notify/GetByUser/${this.props.userId}/${constant.DEFAULT_PAGE_SIZE}/${this.state.pageIndex}?query=`
        );
        const json = await response.json();
        this.setState(state => ({
            data: [...state.data, ...json],
            loading: false
        }));
    };

    handleEnd = () => {
        if (this.state.data.length >= 10) {
            this.setState(state => ({ pageIndex: state.pageIndex + 1 }), () => this.fetchData());
        }
    };

    //sau khi tạo màn hình lấy dữ liệu hiển thị
    componentWillMount = () => {
        this.shouldComponentUpdate = () => true;
        this.fetchData();
    }

    //điều hướng đến trang chi tiết
    navigateToDetail(notifyId, isRead) {
        if (!isRead) {
            this.props.readNotifyDetail().then(() => {
                this.props.navigation.navigate('DetailNotifyScreen', {
                    notifyId
                });
            })
        } else {
            this.props.navigation.navigate('DetailNotifyScreen', {
                notifyId
            });
        }
    }


    //hiển thị từng dòng thông báo
    renderItem = ({ item }) => {
        return (
            <TouchableOpacity onPress={() => this.navigateToDetail(item.ID, item.IS_READ)}>
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

    //ẩn hoặc hiện tìm kiếm
    toggleFilter() {
        this.setState({
            showFilter: !this.state.showFilter,
            filterValue: !this.state.showFilter ? constant.EMPTY_STRING : this.state.filterValue
        });
    }

    //xóa giá trị tìm kiếm
    clearFilter() {
        this.setState({
            filterValue: constant.EMPTY_STRING
        });
    }

    //tìm kiếm văn bản
    onFilter() {
        if (!_.isNull(this.state.filterValue) && !_.isEmpty(this.state.filterValue)) {
            this.props.setFilterInfo(this.state.filterValue);
            this.props.navigation.navigate('ListNotifyFilteredScreen');
        } else {
            this.toggleFilter();
        }
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
                                    <TouchableOpacity onPress={() => this.showSideBar()}>
                                        <Icon name='menu' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="entypo" />
                                    </TouchableOpacity>
                                </View>
                            }
                            centerComponent={
                                <View tyle={this.defaultStyle.headerMainComponent}>
                                    <Text style={this.defaultStyle.headerMainTitle}>
                                        THÔNG BÁO
                                    </Text>
                                </View>
                            }
                            rightComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.toggleFilter()}>
                                        <Icon name='ios-search' size={this.defaultMainHeaderRightIconSize} color={this.defaultMainHeaderLeftIconColor} type="ionicon" />
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

                {/* KHUNG TÌM KIẾM VĂN BẢN */}

                <Modal animationType="slide"
                    transparent={true}
                    visible={this.state.showFilter}
                    onRequestClose={() => { }}>
                    <View style={filterStyle.filterBody}>
                        <Header
                            backgroundColor={'#fff'}
                            leftComponent={
                                <View style={this.defaultStyle.headerMainComponent}>
                                    <TouchableOpacity onPress={() => this.toggleFilter()}>
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
                                        value={this.state.filterValue}
                                        onChangeText={(filterValue) => this.setState({ filterValue })}
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
                        <Divider style={this.defaultStyle.divider} />
                    </View>
                </Modal>
            </MenuProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        notifyState: state.notifyState
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        readNotifyDetail: () => dispatch(userThunk.thunkReadNotifyDetail()),
        setFilterInfo: (filterInfo) => dispatch(action.setFilterInfo(filterInfo))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListNotify);