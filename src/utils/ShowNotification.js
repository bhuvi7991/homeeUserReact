import PushNotification from 'react-native-push-notification';

const ShowNotification = async (remoteMessage) => {
    PushNotification.getChannels(function (channel_ids) { });
    try {
        PushNotification.localNotification({
            channelId: "Homee_Foods",
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
            path: remoteMessage.notification.android.sound,
            autoCancel: true
        })
    } catch (err) {
    }
}

export default ShowNotification;