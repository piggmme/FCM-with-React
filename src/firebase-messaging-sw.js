import { initializeApp } from "firebase/app";
import { getMessaging, getToken, onMessage } from "firebase/messaging";

const firebaseConfig = {
  apiKey: "AIzaSyAQxn6tY4BYBBvFUbA-e50VeThEo3nwd10",
  authDomain: "test-messaging-b4969.firebaseapp.com",
  projectId: "test-messaging-b4969",
  storageBucket: "test-messaging-b4969.appspot.com",
  messagingSenderId: "413159394017",
  appId: "1:413159394017:web:b2af06b2a59b9e028145a0",
  measurementId: "G-15T5D96PGT",
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);

function requestPermission() {
  console.log("권한 요청 중...");

  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");

      getToken(messaging, {
        vapidKey:
          "BKKoOS5f9E01vpnyHpxaLaCJVC43Pteghmq7HLPBoyiOTgq-bctFWOEf5d6DUosI1BqhSYurjvu5CK_oGYNzKUA",
      })
        .then((currentToken) => {
          if (currentToken) console.log("currentToken: ", currentToken);
          else console.log("Can not get Token");
        })
        .catch((err) => {
          console.log("An error occurred while retrieving token. ", err);
        });

      // onMessage(messaging, (payload) => {
      //   console.log("메시지가 도착했습니다.", payload);
      //   // ...
      // });
    } else {
      console.log("알림 권한 허용 안됨");
    }
  });
}

requestPermission();
