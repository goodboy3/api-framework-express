// lib/common/DBManager.sequelize.ts

import { Sequelize } from 'sequelize';
import { config } from '../../start';

export class DBManager
{
    //单例
    private static instance: DBManager = null;
    private constructor()
    {

    }
    public static GetInstance()
    {
        if (DBManager.instance == null)
        {
            DBManager.instance = new DBManager();

        }
        return DBManager.instance;
    }

    //连接数据库,参数中填写数据库地址,端口等信息
    sequelize: Sequelize = null;
    

    InitMysql()
    {
        if (this.sequelize != null)
        {
            console.log("already inited");
            return;
        }
        this.sequelize = new Sequelize(
            config.database.dbname,
            config.database.user,
            config.database.password,
            {
                host: config.database.server,
                dialect: "mysql",
                pool: {
                    min: 0,
                    max: 10,
                    idle: 30000,
                },
                // disable logging; default: console.log
                logging: false
            }
        )
    }
}

export const db = DBManager.GetInstance()//直接导出一个db 代码写起来方便一点
    