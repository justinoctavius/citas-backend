import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  url: process.env.DATABASE_URL,
  entities: ['dist/**/*.entity{.js, .ts}'],
  migrations: ['dist/src/database/migrations/*{.js,.ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
