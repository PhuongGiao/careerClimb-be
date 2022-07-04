const admin = require("firebase-admin");

const serviceAccount = require("../apis/booking-studio-notification-223d378e052e.json");

function PushNotifier() {
  const defaultAppConfig = {
    credential: admin.credential.cert(serviceAccount),
  };
  admin.initializeApp(defaultAppConfig);
}

PushNotifier.prototype.sendNotificationToDeviceIOS = function (data) {
  let ios = {
    headers: {
      "apns-priority": "10",
      "apns-expiration": "360000",
    },
    payload: {
      aps: {
        alert: {
          title: "title push",
        },
        badge: 1,
        sound: "default",
      },
    },
  };
  let message = {
    apns: ios,
    token: tokenDevice,
  };
  fireabse
    .messaging()
    .send(message)
    .then((response) => {})
    .catch((error) => {});
};

PushNotifier.prototype.sendNotificationToDeviceIOS = function (data) {
  let android = {
    priority: "High",
    ttl: "360000",
    data: {
      title: "",
      content: "",
    },
  };

  let message = {
    android: android,
    token: tokenDevice,
  };
  fireabse
    .messaging()
    .send(message)
    .then((response) => {})
    .catch((error) => {});
};
