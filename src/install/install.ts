import fs from 'fs';
import path from 'path';
import json5 from 'json5';
import { LogHelper } from '../lib/common/LogHelper';

export const installDir = __dirname;

console.log('Start install process...');

//加载配置文件
//读取json5文件内容
console.log('Loading config...');

const jsonFile = fs.readFileSync(path.join(installDir, '../', 'config.json5')).toString();
//解析为json文件,并作为模块输出
export const config = json5.parse(jsonFile);

console.log(config);

require(path.join(installDir, 'setupDatabase.ts'));
