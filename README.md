npx react-native doctor

clear; npx expo run:android

npx expo start --reset-cache

firebase emulators:start

adb pair 192.168.1.187:39785



quando usando pareamento com wifi:  
```javascript
  const fire = auth()
  fire.useEmulator("http://192.168.1.26:9099")
```

quando usando USB:  
```javascript
  const fire = auth()
  fire.useEmulator("http://127.0.0.1:9099")
```