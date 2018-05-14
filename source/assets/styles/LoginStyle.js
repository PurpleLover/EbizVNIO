/**
 * @author: duynn
 * @class: quản lý style trong màn hình đăng nhập
 * @since: 16/03/2018
 */
'use strict'
import { Dimensions, StyleSheet, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

export const loginStyle = StyleSheet.create({
    container: {
        width,
        height,
        paddingHorizontal: 20,
    }, header: {
        paddingVertical: 30,
        alignItems: 'center',
    }, logo: {
        width: 100,
        height: 40,
        resizeMode: 'contain'
    }, headerMainTitle: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#015aaa',
        marginTop: 15
    }, headerSubTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        color: '#015aaa',
        marginTop: 5
    }, body: {
        flex: 1
    }, input: {
        width: '80%',
        fontSize: 16
    }, inputContainer: {
        height: 160,
        backgroundColor: '#fff',
        borderRadius: 4
    }, userNameContainer: {
        height: 80,
        flexDirection: 'row',
        justifyContent: 'center'
    }, inputIconContainer: {
        width: '20%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, inputIcon: {
        width: 40,
        height: 40,
        resizeMode: 'contain'
    }, passwordContainer: {
        height: 80,
        borderTopWidth: 1,
        borderTopColor: '#999',
        flexDirection: 'row',
        justifyContent: 'center'
    }, button: {
        marginTop: 20,
        height: 80,
    }, buttonBackground: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center'
    }, buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
        color: '#fff'
    }, buttonForgotPassword: {
        marginTop: 10,
        height: 30,
        alignItems: 'center'
    }, forgotPasswordText: {
        color: '#000',
        fontSize: 14,
        fontStyle: 'italic'
    }, indicatorBody: {
        flex: 1,
        justifyContent: 'center'
    },
});