import { Dimensions } from 'react-native';

//địa chỉ api và web
export const DEFAULT_API_URL = 'http://192.168.1.16:8098';
// export const DEFAULT_WEB_URL = 'http://192.168.1.6:1905';
// export const DEFAULT_SOCKET_URL = 'http://192.168.1.:4000';

//cách phân trang
export const DEFAULT_PAGE_SIZE = 10;
export const DEFAULT_PAGE_INDEX = 1;

//độ rộng độ dài của màn hình
export const { width, height } = Dimensions.get('window');

//màu
export const HEX_WHITE_COLOR_CODE = '#FFF';
export const HEX_BLACK_COLOR_CODE = '#000';
export const HEX_YELLOW_COLOR_CODE = '#FFFF00';
export const HEX_HEADER_ICON_COLOR_CODE = '#005aab';

//kích thước
export const ICON_SIZE = 25;

//chuỗi
export const EMPTY_STRING = '';

//loại văn bản đến
export const IN_DOCX_PROCESSED = 'IN_DOCX_PROCESSED';
export const IN_DOCX_NOT_PROCESSED = 'IN_DOCX_NOT_PROCESSED';
export const IN_DOCX_JOIN_PROCESSED = 'IN_DOCX_JOIN_PROCESSED';

//loại văn bản đi
export const OUT_DOCX_NOT_PROCESSED = 'OUT_DOCX_NOT_PROCESSED';
export const OUT_DOCX_JOIN_PROCESSED = 'OUT_DOCX_JOIN_PROCESSED';

//văn bản đến
export const IN_DOCX_TYPE_ID = 1;
//văn bản đi
export const OUT_DOCX_TYPE_ID = 2;

//kiểu hiện thị luồng xử lý
export const WORKFLOW_TYPE_1 = 1;
export const WORKFLOW_TYPE_2 = 2;
export const WORKFLOW_TYPE_3 = 3;
export const WORKFLOW_TYPE_4 = 4;

//mã màu thông báo
export const ALERT_INFO_COLOR = '#2B73B6';

//thư viện firebase
// export const FIREBASE_CONFIG = {
//     apiKey: "AIzaSyA5p4C1Ef9_1chmFB715RnPQ4n4ASFQsOY",
//     authDomain: "demornfirebase-953bc.firebaseapp.com",
//     databaseURL: "https://demornfirebase-953bc.firebaseio.com",
//     projectId: "demornfirebase-953bc",
//     storageBucket: "demornfirebase-953bc.appspot.com",
//     messagingSenderId: "1047381039136"
// };

//FireBase API KEY
export const FireBaseConstants = {
    'API_KEY': 'AIzaSyDmUMRXJSntxflQNqu5DDIjkm49xl7fTwE'
}