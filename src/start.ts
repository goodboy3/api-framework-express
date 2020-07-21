/*
 * @Author: your name
 * @Date: 2020-05-20 15:20:32
 * @LastEditTime: 2020-07-21 23:30:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-framework-express\src\start.ts
 */

//start.ts
import fs from 'fs';
import json5 from 'json5';
import path from 'path';

//项目根目录
export const rootDir = __dirname + '/';
//加载配置文件
//读取json5文件内容
const jsonFile = fs.readFileSync(path.join(rootDir, 'config.json5')).toString();
//解析为json文件,并作为模块输出
export const config: ConfigInterface = json5.parse(jsonFile);

import { ApiServer } from './ApiServer/ApiServer';
import { LogHelper } from './lib/common/LogHelper';
//import { db } from "./lib/common/DBManager.knex";
import { cache } from './lib/common/CacheManager';
import { ConfigInterface } from './Interface/ConfigInterface';

import { db } from './lib/common/DBManager.sequelize';
import { UserModel } from './Model/UserModel';

import md5 from 'md5';

async function main() {
    //日志增强功能初始化
    LogHelper.Init();

    console.info('app start');

    //数据库连接初始化
    //db.InitMysql();
    try {
        db.InitMysql();
        await db.sequelize.authenticate();
        console.info('MySQL Connection has been established successfully.');
        //await db.sequelize.sync()
        await UserModel.sync();
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }

    ApiServer.GetInstance().Init();
    await ApiServer.GetInstance().Run();
}

main();
