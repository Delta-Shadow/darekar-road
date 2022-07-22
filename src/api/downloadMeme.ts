import { getDoc } from 'firebase/firestore';

async function downloadMeme(data: MemeData): Promise<Meme | null> {
	if (data.isCustom) {
		// Download the custom image
		const img = new Image();
		img.src = data.customImg;
		return new Promise((resolve) => {
			// Once download completes, return required data
			img.onload = () =>
				resolve({
					creationTime: data.creationTime,
					img: data.customImg,
					textboxes: null
				});

			// If there was an error, return null
			img.onerror = (err) => {
				console.log(err);
				resolve(null);
			};
		});
	} else {
		// Fetch the template used to build this meme
		const doc = await getDoc(data.template);
		const template = doc.data() as Template;
		// Download the custom image
		const img = new Image();
		img.src = template.img;
		return new Promise((resolve) => {
			// Once download completes, return required data
			img.onload = () => {
				resolve({
					creationTime: data.creationTime,
					img: template.img,
					textboxes: data.textboxes.map((content, i) => ({
						...template.textboxes[i],
						content: content
					}))
				});
			};

			// If there was an error, return null
			img.onerror = (err) => {
				console.log(err);
				resolve(null);
			};
		});
	}
}

export default downloadMeme;
