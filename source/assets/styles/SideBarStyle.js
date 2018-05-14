/**
 * @author: duynn
 * @class: quản lý style trong side bar
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet } from 'react-native';

export const sideBarStyle = StyleSheet.create({
    header: {
        flex: 1,
        backgroundColor: '#1769b3',
        paddingHorizontal: 20,
        paddingTop: 15
    }, headerNavigator: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    }, headerNavigatorIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain'
    }, headerProfile: {
        alignItems: 'center',
        justifyContent: 'center'
    }, headerProfileName: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        marginTop: 15
    }, headerProfilePosition: {
        fontSize: 14,
        marginTop: 5,
        color: '#fff'
    }, avatar: {
        width: 70,
        height: 70,
        resizeMode: 'contain'
    }, circleAvatar: {
        width: 80,
        height: 80,
        justifyContent: 'center',
        alignItems: 'center'
    }, body: {
        flex: 2,
        backgroundColor: '#fff'
    }, listContainer: {
        marginTop: 0,
        borderTopWidth: 0,
        borderBottomWidth: 0,
        borderBottomColor: '#cbd2d9'
    }, itemIcon: {
        width: 20,
        height: 20,
        resizeMode: 'contain',
        marginLeft: 5
    }, itemContainer: {
        height: 60,
        justifyContent: 'center',
        borderBottomColor: '#cccccc'
    }, titleContainer: {
        paddingLeft: 20,
        flexDirection: 'row',
        alignItems: 'center'
    }, titleText: {
        width: 100,
        fontWeight: 'bold',
        color: "#7d7885"
    },subContainer: {
        
    }, subItemContainer: {
        height: 40,
        justifyContent: 'center',
        borderBottomColor: '#cccccc'
    }, subTitleContainer: {
        paddingLeft: 45
    }, subTitleText: {
        fontSize: 12,
        fontWeight: 'bold'
    }, badgeContainer: {
        borderRadius: 2,
        paddingHorizontal: 5,
        backgroundColor: '#e50304'
    }, badgeText: {
        color: '#fff',
        fontSize: 12,
        fontWeight: 'bold'
    }, toggleIcon: {
        width: 10,
        height: 10,
        resizeMode: 'contain',
    }
});