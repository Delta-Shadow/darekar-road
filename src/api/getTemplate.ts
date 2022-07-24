import { db } from '../lib/firebase';
import { collection, doc, getDoc } from 'firebase/firestore';
import { FirebaseError } from 'firebase/app';

async function getTemplate(id: string): Promise<Template | null> {
	try {
		const docSnapshot = await getDoc(doc(db, 'templates', id));
		const template = docSnapshot.data() as Template;
		return template;
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

export default getTemplate;
