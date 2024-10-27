import { createRequire } from 'module';
const require = createRequire(import.meta.url);
require('ts-node').register({ transpileOnly: true });
import './src/backend/db/tabbel.ts';
import './src/backend/db/seeder.ts';
