/**
 * @author: duynn
 * @class: quản lý style trong danh sách văn bản đi
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet } from 'react-native';

const listOutDocxStyle = StyleSheet.create({
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
    }, leftContainer: {
        width: 30
    }, leftIcon: {
        marginTop: 3,
        marginLeft: 10,
        marginRight: 3,
        width: 15,
        height: 15,
        resizeMode: 'contain'
    }, SOKYHIEU_READ: {
        color: '#888888'
    }, SOKYHIEU_NOT_READ: {
        color: '#000'
    }, TRICHYEU: {
        fontSize: 12,
        flexWrap: 'wrap'
    }, TRICHYEU_READ: {
        color: '#888888'
    }, TRICHYEU_NOT_READ: {
        color: '#000'
    }
});

export {
    listOutDocxStyle
}