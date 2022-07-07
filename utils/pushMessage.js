const Axios = require("axios");
const apn = require("apn");
const join = require("path").join,
  pfx = join(__dirname, "../apis/CertificatesBookingStudio2023.p12");
const { AdminNotificationKey } = require("../models");

exports.sendAndroid = async (AndroidList, Title) => {
  const certificate = await AdminNotificationKey.findByPk(1);
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
    url: certificate.dataValues.GoogleApiFCM,
    method: "POST",
    data,
    headers: {
      Authorization: `key=${certificate.dataValues.AuthKey}`,
      "Content-Type": "application/json",
    },
  });
};

exports.sendIOS = async (IOSList, Title) => {
  const certificate = await AdminNotificationKey.findByPk(1);
  const apnProvider = new apn.Provider({
    pfx: Buffer.from(certificate.dataValues.P12Certificate),
    passphrase: certificate.dataValues.P12Password,
    production: true,
  });
  let notification = new apn.Notification();
  notification.alert = Title;
  notification.topic = certificate.dataValues.P12BundleId;
  await apnProvider.send(notification, IOSList);
};
