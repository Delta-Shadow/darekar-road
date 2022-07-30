async function downloadImg(url: string) {
	const img = new Image();
	img.src = url;
	return new Promise((resolve, reject) => {
		img.onload = () => resolve(true);
		img.onerror = err => reject('Error while downloading Image: ' + err);
	});
}

export default downloadImg;
