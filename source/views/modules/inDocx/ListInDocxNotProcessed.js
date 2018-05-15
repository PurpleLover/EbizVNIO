/**
 * @author: duynn
 * @class: danh sách văn bản đến chưa xử lý
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import {
    AsyncStorage, ActivityIndicator, FlatList, Image, Text, TextInput,
    TouchableOpacity, View, Modal
} from 'react-native';

//lib
import _ from 'lodash';
import { MenuProvider } from 'react-native-popup-menu';
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import renderIf from 'render-if';
import { connect } from 'react-redux';

import * as constant from '../../../common/constant.js';
import { getPageTitle } from '../../../common/utility';
import BaseComponent from '../../common/BaseComponent';

//utility
import { formatLongText } from '../../../common/utility';

//style
import { listInDocxStyle } from '../../../assets/styles/ListInDocxStyle'
import { filterStyle } from '../../../assets/styles/FilterStyle';
import { activityIndicatorSizeResponsive } from '../../../assets/styles/ScalingAndIndicating';

//thunk
import * as userThunk from '../../../redux/modules/user/userThunk';
import * as thunk from '../../../redux/modules/inDocx/inDocxThunk';
import * as action from '../../../redux/modules/inDocx/inDocxAction';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

//network
import Network from '../../modules/network/Network';


class ListInDocxNotProcessed extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {

            //filter
            showFilter: false,
            filterValue: constant.EMPTY_STRING,

            //data attribute
            data: [],
            pageSize: constant.DEFAULT_PAGE_SIZE,
            pageIndex: constant.DEFAULT_PAGE_INDEX,
            loading: false
        }
    }

    //sau khi tạo màn hình lấy dữ liệu hiển thị
    componentWillMount = () => {
        this.shouldComponentUpdate = () => true;
        this.fetchData();
    }

    /**
     * @description: điều hướng đến trang chi tiết
     * @param {} id 
     * @param {*} workflowButtons 
     */
    navigateToDetail(docxId) {
        this.props.navigation.navigate('DetailInDocxScreen', {
            docxId
        });
    }

    fetchData = async () => {
        this.setState({ loading: true });
        const response = await fetch(
            `${constant.DEFAULT_API_URL}/api/vanbanden/vanbanchuaxuly/${this.props.userId}/${constant.DEFAULT_PAGE_SIZE}/${this.state.pageIndex}?query=`
        );
        const json = await response.json();
        this.setState(state => ({
            data: [...state.data, ...json.ListItem],
            loading: false
        }));
    };

    handleEnd = () => {
        if (this.state.data.length >= 10) {
            this.setState(state => ({ pageIndex: state.pageIndex + 1 }), () => this.fetchData());
        }
    };

    //ẩn hoặc hiện tìm kiếm
    async toggleFilter() {
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
            this.props.setFilterInfo(this.state.filterValue, constant.IN_DOCX_NOT_PROCESSED);
            this.props.navigation.navigate('ListInDocxFilteredScreen');
        } else {
            this.toggleFilter();
        }
    }

    //hiển thị danh sách văn bản đến
    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.navigateToDetail(item.ID)}>
            <ListItem leftIcon={
                <View style={listInDocxStyle.leftContainer}>
                    {
                        renderIf(item.HAS_FILE)(
                            <Image source={uriAttachmentIcon} style={listInDocxStyle.leftIcon} />
                        )
                    }
                </View>
            }
                title={
                    <Text style={[listInDocxStyle.SOKYHIEU, item.IS_READ === true ? listInDocxStyle.SOKYHIEU_READ : listInDocxStyle.SOKYHIEU_NOT_READ]}>
                        {'SỐ  KÝ HIỆU: ' + item.SOKYHIEU}
                    </Text>
                }
                subtitle={
                    <Text style={[item.IS_READ === true ? listInDocxStyle.TRICHYEU_READ : listInDocxStyle.TRICHYEU_NOT_READ, listInDocxStyle.TRICHYEU]}>
                        {formatLongText(item.TRICHYEU, 50)}
                    </Text>
                }
            />
        </TouchableOpacity>
    )

    //hiển thị màn hình
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
                                        VĂN BẢN ĐẾN CHƯA XỬ LÝ
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
                                    <View style={listInDocxStyle.emptyDataBody}>
                                        <Image source={uriEmptyDataIcon} style={listInDocxStyle.emptyDataImage} />
                                        <Text style={listInDocxStyle.emptyDataMessage}>
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
                                    <TextInput placeholder="Số hiệu văn bản"
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

                <Network />
            </MenuProvider>
        );
    }
}


//kết nối view với store lưu giữ trạng thái toàn ứng dụng
let mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        docxType: state.inDocxState.docxType,
    }
}

let mapDispatchToProps = (dispatch) => {
    return {
        readDetail: () => dispatch(userThunk.thunkReadInDocxNotProcessedDetail()),
        setFilterInfo: (filterValue, filterDocxType) => dispatch(action.setFilterInfo(filterValue, filterDocxType))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ListInDocxNotProcessed);