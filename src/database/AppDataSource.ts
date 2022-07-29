import { DataSource } from 'typeorm';

import Transaction from './entities/Transactions';
import User from './entities/User';

const { PG_HOST, POSTGRES_DB, POSTGRES_USER, PG_PORT, POSTGRES_PASSWORD, NODE_ENV } = process.env;

const inProductionMode = NODE_ENV === 'production';

if (!(PG_HOST && POSTGRES_DB && POSTGRES_USER && PG_PORT && POSTGRES_PASSWORD)) {
  throw new Error('Your database credentials were not provided in the environment variables.');
}

const entities = [User, Transaction];

const LocalAppDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: parseInt(PG_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities,
  synchronize: true,
  logging: false,
});

const CloudAppDataSource = new DataSource({
  type: 'postgres',
  host: PG_HOST,
  port: parseInt(PG_PORT),
  username: POSTGRES_USER,
  password: POSTGRES_PASSWORD,
  database: POSTGRES_DB,
  entities,
  synchronize: false,
  logging: false,
  migrations: [],
  subscribers: [],
  ssl: true,
});

const AppDataSource = inProductionMode ? CloudAppDataSource : LocalAppDataSource;

export default AppDataSource;
