import { useEffect, useState } from 'react';
import { downloadImg } from '../api/image';
import { readAllMemes } from '../api/meme';
import { readTemplate } from '../api/template';

let memes: Array<Meme> | null = null;
let currentMeme: number | null = null;

type UseMemeReturnType = [Meme | null, Template | null, boolean, (() => void) | null];

function useMeme(): UseMemeReturnType {
	const [loading, setLoading] = useState(true);
	const [meme, setMeme] = useState<Meme | null>(null);
	const [template, setTemplate] = useState<Template | null>(null);

	useEffect(() => {
		loadMemes();
	}, []);

	const loadMemes = async () => {
		const result = await readAllMemes();
		const values = Object.values(result);
		if (values !== null && values.length > 0) {
			memes = values;
			currentMeme = 0;
			prepareCurrentMeme();
		} else {
			setLoading(false);
		}
	};

	const prepareCurrentMeme = async () => {
		if (memes === null || currentMeme === null) return;
		try {
			if (memes[currentMeme].isCustom) {
				const success = await downloadImg(memes[currentMeme].customImg);
				setMeme(memes[currentMeme]);
			} else {
				const template = await readTemplate(memes[currentMeme].templateID);
				const success = await downloadImg(template.img);
				setMeme(memes[currentMeme]);
				setTemplate(template);
			}
		} catch (err) {
			console.log(err);
		}
		setLoading(false);
	};

	const nextMeme = () => {
		if (memes === null || currentMeme === null) return;
		setLoading(true);
		currentMeme++;
		prepareCurrentMeme();
	};

	// console.log(currentMeme);
	// console.log(memes?.length);
	// console.log(
	// 	currentMeme !== null && memes !== null && currentMeme + 1 < memes.length ? nextMeme : null
	// );

	return [
		meme,
		template,
		loading,
		currentMeme !== null && memes !== null && currentMeme + 1 < memes.length ? nextMeme : null
	];
}

export default useMeme;
