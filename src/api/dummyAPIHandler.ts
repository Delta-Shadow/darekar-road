async function dummyAPIHandler(): Promise<void> {
	return new Promise((resolve, reject) => {
		setTimeout(() => {
			if (Math.random() < 0.5) resolve();
			else reject();
		}, 2000);
	});
}

export default dummyAPIHandler;
