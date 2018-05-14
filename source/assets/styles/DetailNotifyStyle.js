/**
 * @author: duynn
 * @class: quản lý style trong chi tiết thông báo
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet } from 'react-native';

const detailNotifyStyle = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center'
    }, headerContainer: {
        alignItems: 'center',
        flexDirection: 'row'
    }, headerLeftText: {
        color: '#005aab',
        fontWeight: 'bold',
        marginLeft: 10,
        fontSize: 12
    }, headerAlertIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 20,
        marginRight: 5,
    }, headerAlertContainer: {
    }, headerAlertCount: {
        position: 'absolute',
        top: -10,
        right: -10,
        backgroundColor: '#e93f22',
        borderRadius: 2,
        padding: 2
    }, headerAlertCountText: {
        color: '#fff',
        fontWeight: 'bold',
        fontSize: 8
    }, title: {
        minHeight: 50,
        paddingVertical: 20,
        paddingLeft: 15
    }, titleText: {
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 20
    }, circleTitle: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#005aab'
    }, circleTitleText: {
        fontSize: 18,
        color: '#fff'
    }, content: {

    }, contentText: {
        flexWrap: 'wrap',
        color: '#000',
        fontSize: 15,
        paddingVertical: 20,
        paddingLeft: 15
    }
});

export {
    detailNotifyStyle
}