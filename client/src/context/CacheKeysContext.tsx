import { useContext, createContext } from 'react';

type CacheKeysValue = {
	postsKey: string; // post를 읽어오기 위한 cache key
};

export const CacheKeysContext = createContext<CacheKeysValue>({
	postsKey: '/api/posts',
});

export const useCacheKeys = () => useContext(CacheKeysContext);
