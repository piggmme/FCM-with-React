# CRA + FCM 예제

## 1 초기 설정

### 1.1 CRA 설치

```
npx create-react-app test-messaging
```

### 1.2.1 firebase 설치

```
npm install firebase
```

### 1.2.2 firebase 콘솔에서 프로젝트 생성

1. 콘솔에 접속

https://console.firebase.google.com/u/0/?hl=ko

2. 프로젝트 생성

3. 웹 앱에 Firebase 추가

4. firebase SDK 추가 (firebaseConfig)

## 2 firebase 메서드

### 2.1 자바스크립트 클라이언트 초기 설정

https://firebase.google.com/docs/cloud-messaging/js/client

```js
import { initializeApp } from "firebase/app";
import { getMessaging } from "firebase/messaging";

const firebaseConfig = {
  // 1.2.2 에서 얻은 firebaseConfig를 여기에 추가
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: <your-authDomain>,
  projectId: <your-projectId>,
  storageBucket: <your-storageBucket>,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
  measurementId: process.env.REACT_APP_MEASUREMENT_ID,
};

const app = initializeApp(firebaseConfig);
const messaging = getMessaging(app);
```

### 2.2 VAPID 키 자격 증명 설정

1. firebase 콘솔 접속

2. 프로젝트 개요 옆 관리 버튼 > 프로젝트 설정 > 클라우드 메시징

3. 웹 푸시 인증서 생성

4. 생성된 키는 `getToken` 메서드의 `vapidKey` 값으로 추가

### 2.2.1 생성 받은 config & key 를 환경변수로 등록

`.env` 파일을 루트에 생성하고 하단을 채워주세요.

```
# .env
REACT_APP_API_KEY=
REACT_APP_MESSAGING_SENDER_ID=
REACT_APP_APP_ID=
REACT_APP_MEASUREMENT_ID=
REACT_APP_VAPID_KEY=
```

### 2.3 앱에서 웹 자격 증명 구성

2.2 에서 발급 받은 키를 `vapidKey` 로 추가한다.

```js
import { getToken } from "firebase/messaging";
const token = await getToken(messaging, {
  vapidKey: process.env.REACT_APP_VAPID_KEY,
});
```

### 2.4 웹 푸시 권한 요청

https://firebase.google.com/docs/cloud-messaging/js/client#access_the_registration_token

앱 내에서 사용자에게 먼저 알림 권한을 요청해야 한다.
알림 권한이 허용된 경우에 토큰을 받아 메시지를 얻도록 한다.

```js
function requestPermission() {
  console.log("권한 요청 중...");
  Notification.requestPermission().then((permission) => {
    if (permission === "granted") {
      console.log("알림 권한이 허용됨");

      // FCM 메세지 처리
    } else {
      console.log("알림 권한 허용 안됨");
    }
  });
}
```

### 2.5 Service Worker 설정 - `public/firebase-message-sw.js` 파일 생성

https://github.com/firebase/quickstart-js/issues/229

```
Service worker registration failed, error: DOMException: Failed to register a ServiceWorker for scope ('http://localhost:3000/') with script ('http://localhost:3000/firebase-messaging-sw.js'): The script has an unsupported MIME type ('text/html').
```

Service Worker 설정을 해야 백그라운드 환경일때도 알림을 받을 수 있다.`public` 폴더에 `firebase-message-sw.js`를 생성하고, 다음과 같은 코드를 입력하면 된다. 반드시 파일 이름은 `firebase-message-sw.js` 이여야한다.

### 2.6 firebase 콘솔 > 클라우드 메세징

1. 첫 번째 캠페인 만들기 버튼 클릭 > firebase 알림 메세지

2. 메시지 작성

3. 테스트 메시지 전송

4. Web Push 알람을 확인할 수 있음
