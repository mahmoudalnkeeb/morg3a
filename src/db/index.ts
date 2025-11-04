import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

import { config } from '@/config/index';

const pool = new Pool(config.database);

export const db = drizzle({ client: pool });
