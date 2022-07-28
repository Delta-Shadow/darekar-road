import { db } from '../lib/firebase';
import { collection, getDocs } from 'firebase/firestore';

async function fetchAllTemplates(): Promise<Array<Template>> {
	const { docs } = await getDocs(collection(db, 'templates'));
	const templates = docs.map(doc => ({ id: doc.id, ...doc.data() } as Template));
	return templates;
}

export default fetchAllTemplates;
