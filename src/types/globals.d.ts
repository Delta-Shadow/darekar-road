import { DocumentReference, Timestamp } from 'firebase/firestore';

declare global {
	interface Meme {
		creationTime: Timestamp;
		isCustom: boolean;
		customImg: string;
		templateID: string;
		textboxes: Array<string>;
	}

	interface Template {
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
