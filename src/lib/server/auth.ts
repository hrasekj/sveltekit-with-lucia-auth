import { dev } from '$app/environment';
import { DrizzleMySQLAdapter } from '@lucia-auth/adapter-drizzle';
import type { RequestEvent } from '@sveltejs/kit';
import type { RegisteredDatabaseSessionAttributes, Session } from 'lucia';
import { Lucia, TimeSpan } from 'lucia';
import { sessionTable, userTable } from './database/schema';
import { db } from './db';
import { generateRandomId } from './password';

const adapter = new DrizzleMySQLAdapter(db, sessionTable, userTable);

export const lucia = new Lucia(adapter, {
  sessionExpiresIn: new TimeSpan(2, 'w'), // 2 weeks
  sessionCookie: {
    attributes: {
      secure: !dev
    }
  },
  getUserAttributes: ({ email }) => {
    return { email };
  }
});

export const createSession = async (
  userId: string,
  sessionAttributes: RegisteredDatabaseSessionAttributes = {}
) => {
  return lucia.createSession(userId, sessionAttributes, { sessionId: generateRandomId(32) });
};

export const setSessionCookie = (event: RequestEvent, session: Session) => {
  const sessionCookie = lucia.createSessionCookie(session.id);
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes
  });
};

export const setBlankSessionCookie = (event: RequestEvent) => {
  const sessionCookie = lucia.createBlankSessionCookie();
  event.cookies.set(sessionCookie.name, sessionCookie.value, {
    path: '.',
    ...sessionCookie.attributes
  });
};

declare module 'lucia' {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof userTable.$inferSelect;
  }
}

export class UnauthorizedError extends Error {}
