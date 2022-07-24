import { useEffect, useState } from 'react';
import getTemplate from '../api/getTemplate';

function useTemplate(id: string): [Template | null, boolean] {
	const [loading, setLoading] = useState(true);
	const [template, setTemplate] = useState<Template | null>(null);

	const loadTemplate = async () => {
		const result = await getTemplate(id);
		setLoading(false);
		if (result !== null) setTemplate(result);
	};

	useEffect(() => {
		loadTemplate();
	}, []);

	return [template, loading];
}

export default useTemplate;
