/**
 * @author: duynn
 * @class: quản lý style trong danh sách thông báo
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet } from 'react-native';

const listNotifyStyle = StyleSheet.create({
    body: {
        flex: 1,
        justifyContent: 'center'
    },
    emptyDataBody: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }, emptyDataImage: {
        width: 100,
        height: 100,
        resizeMode: 'contain'
    }, emptyDataMessage: {
        color: '#ccc',
        fontSize: 16,
        fontWeight: 'bold',
        textAlign: 'center'
    }, circleTitle: {
        width: 30,
        height: 30,
        marginRight: 10,
        borderRadius: 50,
        justifyContent: 'center',
        alignItems: 'center'
    }, circleTitleText: {
        fontSize: 18,
        color: '#fff'
    }, circleTitleNotRead: {
        backgroundColor: '#005aab'
    }, circleTitleRead: {
        backgroundColor: 'rgba(0,90,171,0.8)'
    }, TIEUDE: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold'
    }, TIEUDE_READ: {
        color: '#888888',
        fontSize: 16,
        fontWeight: 'normal'
    }, rightText: {
        fontSize: 12,
        color: '#005aab'
    }
});

export {
    listNotifyStyle
}