import { createClient } from '@sanity/client';

// sanity 데이터베이스 조작할 수 있는 권한 설정
export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: false,
	apiVersion: '2024-01-23',
	token: process.env.SANITY_SECRET_TOKEN,
});
