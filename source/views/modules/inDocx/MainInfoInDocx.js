/**
 * @author: duynn
 * @since: 18/03/2018
 * @description: thông tin chính văn bản đến
 */

import React, { Component } from 'react';
import { ScrollView, Text, View } from 'react-native';
import BaseComponent from '../../common/BaseComponent';

//lib
import _ from 'lodash';
import { List, ListItem } from 'react-native-elements';
import renderIf from 'render-if';

//utility
import { convertDateToString } from '../../../common/utility';

//redux
import { connect } from 'react-redux';

//style
import { mainInfoStyle } from '../../../assets/styles/DetailInDocxStyle';

class MainInfoInDocx extends BaseComponent {
    constructor(props) {
        super(props);
        this.state = {
            inDocx: {},
        }
    }

    //cập nhật state mới nhất của ứng dụng vào trang chi tiết
    componentDidMount = () => {
        this.setState({
            inDocx: this.props.inDocx,
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
                                    {_.toUpper('cơ quan ban hành')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {this.state.inDocx.COQUANBANHANHTEXT}
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
                                    {this.state.inDocx.SOKYHIEU}
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
                                    {this.state.inDocx.LOAIVANBAN}
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
                                    {convertDateToString(this.state.inDocx.NGAYVANBAN)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('hạn xử lý')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {convertDateToString(this.state.inDocx.THOIHAN_XULY)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('ngày đến')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {convertDateToString(this.state.inDocx.NGAYDEN)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('số đến')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {(this.state.inDocx.SODEN)}
                                </Text>
                            }
                        />

                        <ListItem style={mainInfoStyle.listItemContainer}
                            hideChevron={true}
                            title={
                                <Text style={mainInfoStyle.titleContainer}>
                                    {_.toUpper('số trang')}
                                </Text>
                            }
                            subtitle={
                                <Text style={mainInfoStyle.subTitleContainer}>
                                    {(this.state.inDocx.SOTRANG)}
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
                                    {(this.state.inDocx.DOKHAN)}
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
                                    {(this.state.inDocx.NGUOIKY)}
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
                                    {(this.state.inDocx.TRICHYEU)}
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
                                    {(this.state.inDocx.NOIDUNGVANBAN)}
                                </Text>
                            }
                        />

                        {/* {
                            renderIf(!_.isEmpty(this.state.attachments))(
                                this.state.attachments.map(data => {
                                    <ListItem
                                        title={
                                            <Text style={mainInfoStyle.titleContainer}>
                                            {_.toUpper('nội dung')}
                                            </Text>
                                        }
                                        hideChevron={true}
                                        style={mainInfoStyle.listItemContainer} 
                                        
                                    />
                                })
                            )
                        } */}
                    </List>
                </ScrollView>
            </View>
        );
    }
}


let mapStateToProps = (state) => {
    return {
        inDocx: state.inDocxState.detailInDocx,
    }
}

export default connect(mapStateToProps, null)(MainInfoInDocx);