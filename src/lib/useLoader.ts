import { useEffect, useState } from 'react';

type Loader = (...args: any) => Promise<any>;

type PromisedValue<T extends Loader> = Awaited<ReturnType<T>> | null;

type Status = 'waiting' | 'finished' | 'failed';

type ReturnObject<T extends Loader> = [PromisedValue<T>, Status];

type Options<T extends Loader> = {
	args?: Parameters<T>;
	fallbackValue?: PromisedValue<T>;
};

function useLoader<T extends Loader>(loader: T, options?: Options<T>): ReturnObject<T> {
	// if (loader.length > (options?.args === undefined ? 0 : options.args.length))
	// throw new Error('Incorrect arguments for the loader function');

	const [data, setData] = useState<PromisedValue<T>>(null);
	const [status, setStatus] = useState<Status>('waiting');

	const loadData = async () => {
		try {
			const result = await loader();
			setData(result);
			setStatus('finished');
		} catch (err) {
			console.error(err);
			setStatus('failed');
			if (options?.fallbackValue !== undefined) setData(options.fallbackValue);
		}
	};

	useEffect(() => {
		loadData();
	}, []);

	return [data, status];
}

export default useLoader;
