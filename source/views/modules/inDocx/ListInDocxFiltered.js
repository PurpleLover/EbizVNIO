/**
 * @description: dánh sách văn bản đến sau khi tìm kiếm
 * @since: 10/04/2018
 * @author: duynn
 */
'use strict'
import React, { Component } from 'react';
import {
    ActivityIndicator, FlatList, Image, View
    , Text, TextInput, TouchableOpacity
} from 'react-native';

//redux
import { connect } from 'react-redux';

//thunk
import * as thunk from '../../../redux/modules/inDocx/inDocxThunk';

//lib
import _ from 'lodash';
import { MenuProvider } from 'react-native-popup-menu';
import { Divider, Header, Icon, ListItem } from 'react-native-elements';
import renderIf from 'render-if';
import BaseComponent from '../../common/BaseComponent';

//resources
import { filterStyle } from '../../../assets/styles/FilterStyle';
import {
    DEFAULT_API_URL, EMPTY_STRING, DEFAULT_PAGE_SIZE, DEFAULT_PAGE_INDEX,
    IN_DOCX_NOT_PROCESSED, IN_DOCX_JOIN_PROCESSED, IN_DOCX_PROCESSED
} from '../../../common/constant';

//utility
import { formatLongText } from '../../../common/utility';

//images
const uriEmptyDataIcon = require('../../../assets/images/empty_data.png');
const uriAttachmentIcon = require('../../../assets/images/attachment.png');

//styles
import { listInDocxStyle } from '../../../assets/styles/ListInDocxStyle';
import { activityIndicatorSizeResponsive } from '../../../assets/styles/ScalingAndIndicating';

//redux
import * as action from '../../../redux/modules/inDocx/inDocxAction';

class ListInDocxFiltered extends BaseComponent {

    constructor(props) {
        super(props);

        this.state = {
            data: [],
            total: 0,
            page: DEFAULT_PAGE_INDEX,
            loading: false,

            filterValue: this.props.filterValue
        }
    }

    //xóa giá trị tìm kiếm
    clearFilter() {
        this.setState({
            filterValue: EMPTY_STRING
        });
    }

    //tìm kiếm văn bản
    onFilter() {
        if (!_.isNull(this.state.filterValue) && !_.isEmpty(this.state.filterValue)) {
            this.setState({
                data: [],
                page: DEFAULT_PAGE_INDEX
            }, () => {
                this.fetchData(this.state.filterValue);
            })
        }
    }

    //trở về
    onGoBack() {
        let screenName = 'ListInDocxNotProcessedScreen';
        if (this.props.filterDocxType == IN_DOCX_JOIN_PROCESSED) {
            screenName = 'ListInDocxJoinProcessedScreen';
        } else if (this.props.filterDocxType == IN_DOCX_PROCESSED) {
            screenName = 'ListInDocxProcessedScreen';
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
        this.props.navigation.navigate('DetailInDocxScreen', {
            docxId
        });
    }


    //lấy dữ liệu
    fetchData = async (filterValue) => {
        let docxTypeName = EMPTY_STRING;
        if (this.props.filterDocxType == IN_DOCX_NOT_PROCESSED) {
            docxTypeName = 'vanbanchuaxuly';
        } else if (this.props.filterDocxType == IN_DOCX_PROCESSED) {
            docxTypeName = 'vanbandaxuly';
        } else {
            docxTypeName = 'vanbanthamgiaxuly';
        }


        this.setState({ loading: true });
        const response = await fetch(
            `${DEFAULT_API_URL}/api/vanbanden/${docxTypeName}/${this.props.userId}/${DEFAULT_PAGE_SIZE}/${this.state.page}?query=${filterValue}`
        );
        const json = await response.json();
        this.setState(state => ({
            total: json.Count,
            data: [...state.data, ...json.ListItem],
            loading: false
        }));
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

    //render hình ảnh
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
        );
    }
}

const mapStateToProps = (state) => {
    return {
        userId: state.userState.userInfo.ID,
        filterDocxType: state.inDocxState.filterDocxType,
        filterValue: state.inDocxState.filterValue
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        setFilterInfo: (filterValue, filterDocxType) => dispatch(action.setFilterInfo(filterValue, filterDocxType)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(ListInDocxFiltered);