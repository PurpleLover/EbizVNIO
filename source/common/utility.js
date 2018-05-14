/**
 * @author: duynn
 * @since: 16/03/2018
 * @description: hàm tiện tích
 */
import * as constants from '../common/constant';
//hàm tiện ích

//chuyển định dạng ngày
function convertDateToString(date) {
    let deadline = new Date();
    if (date !== null && date !== '') {
        deadline = new Date(date);
    }
    let delineStr = (deadline.getDate() + '/' + (deadline.getMonth() + 1) + '/' + deadline.getFullYear());
    return delineStr;
}

//định dạng đoạn văn bản dài
function formatLongText(text, size) {
    if (size > 1) {
        if (text.length > size) {
            text = text.substring(0, size - 1);
            text += '...';
        }
    }
    return text;
}

//lấy tiêu đề danh sách trang
function getPageTitle(code) {
    switch (code) {
        case constants.IN_DOCX_NOT_PROCESSED:
            return 'VĂN BẢN ĐẾN CHƯA XỬ LÝ';
        case constants.IN_DOCX_PROCESSED:
            return 'VĂN BẢN ĐẾN ĐÃ XỬ LÝ';
        case constants.IN_DOCX_JOIN_PROCESSED:
            return 'VĂN BẢN ĐẾN THAM GIA XỬ LÝ';
        case constants.OUT_DOCX_JOIN_PROCESSED:
            return 'VĂN BẢN ĐI THAM GIA XỬ LÝ';
        case constants.OUT_DOCX_NOT_PROCESSED:
            return 'VĂN BẢN ĐI CHƯA XỬ LÝ';
        default:
            return constants.EMPTY_STRING;
    }
}

export {
    getPageTitle,
    formatLongText,
    convertDateToString
}
