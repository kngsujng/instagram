'use client';

import { useEffect, useState } from 'react';

export default function useDebounce(value: string, delay: number = 500) {
	const [debouncedValue, setDebouncedValue] = useState(value);

	useEffect(() => {
		const handler = setTimeout(() => setDebouncedValue(value), delay);
		// useEffect가 실행되면 항상 return이 실행됨
		return () => clearTimeout(handler);
	}, [value, delay]);

	return debouncedValue;
}
