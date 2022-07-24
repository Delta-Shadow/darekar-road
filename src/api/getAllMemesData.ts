import { FirebaseError } from 'firebase/app';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../lib/firebase';

async function getAllMemes(): Promise<Array<MemeData> | null> {
	try {
		const { docs } = await getDocs(collection(db, 'memes'));
		const memes = docs.map(doc => ({ id: doc.id, ...doc.data() } as MemeData));
		return memes;
	} catch (err) {
		if (err instanceof FirebaseError) {
			console.log('Firebase Error:', err.code);
		} else {
			console.log('Unknown Error Occurred');
			console.log(err);
		}
	}
	return null;
}

export default getAllMemes;
