# React + TS + firebase(firestore)

## React + TS 

```
npx create-react-app my-app --template typescript react-firebase
```

## firebase

```
npm install firebase
```

## .env 파일 작성

```
  REACT_APP_API_KEY= '키값...'
  REACT_APP_AUTH_DOMAIN= 
  REACT_APP_DATABASE_URL= 
  REACT_APP_PROJECT_ID= 
  REACT_APP_STORAGE_BUCKET= 
  REACT_APP_MESSAGING_SENDER_ID= 
  REACT_APP_APP_ID= 
```

## .gitignore 에 .env 추가
```
#API
.env
```

## firebase.js 작성

```js
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'; // 추가

const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

const app = initializeApp(firebaseConfig);
export default getFirestore(); // 추가
```

## App.tsx 에서 improt 해오기

```
// App.tsx
import db from './firebase';
```