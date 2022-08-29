import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { storage } from '../lib/firebase';

export async function uploadImg(
	name: string,
	role: 'customMeme' | 'template',
	img: File
): Promise<string> {
	const snapshot = await uploadBytes(ref(storage, `${role}/${name}_${img.name}`), img);
	const url = await getDownloadURL(snapshot.ref);
	return url;
}

export async function downloadImg(url: string) {
	const img = new Image();
	img.src = url;
	return new Promise((resolve, reject) => {
		img.onload = () => resolve(true);
		img.onerror = err => reject('Error while downloading Image: ' + err);
	});
}
