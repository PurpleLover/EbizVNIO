/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: api người dùng
 */

import { DEFAULT_API_URL } from '../../../common/constant';

//đăng nhập với API
export async function apiLogin(userName, password) {
    let result = null;
    await fetch(DEFAULT_API_URL + '/api/Account/Login', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8',
        },
        body: JSON.stringify({
            userName: userName,
            passWord: password
        })
    }).then((response) => response.json())
        .then((responseJson) => {
            result = responseJson;
        });

    return new Promise((resolve, reject) => {
        setTimeout(() => {
            return resolve(result);
        }, 2000);
    });
}

//đếm dữ liệu với API
export async function apiGetDataNumber(userId) {
    const notifyCountApiLink = DEFAULT_API_URL + '/api/notify/count/' + userId;
    const inDocxCountApiLink = DEFAULT_API_URL + '/api/vanbanden/Count/' + userId;
    const outDocxCountApiLink = DEFAULT_API_URL + '/api/vanbandi/Count/' + userId;

    const counter = await Promise.all([fetch(notifyCountApiLink).then((response) => response.json()),
    fetch(inDocxCountApiLink).then((response) => response.json()),
    fetch(outDocxCountApiLink).then((response) => response.json())])
        .then((result) => {
            return new Promise((resolve, reject) => {
                resolve(result);
            });
        });

    let result = {
        notifycationNumber: counter[0],
        inDocxNotProcessedNumber: counter[1].CountVBChuaXuLy,
        inDocxProcessedNumber: counter[1].CountVBDaXuLy,
        inDocxJoinProcessedNumber: counter[1].CountVBThamGiaXuLy,

        outDocxNotProcessedNumber: counter[2].CountChuaXuLy,
        outDocxJoinProcessedNumber: counter[2].CountThamGiaXuLy,
    }

    return new Promise((resolve, reject) => {
        return resolve(result);
    });
}

//cập nhật token cho người dùng
export async function apiActiveToken(userId, token) {
    let result = false;
    await fetch(DEFAULT_API_URL + '/api/Account/ActiveUserToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }, body: JSON.stringify({
            userId,
            token
        })
    }).then(response => response.json())
        .then(responseJson => {
            result = responseJson
        });

    return new Promise((resolve, reject) => {
        console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>', result);
        return resolve(result);
    });
}


//vô hiệu hóa token of người dùng
export async function apiDeActiveToken(userId, token) {
    let result = false;
    await fetch(DEFAULT_API_URL + '/api/Account/DeActiveUserToken', {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json; charset=utf-8'
        }, body: JSON.stringify({
            userId,
            token
        })
    }).then(response => response.json())
        .then(responseJson => {
            result = responseJson
        });

    return new Promise((resolve, reject) => {
        return resolve(result);
    });
}