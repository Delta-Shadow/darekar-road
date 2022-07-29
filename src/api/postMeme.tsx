import { addDoc, collection, FirestoreDataConverter, Timestamp } from 'firebase/firestore';
import { db } from '../lib/firebase';

interface MemeData {
	templateID: string;
	texts: Array<string>;
}

const converter: FirestoreDataConverter<MemeData> = {
	toFirestore: data => ({
		creationTime: Timestamp.fromDate(new Date()),
		isCustom: false,
		customImg: '',
		templateID: data.templateID,
		textboxes: data.texts
	}),
	fromFirestore: data => ({} as MemeData)
};

async function postMeme(data: MemeData) {
	const ref = collection(db, 'memes').withConverter(converter);
	await addDoc(ref, data);
}

export default postMeme;
