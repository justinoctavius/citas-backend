import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  username: 'postgres',
  password: 'admin',
  database: 'citas',
  entities: ['dist/**/*.entity{.js, .ts}'],
  migrations: ['dist/src/database/migrations/*{.js,.ts}'],
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;
