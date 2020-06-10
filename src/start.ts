//start.ts
import fs from "fs"
import json5 from "json5";
import path from 'path'


//项目根目录
export const rootDir = __dirname + "/";
//加载配置文件
//读取json5文件内容
let jsonFile = fs.readFileSync(path.join(rootDir, "config.json5")).toString();
//解析为json文件,并作为模块输出
export let config: ConfigInterface = json5.parse(jsonFile);


import { ApiServer } from "./ApiServer/ApiServer";
import { LogHelper } from "./lib/common/LogHelper";
//import { db } from "./lib/common/DBManager.knex";
import { cache } from "./lib/common/CacheManager";
import { ConfigInterface } from "./Interface/ConfigInterface"

import { db } from "./lib/common/DBManager.sequelize";
import {UserModel} from "./Model/UserModel"

import md5 from "md5"


async function main()
{
    //日志增强功能初始化
    LogHelper.Init();

    console.info("app start");

    //数据库连接初始化
    //db.InitMysql();
    try
    {
        db.InitMysql()
        await db.sequelize.authenticate();
        console.info('MySQL Connection has been established successfully.');
        //await db.sequelize.sync()
        await UserModel.sync();
    } catch (err) {
        console.error('Unable to connect to the database:', err);
    }

    // let newUser = await UserModel.create({
    //     email: "test@test.com",
    //     password: md5("123456"),//密码保存为MD5形式
    // })
    // console.log(newUser);

    let users = await UserModel.findAll();
    console.log(users[0].email);
    
    
    
    //Redis初始化
    cache.InitRedis();

    // //Redis测试
    // //1 直接设置key-value 并且在100秒后过期
    // let result = await cache.redis.set("visitorCount", 1,"EX",100)
    // console.log("result:",result);

    // //2 读取刚刚设置的key的值
    // let value = await cache.redis.get("visitorCount");
    // console.log("visitorCount:", value);

    // //3 设置hash 并且在300秒后过期
    // await cache.redis.hset("1", "id", 1);
    // await cache.redis.hset("1", "name", "zhang")
    // await cache.redis.hset("1", "age", 35)
    // await cache.redis.hset("1", "phone", "15965874521")
    // await cache.redis.expire("1", 300);



    // //4 读取刚刚设置的内容
    // let hValue = await cache.redis.hgetall("1");
    // console.log("hValue:",hValue);


    console.log(Date.now());
    console.log(process.hrtime());



    ApiServer.GetInstance().Init();
    await ApiServer.GetInstance().Run();

}

main();