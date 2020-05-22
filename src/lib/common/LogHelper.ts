// lib/common/LogHelper.ts

import log4js, { configure, getLogger } from "log4js"
import path from 'path'
import { rootDir } from "../../start";
export class LogHelper
{

    static logger: log4js.Logger;

    //trace debug info warn error fatal
    //输出级别 
    static logLevel: string = 'trace';
    static logLevelDefine:any = {
        "trace": 1,
        "debug": 2,
        "info": 3,
        "warn": 4,
        "error": 5,
        "fatal":6,
    }

    static Init()
    {

        if (process.env.LOG_LEVEL) {
            LogHelper.logLevel = process.env.LOG_LEVEL;
        }

        configure({
            pm2: process.env.NODE_ENV === 'production',//如果使用pm2运行nodejs,可以设置运行环境为 production
            pm2InstanceVar: 'INSTANCE_ID',
            disableClustering: true,
            //配置不同的输出目的地-这里同时打印到文件 和 控制台
            appenders: {
                logFile: {
                    type: 'file',
                    filename: path.join(rootDir, '../logs/', new Date().toLocaleDateString()+'.log'), //设置文件储存路径,这里用日期作为文件名
                    maxLogSize: 500000,
                    backups: 5,
                    replaceConsole: true
                },
                console: {
                    type: 'console',
                    replaceConsole: true
                },
            },
            //配置不同的logger类别
            //trace debug info warn error fatal
            categories: {
                default: { appenders: ['console', 'logFile'], level: LogHelper.logLevel },
            },
        });

        LogHelper.logger = getLogger("default");

        // log4js.shutdown(
        //     function ()
        //     {
        //         LogHelper.info("Server Stop");
        //         LogHelper.info("");
        //     });

        //重写系统的log debug warn等,代替系统原来的打印功能
        console.log = function (message: any, ...args: any[])
        {
            //首先判断打印级别
            if (LogHelper.logLevelDefine[LogHelper.logLevel]>LogHelper.logLevelDefine.debug) {
                return;
            }
            //为了拿到文件名,行数,函数名等信息,需要解析堆栈信息
            let stackInfoStr = LogHelper.stackInfo();
            //重新拼装内容,文件名+行数+方法名
            let info = `[${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})]`;
            //调用log4js的打印
            LogHelper.logger.debug(info, message, ...args);
        };
        console.debug = function (message: any, ...args: any[])
        {
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.debug)
            {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `[${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})]`;
            LogHelper.logger.debug(info, message, ...args);
        };
        console.warn = function (message: any, ...args: any[])
        {
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.warn)
            {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `[${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})]`;
            LogHelper.logger.warn(info, message, ...args);
        };
        console.error = function (message: any, ...args: any[])
        {
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.error)
            {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `[${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})]`;
            LogHelper.logger.error(info, message, ...args);
        };
        console.info = function (message: any, ...args: any[])
        {
            if (LogHelper.logLevelDefine[LogHelper.logLevel] > LogHelper.logLevelDefine.info)
            {
                return;
            }
            let stackInfoStr = LogHelper.stackInfo();
            let info = `[${stackInfoStr.file}:${stackInfoStr.line} (${stackInfoStr.method})]`;
            LogHelper.logger.info(info, message, ...args);
        };
    }


    //获取堆栈内容
    static stackInfo(num:number=0)
    {
        var stackReg = /at\s+(.*)\s+\((.*):(\d*):(\d*)\)/i;
        var stackReg2 = /at\s+()(.*):(\d*):(\d*)/i;
        let err = new Error();
        var stacklist = err.stack.split('\n').slice(3);
        var s = stacklist[num];
        var sp = stackReg.exec(s) || stackReg2.exec(s);
        var data: any = {};
        if (sp && sp.length === 5)
        {
            data.method = sp[1];
            data.path = sp[2];
            data.line = sp[3];
            data.pos = sp[4];
            data.file = path.basename(data.path);
        }
        return data;
    }

}