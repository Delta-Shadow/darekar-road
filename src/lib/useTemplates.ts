import { useEffect, useState } from 'react';
import getAllTemplates from '../api/getAllTemplates';

function useTemplates(): [Array<Template> | null, boolean] {
	const [loading, setLoading] = useState(true);
	const [templates, setTemplates] = useState<Array<Template> | null>(null);

	const loadTemplates = async () => {
		const result = await getAllTemplates();
		setLoading(false);
		if (result !== null) setTemplates(result);
	};

	useEffect(() => {
		loadTemplates();
	}, []);

	return [templates, loading];
}

export default useTemplates;
