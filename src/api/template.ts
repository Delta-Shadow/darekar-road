import { db } from '../lib/firebase';
import {
	doc,
	FirestoreDataConverter,
	getDoc,
	collection,
	getDocs,
	addDoc
} from 'firebase/firestore';
import { uploadImg } from './image';

export type TemplateData = Omit<Template, 'img'> & {
	img: File;
};

const converter: FirestoreDataConverter<Template> = {
	fromFirestore: doc => doc.data() as Template,
	toFirestore: data => data
};

export async function readAllTemplates(): Promise<Map<string, Template>> {
	const { docs } = await getDocs(collection(db, 'templates').withConverter(converter));
	const entries = docs.map(doc => [doc.id, doc.data()]);
	const data = Object.fromEntries(entries) as Map<string, Template>;
	return data;
}

export async function readTemplate(id: string): Promise<Template> {
	const docSnapshot = await getDoc(doc(db, 'templates', id).withConverter(converter));
	const template = docSnapshot.data();
	if (!template) throw new Error('Template not found');
	return template;
}

export async function createTemplate(data: TemplateData) {
	const imgPath = await uploadImg(data.name, 'template', data.img);
	const uploadableData = { ...data, img: imgPath };
	await addDoc(collection(db, 'templates').withConverter(converter), uploadableData);
}
