// lib/common/DBManager.ts

import knex from 'knex';
import { config } from '../../start';

export class DBManager {
    //单例
    private static instance: DBManager = null;
    private constructor() {}
    public static GetInstance() {
        if (DBManager.instance == null) {
            DBManager.instance = new DBManager();
        }
        return DBManager.instance;
    }

    //mysql数据库对象
    sqldb: knex = null;

    //连接数据库,参数中填写数据库地址,端口等信息
    InitMysql() {
        this.sqldb = knex({
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

        //后期加入测试数据库是否连接成功的代码
    }
}

export const db = DBManager.GetInstance(); //直接导出一个db 代码写起来方便一点
