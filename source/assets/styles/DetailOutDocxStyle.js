/**
 * @author: duynn
 * @class: quản lý style trong chi tiết văn bản đi
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet } from 'react-native';

const mainInfoStyle = StyleSheet.create({
    listContainer: {
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#cbd2d9'
    }, listItemContainer: {
        paddingTop: 10,
        paddingRight: 10,
        paddingBottom: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#e5e5e5'
    }, titleContainer: {
        fontWeight: 'bold',
        color: 'black',
        fontSize: 14
    }, subTitleContainer: {
        fontSize: 13,
        color: '#777',
        fontWeight: 'normal'
    }
});

export {
    mainInfoStyle
}