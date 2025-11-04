import { createClient } from 'redis';

import { config } from './env';

let client: ReturnType<typeof createClient> | null = null;

export async function getRedis() {
  if (client?.isOpen) return client;

  client = createClient({ url: config.redis.url });
  client.on('error', console.error);

  await client.connect();
  return client;
}
