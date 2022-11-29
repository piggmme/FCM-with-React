importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-app.js");
importScripts("https://www.gstatic.com/firebasejs/8.7.1/firebase-messaging.js");

firebase.initializeApp({
  apiKey: "AIzaSyAQxn6tY4BYBBvFUbA-e50VeThEo3nwd10",
  authDomain: "test-messaging-b4969.firebaseapp.com",
  projectId: "test-messaging-b4969",
  storageBucket: "test-messaging-b4969.appspot.com",
  messagingSenderId: "413159394017",
  appId: "1:413159394017:web:b2af06b2a59b9e028145a0",
  measurementId: "G-15T5D96PGT",
});

const messaging = firebase.messaging();
messaging.usePublicVapidKey(
  "BKKoOS5f9E01vpnyHpxaLaCJVC43Pteghmq7HLPBoyiOTgq-bctFWOEf5d6DUosI1BqhSYurjvu5CK_oGYNzKUA"
);

self.addEventListener("install", function (e) {
  console.log("fcm sw install..");
  self.skipWaiting();
});

self.addEventListener("activate", function (e) {
  console.log("fcm sw activate..");
});

self.addEventListener("push", function (e) {
  console.log("push: ", e.data.json());
  if (!e.data.json()) return;

  const resultData = e.data.json().notification;
  const notificationTitle = resultData.title;
  const notificationOptions = {
    body: resultData.body,
    icon: resultData.image,
    tag: resultData.tag,
  };
  console.log("push: ", { resultData, notificationTitle, notificationOptions });

  self.registration.showNotification(notificationTitle, notificationOptions);
});

self.addEventListener("notificationclick", function (event) {
  console.log("notification click");
  const url = "/";
  event.notification.close();
  event.waitUntil(clients.openWindow(url));
});
