async function downloadImg(url: string): Promise<boolean> {
	const img = new Image();
	img.src = url;
	return new Promise((resolve, reject) => {
		img.onload = () => resolve(true);
		img.onerror = (err) => {
			console.log('Error while downloading Image', err);
			resolve(false);
		};
	});
}

export default downloadImg;
