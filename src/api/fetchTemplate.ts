import { db } from '../lib/firebase';
import { doc, FirestoreDataConverter, getDoc } from 'firebase/firestore';

const converter: FirestoreDataConverter<Template> = {
	fromFirestore: doc => ({
		id: doc.id,
		...(doc.data() as any)
	}),
	toFirestore: data => {
		const { id, ...otherData } = data;
		return otherData;
	}
};

async function fetchTemplate(id: string): Promise<Template> {
	const docSnapshot = await getDoc(doc(db, 'templates', id).withConverter(converter));
	const template = docSnapshot.data();
	if (!template) throw new Error('Template not foud');
	return template;
}

export default fetchTemplate;
