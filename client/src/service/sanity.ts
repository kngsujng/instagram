import { createClient } from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// sanity 데이터베이스 조작할 수 있는 권한 설정
export const client = createClient({
	projectId: process.env.SANITY_PROJECT_ID,
	dataset: process.env.SANITY_DATASET,
	useCdn: false,
	apiVersion: '2024-01-23',
	token: process.env.SANITY_SECRET_TOKEN,
	fetch: {
		cache: 'no-store',
	},
});

const builder = imageUrlBuilder(client);

export default function urlFor(image: SanityImageSource) {
	return builder.image(image).width(800).url();
}

export const assetsURL = `https://${process.env.SANITY_PROJECT_ID}.api.sanity.io/v2021-06-07/assets/images/${process.env.SANITY_DATASET}`;
