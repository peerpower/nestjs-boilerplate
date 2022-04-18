const { readFileSync } = require('fs');
const yaml = require('js-yaml');
const { join } = require('path');

const YAML_CONFIG_FILENAME = 'config.yaml';

const config = yaml.load(readFileSync(join(__dirname, YAML_CONFIG_FILENAME), 'utf8'));

const { DB_TYPE, DB_HOST, DB_USERNAME, DB_PASSWORD, DB_PORT, DB_DATABASE } = config;

module.exports = {
    type: DB_TYPE,
    host: DB_HOST,
    port: DB_PORT,
    username: DB_USERNAME,
    password: DB_PASSWORD,
    database: DB_DATABASE,
    migrations: [__dirname + '/src/migrations/*{.ts,.js}'],
    entities: [__dirname + '/src/**/*.entity.{ts,js}'],
    cli: {
        migrationsDir: __dirname + '/src/migrations/',
    },
};
