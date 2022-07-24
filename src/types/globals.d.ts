import { DocumentReference, Timestamp } from 'firebase/firestore';

declare global {
	interface MemeData {
		creationTime: Timestamp;
		isCustom: boolean;
		customImg: string;
		template: DocumentReference;
		textboxes: Array<string>;
	}

	interface Meme {
		creationTime: Timestamp;
		img: string;
		textboxes: Array<Textbox & { content: string }> | null;
	}

	interface Template {
		id: string;
		name: string;
		img: string;
		textboxes: Array<Textbox>;
	}

	interface Textbox {
		x: number;
		y: number;
		w: number;
		h: number;
	}
}

export {};
