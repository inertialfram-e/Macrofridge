import { PowerSyncDatabase } from '@powersync/react-native';
import { AppSchema } from './schema';
import { SupabaseConnector } from './connector';

export const db = new PowerSyncDatabase({
  schema: AppSchema,
  database: {
    dbFilename: 'macrofridge.db',
  },
});

export const connector = new SupabaseConnector();

export const setupPowerSync = async () => {
  await db.init();
  await db.connect(connector);
};
