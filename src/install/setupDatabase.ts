import { config } from './install';
import knex from 'knex';

console.log();
console.log('Start setup database...');

const database = knex({
    client: 'mysql2', //指明数据库类型，还可以是pg，sqlite3等等
    connection: {
        //指明连接参数
        host: config.database.server || '127.0.0.1', //地址,
        user: config.database.user || 'root', //用户名,
        password: config.database.password || '123456', //密码,
        port: config.database.port || 3306, //端口号,
        database: config.database.dbname || 'test', //数据库名称
    },
    debug: process.env.NODE_ENV === 'dev', //指明是否开启debug模式，默认为true表示开启
    pool: {
        //指明数据库连接池的大小，默认为{min: 2, max: 10}
        min: 2,
        max: 10,
    },
    acquireConnectionTimeout: 10000, //指明连接计时器超时，默认为60000ms
});

const schema = database.schema;

//users表
async function CreateUserTable() {
    console.log('Creating Table:users');

    await schema.dropTableIfExists('users');
    await schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.string('email', 100).notNullable();
        table.string('password', 50).notNullable();
        table.string('phone', 15);
        table.string('username', 30);
        table.string('nickname', 30);
        table.integer('age', 3);
    });
}

async function main() {
    try {
        await CreateUserTable();

        await database.destroy();

        console.log('Setup database finish.');
    } catch (error) {
        console.error(error);
    }
}

main();
