import { sql } from 'drizzle-orm';
import type { ReferenceConfig } from 'drizzle-orm/mysql-core';
import { char, datetime, mysqlTable, varchar } from 'drizzle-orm/mysql-core';
import { uuidColumn } from './columns/uuid';

const fkDefaultActions: ReferenceConfig['actions'] = { onDelete: 'cascade', onUpdate: 'restrict' };

export const userTable = mysqlTable('user', {
  id: uuidColumn('id').primaryKey(),
  email: varchar('email', { length: 64 }).notNull().unique(),
  salt: char('salt', { length: 16 }).notNull(),
  password: varchar('password', { length: 255 }).notNull(),
  createdAt: datetime('created_at')
    .notNull()
    .default(sql`CURRENT_TIMESTAMP`)
});

export const sessionTable = mysqlTable('session', {
  id: char('id', { length: 32 }).primaryKey(),
  userId: uuidColumn('user_id')
    .notNull()
    .references(() => userTable.id, fkDefaultActions),
  expiresAt: datetime('expires_at').notNull()
});
