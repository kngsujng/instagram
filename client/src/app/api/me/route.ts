// import { sendEmail } from '@/app/api/email';

import { getUserByUsername } from '@/service/user';
import { NextResponse } from 'next/server';
import { withSessionUser } from '@/utils/session';

export async function GET() {
	return withSessionUser(async (user) => {
		return getUserByUsername(user.username) //
			.then((data) => NextResponse.json(data));
	});
}
