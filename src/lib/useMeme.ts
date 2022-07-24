import { useEffect, useState } from 'react';
import downloadMeme from '../api/downloadMeme';
import getAllMemesData from '../api/getAllMemesData';

type useMemeReturnType = [Meme | null, boolean, (() => void) | null];

function useMeme(): useMemeReturnType {
	const [memesData, setMemesData] = useState<Array<MemeData>>([]);
	const [currentMeme, setCurrentMeme] = useState<number | null>(null);
	const [loading, setLoading] = useState(true);
	const [meme, setMeme] = useState<Meme | null>(null);

	const loadMemes = async () => {
		const result = await getAllMemesData();
		if (result !== null && result.length > 0) {
			setMemesData(result);
			setCurrentMeme(0);
		} else {
			setLoading(false);
		}
	};

	const prepareMeme = async () => {
		if (currentMeme === null) return;
		setLoading(true);
		const result = await downloadMeme(memesData[currentMeme]);
		if (result !== null) {
			setLoading(false);
			setMeme(result);
		}
	};

	const nextMeme = () => {
		if (currentMeme === null) return;
		setCurrentMeme(currentMeme + 1);
	};

	useEffect(() => {
		loadMemes();
	}, []);

	useEffect(() => {
		prepareMeme();
	}, [currentMeme]);

	return [
		meme,
		loading,
		currentMeme !== null && memesData !== null && currentMeme + 1 < memesData.length
			? nextMeme
			: null
	];
}

export default useMeme;
