import { sql } from 'drizzle-orm';
import type { MySqlColumn } from 'drizzle-orm/mysql-core';
import { customType } from 'drizzle-orm/mysql-core';

// @see https://dev.mysql.com/blog-archive/mysql-8-0-uuid-support/

export type UUID = string;

export const uuidColumn = customType<{ data: UUID }>({
  dataType: () => 'binary(16)',
  toDriver: (value) => sql<UUID>`UUID_TO_BIN(${value})`
});

export const uuid = (column: MySqlColumn) => sql<UUID>`BIN_TO_UUID(${column})`;
