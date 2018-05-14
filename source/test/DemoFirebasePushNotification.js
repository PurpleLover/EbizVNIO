import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';

//FCM
import FCM, {
    FCMEvent, RemoteNotificationResult,
    WillPresentNotificationResult, NotificationType
} from 'react-native-fcm';

export default class DemoFirebasePushNotification extends Component {
    constructor(props) {
        super(props);

        this.state = {
            token: '',
            tokenCopyFeedback: ''
        }
    }

    async componentDidMount() {
        //settings
        this.registerAppListener();

        //get initial notification
        FCM.getInitialNotification().then(notif => {
            this.setState({
                initNotif: notif
            })

            // if (notif && notif.targetScreen === 'detail') {
            //     setTimeout(() => {
            //         this.props.navigation.navigate('Detail')
            //     }, 500)
            // }
        });


        //get permission from server
        try {
            const requestPermissionResult = await FCM.requestPermissions({ badge: true, sound: true, alert: true });

            console.log('Request Permissions Result', requestPermissionResult);
        } catch (err) {
            console.log('Permission Error', err);
        }


        //get token
        FCM.getFCMToken().then(token => {
            console.log('TOKEN (Get FCM Token)', token);

            this.setState({
                token
            });
        });

    }
    
    //register app listener
    registerAppListener() {
        FCM.on(FCMEvent.Notification, notif => {
            console.log('>>>>>>>>>>>>>>>>>>>>>> THÔNG BÁO <<<<<<<<<<<<<<<<<<<<<')
            console.log(notif);
            console.log('>>>>>>>>>>>>>>>>>>>>>> END THÔNG BÁO <<<<<<<<<<<<<<<<<<<<<')

            if (notif.opened_from_tray) {
                setTimeout(() => {
                    alert(`User tapped notification\n${JSON.stringify(notif)}`)
                }, 500);
            }
        });

        //refresh token
        FCM.on(FCMEvent.RefreshToken, token => {
            console.log('TOKEN (Refresh Token Unsubscribe)', token);
        });

        //==> ??
        FCM.enableDirectChannel();
        FCM.on(FCMEvent.DirectChannelConnectionChanged, (data) => {
            console.log('Direct Channel Connection Changed' + data);
        });

        setTimeout(function () {
            FCM.isDirectChannelEstablished().then(data => console.log('Is Direct Channel Established', data));
        });
    }


    render() {
        let { token, tokenCopyFeedback } = this.state;

        return (
            <View style={styles.container}>
                <ScrollView style={{ paddingHorizontal: 20 }}>
                    <Text style={styles.welcome}>
                        Welcome to Simple Fcm Client!
                    </Text>

                    <Text style={styles.feedback}>
                        {this.state.tokenCopyFeedback}
                    </Text>

                    <Text style={styles.feedback}>
                        Remote notif won't be available to iOS emulators
                    </Text>

                    <TouchableOpacity onPress={() => this.sendRemoteNotification(token)} style={styles.button}>
                        <Text style={styles.buttonText}>Send Remote Notification</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.sendRemoteData(token)} style={styles.button}>
                        <Text style={styles.buttonText}>Send Remote Data</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showLocalNotification()} style={styles.button}>
                        <Text style={styles.buttonText}>Show Local Notification</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.showLocalNotificationWithAction(token)} style={styles.button}>
                        <Text style={styles.buttonText}>Show Local Notification with Action</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.scheduleLocalNotification()} style={styles.button}>
                        <Text style={styles.buttonText}>Schedule Notification in 5s</Text>
                    </TouchableOpacity>

                    <Text style={styles.instructions}>
                        Init notif:
                    </Text>
                    <Text>
                        {JSON.stringify(this.state.initNotif)}
                    </Text>

                    <Text style={styles.instructions}>
                        Token:
                    </Text>
                    <Text selectable={true} onPress={() => this.setClipboardContent(this.state.token)}>
                        {this.state.token}
                    </Text>
                </ScrollView>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 2,
    },
    feedback: {
        textAlign: 'center',
        color: '#996633',
        marginBottom: 3,
    },
    button: {
        backgroundColor: "teal",
        paddingHorizontal: 20,
        paddingVertical: 15,
        marginVertical: 10,
        borderRadius: 10
    },
    buttonText: {
        color: "white",
        backgroundColor: "transparent"
    },
});

