/**
 * @author: duynn
 * @class: danh sách văn bản đi chưa xử lý
 * @since: 16/03/2018
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableNativeFeedback, TouchableOpacity, View, Modal } from 'react-native';

//lib
import _ from 'lodash';
import renderIf from 'render-if';
import { MenuProvider } from 'react-native-popup-menu';
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import * as constant from '../../../common/constant';

//redux
import { connect } from 'react-redux';
import * as thunk from '../../../redux/modules/outDocx/outDocxThunk';
import * as action from '../../../redux/modules/outDocx/outDocxAction';

//style
import { listOutDocxStyle } from '../../../assets/styles/ListOutDocxStyle';
import { filterStyle } from '../../../assets/styles/FilterStyle';

//utility
import { formatLongText } from '../../../common/utility';
import BaseComponent from '../../common/BaseComponent';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

class ListOutDocxNotProcessed extends BaseComponent {
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
        };
    }

    componentDidMount() {
        this.fetchData();
    }

    //chuyển đến trang chi tiết
    navigateToDetail = (docxId) => {
        this.props.navigation.navigate('DetailOutDocxScreen', {
            docxId
        });
    }

    fetchData = async () => {
        this.setState({ loading: true });
        const response = await fetch(
            `${constant.DEFAULT_API_URL}/api/vanbandi/vbchuaxuly/${this.props.userId}/${constant.DEFAULT_PAGE_SIZE}/${this.state.pageIndex}?query=`
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
            this.props.setFilterInfo(this.state.filterValue, constant.OUT_DOCX_NOT_PROCESSED);
            this.props.navigation.navigate('ListOutDocxFilteredScreen');
        } else {
            this.toggleFilter();
        }
    }

    //hiển thị từng dòng văn bản
    renderItem = ({ item }) => (
        <TouchableNativeFeedback onPress={() => this.navigateToDetail(item.ID)}>
            <ListItem leftIcon={
                <View style={listOutDocxStyle.leftContainer}>
                    {
                        renderIf(item.HAS_FILE)(
                            <Image source={uriAttachmentIcon} style={listOutDocxStyle.leftIcon} />
                        )
                    }
                </View>
            }
                title={
                    <Text style={[listOutDocxStyle.SOKYHIEU, item.IS_READ === true ? listOutDocxStyle.SOKYHIEU_READ : listOutDocxStyle.SOKYHIEU_NOT_READ]}>
                        {'SỐ HIỆU : ' + (item.SOHIEU === null ? "Chưa cập nhật" : item.SOHIEU)}
                    </Text>
                }
                subtitle={
                    <Text style={[item.IS_READ === true ? listOutDocxStyle.TRICHYEU_READ : listOutDocxStyle.TRICHYEU_NOT_READ, listOutDocxStyle.TRICHYEU]}>
                        {formatLongText(item.TRICHYEU, 50)}
                    </Text>
                }
            />
        </TouchableNativeFeedback>
    )

    //mount màn hình danh sách
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
                                        VĂN BẢN ĐI CHƯA XỬ LÝ
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
                            ListFooterComponent={() => this.state.loading ? <ActivityIndicator size={'large'} animating color={this.defaultMainheaderRightIconColor} /> : null}
                            data={this.state.data}

                            ListEmptyComponent={() =>
                                this.state.loading ? null : (
                                    <View style={listOutDocxStyle.emptyDataBody}>
                                        <Image source={uriEmptyDataIcon} style={listOutDocxStyle.emptyDataImage} />
                                        <Text style={listOutDocxStyle.emptyDataMessage}>
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
                                    <TextInput placeholder="Số hiệu hoặc trích yếu văn bản"
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

const mapStateToProps = (state)=> {
    return {
        userId: state.userState.userInfo.ID,
        docxType: state.outDocxState.docxType,
    }
}

const mapDispathToProps = (dispatch)=> {
    return {
        setFilterInfo: (filterValue, filterDocxType) => dispatch(action.setFilterInfo(filterValue, filterDocxType)),
    }
}

export default connect(mapStateToProps, mapDispathToProps)(ListOutDocxNotProcessed);