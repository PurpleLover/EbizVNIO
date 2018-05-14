import * as FireBaseConstants from './FireBaseConstants';
import _ from 'lodash';
import { Alert } from 'react-native';

const API_URL = "https://fcm.googleapis.com/fcm/send";
async function sendNotify(body, type) {
    if (_.isNull(FireBaseConstants.SERVER_KEY) || _.isEmpty(FireBaseConstants.SERVER_KEY)) {
        Alert.alert(
            'THÔNG BÁO',
            'Không thể gửi kết nối đến server',
            [
                { text: 'OK', onPress: () => { } }
            ]
        )
        return;
    }
    const headers = new Headers({
        "Content-Type": "application/json",
        "Authorization": "key=" + FireBaseConstants.SERVER_KEY
    });

    try {
        const response = await fetch(API_URL, { method: "POST", headers, body });
        try {
            let responseJSON = await response.json();
            if (!responseJSON.success) {
                console.log('Gửi thông báo không thành công');
            }
        } catch (err) {
            console.log('Gửi thông báo không thành công');
        }
    } catch (err) {
        console.log('Gửi thông báo không thành công', err.message);
    }
}

export {
    sendNotify
}