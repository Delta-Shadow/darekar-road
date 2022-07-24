import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

async function getAllTemplates(): Promise<Array<Template> | null> {
	try {
		const { docs } = await getDocs(collection(db, 'templates'));
		const templates = docs.map(doc => ({ id: doc.id, ...doc.data() } as Template));
		return templates;
	} catch (err) {
		if (err instanceof FirebaseError) {
			console.log('Firebase Error');
			console.log(err);
		} else {
			console.log('Unknown Error');
			console.log(err);
		}
	}
	return null;
}

export default getAllTemplates;
