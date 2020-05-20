// ApiServer/ApiServer.ts

import express, { Application } from "express"
import { config, rootDir } from "../start";
import path from 'path'



export class ApiServer
{
    //单例
    private static instance: ApiServer = null;
    private constructor()
    {

    }
    public static GetInstance()
    {
        if (ApiServer.instance == null)
        {
            ApiServer.instance = new ApiServer();
        }
        return ApiServer.instance;
    }

    //此类的核心成员
    private app: Application = null;

    //初始化
    Init()
    {
        this.app = express();
        //此处使用config.server.port 这是从配置文件中获取的内容
        //如果配置文件中有port定义,就使用配置文件中的,如果没有,则使用默认50000
        let serverPort = config.server.port || 50000;
        let server = this.app.listen(serverPort, () => { console.info(`Example app listening on port ${serverPort}`) })

        //让express 能够处理 async/await 中抛出的异常
        const layer = require('express/lib/router/layer');
        Object.defineProperty(layer.prototype, 'handle', {
            enumerable: true,
            get()
            {
                return this.__handle;
            },
            set(fn)
            {
                if (fn.length === 4)
                {
                    this.__handle = fn;
                }
                else
                {
                    this.__handle = (req, res, next) =>
                    {
                        Promise.resolve(fn(req, res, next)).catch(next);
                    }
                }
            }

        });
    }

    Run()
    {

        //测试消息
        this.StartTestResponse();

        //public文件夹下的静态资源,可以直接进行访问
        this.app.use(express.static(path.join(rootDir, 'public')));
    }

    //测试消息
    StartTestResponse()
    {
        this.app.all('/api/test', (req, res) =>
        {
            res.writeHead(200, {
                'Content-Type': 'text-plain'
            });
            res.end('Hello World\n' + new Date().toString());
        })
    }

}