import { db } from '../lib/firebase';
import {
	addDoc,
	FirestoreDataConverter,
	Timestamp,
	collection,
	getDocs,
	doc,
	getDoc
} from 'firebase/firestore';

const converter: FirestoreDataConverter<Meme> = {
	fromFirestore: doc => doc.data() as Meme,
	toFirestore: data => data
};

export async function readAllMemes(): Promise<Map<string, Meme>> {
	const { docs } = await getDocs(collection(db, 'memes').withConverter(converter));
	const entries = docs.map(doc => [doc.id, doc.data()]);
	const data = Object.fromEntries(entries) as Map<string, Meme>;
	return data;
}

export async function readMeme(id: string): Promise<Meme> {
	const docSnapshot = await getDoc(doc(db, 'memes', id).withConverter(converter));
	const data = docSnapshot.data();
	if (!data) throw new Error('Meme not found');
	return data;
}

export async function createCustomMeme(customMemeData: { img: string }) {
	const memeData = {
		creationTime: Timestamp.fromDate(new Date()),
		isCustom: true,
		customImg: customMemeData.img,
		templateID: '',
		textboxes: []
	};

	await addDoc(collection(db, 'memes').withConverter(converter), memeData);
}

export async function createTemplatedMeme(templatedMemeData: {
	templateID: string;
	texts: Array<string>;
}) {
	const memeData = {
		creationTime: Timestamp.fromDate(new Date()),
		isCustom: false,
		customImg: '',
		templateID: templatedMemeData.templateID,
		textboxes: templatedMemeData.texts
	};

	await addDoc(collection(db, 'memes').withConverter(converter), memeData);
}
