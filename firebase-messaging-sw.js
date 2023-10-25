// this file must be in root folder
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-app-compat.js')
importScripts('https://www.gstatic.com/firebasejs/9.14.0/firebase-messaging-compat.js')

const firebaseConfig = {
  apiKey: "AIzaSyB1PkCP7PT_HZYuIGktL4ipq2envow4gUY",
  authDomain: "demoagent-4e57e.firebaseapp.com",
  databaseURL: "https://demoagent-4e57e.firebaseio.com",
  projectId: "demoagent-4e57e",
  storageBucket: "demoagent-4e57e.appspot.com",
  messagingSenderId: "1516922764",
  appId: "1:1516922764:web:d1250fbcd0402773b898a9"
};

// receiving messages in background
const app = firebase.initializeApp(firebaseConfig)
const messaging = firebase.messaging()

// get this type of message in background
messaging.onBackgroundMessage(function (payload) {
    if (!payload.hasOwnProperty('notification')) {
        const notificationTitle = payload.data.title
        const notificationOptions = {
            body: payload.data.body,
            icon: payload.data.icon,
            image: payload.data.image
        }
        self.registration.showNotification(notificationTitle, notificationOptions);
        self.addEventListener('notificationclick', function (event) {
            const clickedNotification = event.notification
            clickedNotification.close();
            event.waitUntil(
                clients.openWindow(payload.data.click_action)
            )
        })
    }
})
