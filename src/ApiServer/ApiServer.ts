/*
 * @Author: your name
 * @Date: 2020-05-20 16:05:37
 * @LastEditTime: 2020-07-22 00:04:15
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \api-framework-express\src\ApiServer\ApiServer.ts
 */

// ApiServer/ApiServer.ts

import express, { Application } from 'express';
import { config, rootDir } from '../start';
import path from 'path';
import { Routers } from './Routers';
import cookieParser from 'cookie-parser';
import session from 'express-session';

export class ApiServer {
    //单例
    private static instance: ApiServer = null;
    private constructor() {}
    public static GetInstance() {
        if (ApiServer.instance == null) {
            ApiServer.instance = new ApiServer();
        }
        return ApiServer.instance;
    }

    //此类的核心成员
    app: Application = null;

    //初始化
    Init() {
        //让express 能够处理 async/await 中抛出的异常
        const layer = require('express/lib/router/layer');
        Object.defineProperty(layer.prototype, 'handle', {
            enumerable: true,
            get() {
                return this.__handle;
            },
            set(fn) {
                if (fn.length === 4) {
                    this.__handle = fn;
                } else {
                    this.__handle = (req, res, next) => {
                        Promise.resolve(fn(req, res, next)).catch(next);
                    };
                }
            },
        });

        this.app = express();
        //此处使用config.server.port 这是从配置文件中获取的内容
        //如果配置文件中有port定义,就使用配置文件中的,如果没有,则使用默认50000
        const serverPort = config.server.port || 50000;
        const server = this.app.listen(serverPort, () => {
            console.info(`app listening on port ${serverPort}`);
        });
        server.on('error', (error: Error) => {
            console.error(error);
        });
    }

    Run() {
        //测试消息
        this.StartTestResponse();

        //public文件夹下的静态资源,可以直接进行访问
        this.app.use(express.static(path.join(rootDir, 'public')));
        this.app.use(cookieParser());
        this.app.use(
            session({
                secret: 'keyboard cat',
                resave: false,
                saveUninitialized: true,
                cookie: { maxAge: 5 * 60 * 1000, secure: false },
            }),
        );

        //路由设置
        const router = new Routers();
        router.PathRouter();

        this.app.use('/api', router.apiRouter);
    }

    //测试消息
    StartTestResponse() {
        this.app.all('/api/test', (req, res) => {
            res.writeHead(200, {
                'Content-Type': 'text-plain',
            });
            res.end('Hello World\n' + new Date().toString());
        });
    }
}
