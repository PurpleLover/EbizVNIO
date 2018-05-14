/**
 * @author: duynn
 * @class: quản lý style trong màn hình tải dữ liệu
 * @since: 18/03/2018
 */

import { StyleSheet, Dimensions } from 'react-native';
import { width, height } from '../../common/constant';

const loadingStyle = StyleSheet.create({
    background: {
        flex: 1,
    }, container: {
        width,
        height,
        paddingHorizontal: 20,
    }, header: {
        paddingVertical: 30,
        alignItems: 'center',
    }, body: {
        flex: 1,
        justifyContent: 'center',
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
    }
});

export {
    loadingStyle
}