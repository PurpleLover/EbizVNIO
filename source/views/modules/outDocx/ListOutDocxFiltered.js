/**
 * @description: danh sách văn bản đến đã qua tìm kiếm
 * @author: duynn
 * @since: 19/04/2018
 */
'use strict'
import React, { Component } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TextInput, TouchableOpacity, View, Modal } from 'react-native';

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
import { activityIndicatorSizeResponsive } from '../../../assets/styles/ScalingAndIndicating';

//utility
import { formatLongText } from '../../../common/utility';
import BaseComponent from '../../common/BaseComponent';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

class ListOutDocxFiltered extends BaseComponent {
    constructor(props) {
        super(props);

        this.state = {
            total: 0,
            data: [],
            page: constant.DEFAULT_PAGE_INDEX,
            loading: false,

            filterValue: this.props.filterValue
        }
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
            this.setState({
                data: [],
                page: constant.DEFAULT_PAGE_INDEX
            }, () => {
                this.fetchData(this.state.filterValue);
            })
        }
    }

    //trở về
    onGoBack() {
        let screenName = 'ListOutDocxNotProcessedScreen';
        if (this.props.filterDocxType == constant.OUT_DOCX_JOIN_PROCESSED) {
            screenName = 'ListOutDocxJoinProcessedScreen';
        }
        this.props.navigation.navigate(screenName);
    }

    //sau khi dữ liệu được mount
    componentDidMount() {
        this.fetchData(this.state.filterValue);
    }

    handleEnd = () => {
        if (this.state.data.length >= 10) {
            this.setState(state => ({ page: state.page + 1 }), () => this.fetchData(this.state.filterValue));
        }
    };

    /**
     * @description: điều hướng đến trang chi tiết
     * @param {} id 
     * @param {*} workflowButtons 
     */
    navigateToDetail(docxId) {
        this.props.navigation.navigate('DetailOutDocxScreen', {
            docxId
        });
    }

    //lấy dữ liệu
    fetchData = async (filterValue) => {
        let docxTypeName = constant.EMPTY_STRING;
        if (this.props.filterDocxType == constant.OUT_DOCX_JOIN_PROCESSED) {
            docxTypeName = 'vbthamgiaxuly';
        } else {
            docxTypeName = 'vbchuaxuly';
        }

        this.setState({ loading: true });
        const response = await fetch(
            `${constant.DEFAULT_API_URL}/api/vanbandi/${docxTypeName}/${this.props.userId}/${constant.DEFAULT_PAGE_SIZE}/${this.state.page}?query=${filterValue}`
        );
        const json = await response.json();
        this.setState(state => ({
            total: json.Count,
            data: [...state.data, ...json.ListItem],
            loading: false
        }));
    }

    //hiển thị từng dòng văn bản
    renderItem = ({ item }) => (
        <TouchableOpacity onPress={() => this.navigateToDetail(item.ID)}>
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
        </TouchableOpacity>
    )

    render() {
        return (
            <MenuProvider style={this.defaultStyle.container}>
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
                    </View>
                    <Divider style={this.defaultStyle.divider} />

                    <View style={this.defaultStyle.bodyMain}>
                        {
                            renderIf(this.state.total > 0)(
                                <ListItem
                                    containerStyle={filterStyle.filterResult}
                                    title={
                                        <Text style={filterStyle.filterResultTitleText}>
                                            KẾT QUẢ
                                        </Text>
                                    }
                                    rightIcon={
                                        <Text style={filterStyle.filterResultTotalText}>
                                            {this.state.total}
                                        </Text>
                                    }
                                />
                            )
                        }
                        <FlatList
                            onEndReached={() => this.handleEnd()}
                            onEndReachedThreshold={0.1}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={this.renderItem}
                            ListFooterComponent={() => this.state.loading ? <ActivityIndicator size={activityIndicatorSizeResponsive} animating color={this.defaultMainheaderRightIconColor} /> : null}
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
            </MenuProvider>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        filterDocxType: state.outDocxState.filterDocxType,
        filterValue: state.outDocxState.filterValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilterInfo: (filterValue, filterDocxType) => dispatch(action.setFilterInfo(filterValue, filterDocxType)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListOutDocxFiltered);