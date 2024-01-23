declare module 'next-auth' {
	interface Profile {
		user:
			| {
					name?: string | null | undefined;
					email?: string | null | undefined;
					image?: string | null | undefined;
			  }
			| undefined;
	}
}
