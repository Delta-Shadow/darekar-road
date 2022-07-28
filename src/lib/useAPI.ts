import { useEffect, useState } from 'react';

type EndpointHandler = (...args: any) => Promise<any>;
type PromisedValue<T extends EndpointHandler> = Awaited<ReturnType<T>> | null;
type Status = 'not_started' | 'waiting' | 'finished' | 'failed';
type ReturnObject<T extends EndpointHandler> = [
	PromisedValue<T>,
	Status,
	(...args: Parameters<T>) => void
];
type Options<T extends EndpointHandler> = {
	delayedReset?: boolean;
	resetDelay?: number; // milliseconds
	quickReset?: boolean;
	fallbackValue?: PromisedValue<T>;
};

function useAPI<T extends EndpointHandler>(
	endpointHandler: T,
	options?: Options<T>
): ReturnObject<T> {
	const [value, setValue] = useState<PromisedValue<T>>(null);
	const [status, setStatus] = useState<Status>('not_started');

	const loadValue = async (args: Parameters<T>) => {
		setStatus('waiting');
		try {
			const result = await endpointHandler(...args);
			setValue(result);
			setStatus('finished');
		} catch (err) {
			console.error(err);
			setStatus('failed');
			if (options?.fallbackValue !== undefined)
				setValue(options.fallbackValue);
		}
	};

	const trigger = (...args: Parameters<T>) => {
		if (status !== 'waiting') {
			if (endpointHandler.length > args.length)
				throw new Error('Incorrect arguments for the endpoint handler');
			loadValue(args);
		}
	};

	const reset = () => {
		if (status === 'finished' || status === 'failed')
			setStatus('not_started');
	};

	useEffect(() => {
		if (status === 'finished' || status === 'failed') {
			if (options?.quickReset) {
				reset();
			} else if (options?.delayedReset) {
				setTimeout(reset, options.resetDelay || 1000);
			}
		}
	}, [status]);

	return [value, status, trigger];
}

export default useAPI;
