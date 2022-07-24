async function dummyResourceLoader(): Promise<string> {
	return new Promise((resolve, reject) => {
		setTimeout(reject, 2000);
	});
}

export default dummyResourceLoader;
