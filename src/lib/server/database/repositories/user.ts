import { userTable } from '$lib/server/database/schema';
import { eq, sql } from 'drizzle-orm';
import type { drizzle } from 'drizzle-orm/mysql2';
import { uuid } from '../columns/uuid';

type NewUser = Omit<typeof userTable.$inferInsert, 'id'> & { id?: string };

export const userRepositoryFactory = (db: ReturnType<typeof drizzle>) => ({
  createUser: async ({ id, ...user }: NewUser) => {
    await db.insert(userTable).values({
      id: id === undefined ? sql`UUID_TO_BIN(UUID())` : sql`UUID_TO_BIN(${id})`,
      ...user
    });

    const result = await db
      .select({
        id: uuid(userTable.id),
        email: userTable.email
      })
      .from(userTable)
      .where(eq(userTable.email, user.email))
      .limit(1);

    return result[0];
  },

  findUserByEmail: async (email: string) => {
    const result = await db
      .select({
        id: uuid(userTable.id),
        email: userTable.email,
        salt: userTable.salt,
        password: userTable.password
      })
      .from(userTable)
      .where(eq(userTable.email, email));

    return result[0];
  }
});
