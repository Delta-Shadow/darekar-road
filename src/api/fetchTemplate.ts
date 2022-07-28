import { db } from '../lib/firebase';
import { doc, getDoc } from 'firebase/firestore';

async function fetchTemplate(id: string): Promise<Template> {
	const docSnapshot = await getDoc(doc(db, 'templates', id));
	const template = docSnapshot.data() as Template;
	return template;
}

export default fetchTemplate;
