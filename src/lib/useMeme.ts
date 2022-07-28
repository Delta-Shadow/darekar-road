import { useEffect, useState } from 'react';
import downloadImg from '../api/downloadImg';
import getAllMemes from '../api/getAllMemes';
import getTemplate from '../api/fetchTemplate';

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
		const result = await getAllMemes();
		if (result !== null && result.length > 0) {
			memes = result;
			currentMeme = 0;
			prepareCurrentMeme();
		}
	};

	const prepareCurrentMeme = async () => {
		if (memes === null || currentMeme === null) return;
		if (memes[currentMeme].isCustom) {
			const success = await downloadImg(memes[currentMeme].customImg);
			if (success) setMeme(memes[currentMeme]);
		} else {
			const template = await getTemplate(memes[currentMeme].templateID);
			if (template !== null) {
				const success = await downloadImg(template.img);
				if (success) {
					setMeme(memes[currentMeme]);
					setTemplate(template);
				}
			}
		}
		setLoading(false);
	};

	const nextMeme = () => {
		if (memes === null || currentMeme === null) return;
		setLoading(true);
		currentMeme++;
		prepareCurrentMeme();
	};

	return [
		meme,
		template,
		loading,
		currentMeme !== null && memes !== null && currentMeme + 1 < memes.length ? nextMeme : null
	];
}

export default useMeme;
