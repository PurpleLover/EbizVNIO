'use strict'
import React, { Component } from 'react';
import { View, Text, ScrollView } from 'react-native';
import { List, ListItem } from 'react-native-elements';
import BaseComponent from '../../common/BaseComponent';

//lib
import _ from 'lodash';

//utility
import { convertDateToString } from '../../../common/utility';

//redux
import { connect } from 'react-redux';

//style
import { mainInfoStyle } from '../../../assets/styles/DetailOutDocxStyle';

class MainInfoOutDocx extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            outDocx: {}
        }
    }

    //cập nhật state mới nhất của ứng dụng vào trang chi tiết
    componentDidMount = () => {
        this.setState({
            outDocx: this.props.outDocx
        });
    }

    render() {
        return (
            <View style={this.defaultStyle.container}>
                <ScrollView>
                    <List containerStyle={mainInfoStyle.listContainer}>
                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('đơn vị soạn thảo')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.DONVISOANTHAO}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('số ký hiệu')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.SOHIEU}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('hình thức văn bản')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.LOAIVANBAN}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('ngày ban hành')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {convertDateToString(this.state.outDocx.NGAYBANHANH)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('thời hạn xử lý')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {convertDateToString(this.state.outDocx.THOIHAN_XULY)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('thời hạn hồi báo')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {convertDateToString(this.state.outDocx.THOIHAN_HOIBAO)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('sổ văn bản đi')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.SOVANBAN}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('sổ đi theo sổ')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.SODITHEOSO}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('số tờ')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.SOTO}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('số bản sao')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.SOBANSAO}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('độ khẩn')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.DOKHAN}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('người ký')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.NGUOIKY}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('chức vụ người ký')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.CHUCVUNGUOIKY}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('trích yếu')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.TRICHYEU}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('nội dung')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.outDocx.NOIDUNGVANBAN}
                                </Text>
                            }
                        />
                    </List>
                </ScrollView>
            </View>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        outDocx: state.outDocxState.detailOutDocx
    }
}

export default connect(mapStateToProps, null)(MainInfoOutDocx);