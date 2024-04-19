import { authValidateSession } from '$lib/server/hooks/authValidateSession';
import { sequence } from '@sveltejs/kit/hooks';

export const handle = sequence(authValidateSession);
