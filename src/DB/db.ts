import { Pool } from 'pg';

import dotenv from 'dotenv';
import { getRandomShard } from '../utils/ticketServer.util.js';

dotenv.config();

export const shards = [
  new Pool({ connectionString: process.env.SHARD_1 }),
  new Pool({ connectionString: process.env.SHARD_2 }),
  new Pool({ connectionString: process.env.SHARD_3 }),
];


export function getShard(): Pool {
  const shard = getRandomShard(shards);
  return shard;
}