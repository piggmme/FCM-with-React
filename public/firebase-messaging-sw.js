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
