const Axios = require("axios");
const apn = require("apn");
const join = require("path").join,
  pfx = join(__dirname, "../apis/CertificatesBookingStudio2023.p12");

exports.sendAndroid = async (AndroidList, Title) => {
  const data = {
    collapse_key: "type_a",
    registration_ids: AndroidList,
    notification: {
      body: Title,
      title: Title,
    },
    data: {
      body: Title,
      title: Title,
    },
  };
  await Axios({
    url: "https://fcm.googleapis.com/fcm/send",
    method: "POST",
    data,
    headers: {
      Authorization: `key=${process.env.FCM_KEY}`,
      "Content-Type": "application/json",
    },
  });
};

exports.sendIOS = async (IOSList, Title) => {
  const apnProvider = new apn.Provider({
    pfx: pfx,
    passphrase: process.env.P12_PASSWORD,
    production: true,
  });
  let notification = new apn.Notification();
  notification.alert = Title;
  notification.topic = process.env.BUNDLE_ID;
  const res = await apnProvider.send(notification, IOSList);
};
