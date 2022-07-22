import config from '../firebase.config.json';

import { initializeApp } from 'firebase/app';
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const app = initializeApp(config);
const analytics = getAnalytics(app);

export const db = getFirestore(app);
export const storage = getStorage(app);
