import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DATABASE_HOST || 'localhost',
  username: process.env.DATABASE_USER || 'postgres',
  password: process.env.DATABASE_PASSWORD || 'admin',
  database: process.env.DATABASE_NAME || 'citas',
  entities: ['dist/**/*.entity{.js, .ts}'],
  migrations: ['dist/src/database/migrations/*{.js,.ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
