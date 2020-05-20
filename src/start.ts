//start.ts

import fs from "fs";
import json5 from "json5";
import path from 'path'
import { ApiServer } from "./ApiServer/ApiServer";

//项目根目录
export const rootDir = __dirname + "/";

//加载配置文件
//读取json5文件内容
let jsonFile = fs.readFileSync(path.join(rootDir, "./config.json5")).toString();
//解析为json文件,并作为模块输出
export let config = json5.parse(jsonFile);

async function main()
{
    ApiServer.GetInstance().Init();
    await ApiServer.GetInstance().Run();
}

main();