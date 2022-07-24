import { useEffect, useState } from 'react';

type EndpointHandler = (...args: any) => Promise<any>;
type PromisedValue<T extends EndpointHandler> = Awaited<ReturnType<T>> | null;
type Status = 'not_started' | 'waiting' | 'finished' | 'failed';
type ReturnObject<T extends EndpointHandler> = [PromisedValue<T>, Status, () => void];
type Options<T extends EndpointHandler> = {
	args?: Parameters<T>;
	delayedReset?: boolean;
	resetDelay?: number; // milliseconds
	quickReset?: boolean;
	fallbackValue?: PromisedValue<T>;
};

function useAPI<T extends EndpointHandler>(
	endpointHandler: T,
	options?: Options<T>
): ReturnObject<T> {
	if (endpointHandler.length > (options?.args === undefined ? 0 : options.args.length))
		throw new Error('Incorrect arguments for the endpoint handler');

	const [value, setValue] = useState<PromisedValue<T>>(null);
	const [status, setStatus] = useState<Status>('not_started');

	const loadValue = async () => {
		setStatus('waiting');
		try {
			const result = await endpointHandler();
			setValue(result);
			setStatus('finished');
		} catch (err) {
			console.error(err);
			setStatus('failed');
			if (options?.fallbackValue !== undefined) setValue(options.fallbackValue);
		}
	};

	const trigger = () => {
		if (status !== 'waiting') loadValue();
	};

	const reset = () => {
		if (status === 'finished' || status === 'failed') setStatus('not_started');
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
