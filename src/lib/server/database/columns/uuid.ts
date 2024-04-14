import { sql } from 'drizzle-orm';
import type { MySqlColumn } from 'drizzle-orm/mysql-core';
import { customType } from 'drizzle-orm/mysql-core';
import { stringify as uuidStringify } from 'uuid';

// @see https://dev.mysql.com/blog-archive/mysql-8-0-uuid-support/

export type UUID = string;

export const uuidColumn = customType<{ data: UUID; driverData: Buffer }>({
  dataType: () => 'binary(16)',
  toDriver: (value) => sql<UUID>`UUID_TO_BIN(${value})`,
  // I hope this workaround will not be needed in the future.
  // @see https://github.com/drizzle-team/drizzle-orm/issues/2159
  fromDriver: (value) => uuidStringify(value)
});

export const uuid = (column: MySqlColumn) => sql<UUID>`BIN_TO_UUID(${column})`;
