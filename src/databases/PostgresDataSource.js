import 'reflect-metadata';
import { DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

// eslint-disable-next-line import/prefer-default-export
export const PostgresDataSource = new DataSource({
  type: 'postgres',
  host: 'localhost',
  port: Number(5432),
  username: 'postgres',
  password: 'password',
  database: 'kafka',
  synchronize: false,
  logging: 'true',
  namingStrategy: new SnakeNamingStrategy(),
});

async function init() {
  await PostgresDataSource.initialize();
  await PostgresDataSource.query(`
        CREATE TABLE IF NOT EXISTS territories (
            id VARCHAR PRIMARY KEY,
            name VARCHAR,
            grouping VARCHAR,
            geometry GEOMETRY
        );
    `);
}

init();
