// lib/common/CacheManager.ts

import ioredis, { Redis } from 'ioredis';
import { config } from '../../start';

export class CacheManager {
    //单例
    private static instance: CacheManager = null;
    private constructor() {}
    public static GetInstance() {
        if (CacheManager.instance == null) {
            CacheManager.instance = new CacheManager();
        }
        return CacheManager.instance;
    }

    //mysql数据库对象
    redis: Redis = null;

    InitRedis() {
        //new一个redis对象,可以配置一些参数,也可以保持默认值
        this.redis = new ioredis({
            port: config.redis.port || 6379, // Redis port
            host: config.redis.host || '127.0.0.1', // Redis host
            family: config.redis.family || 4, // 4 (IPv4) or 6 (IPv6)
            password: config.redis.password || null,
            db: config.redis.db || 0,
        });

        //错误监听
        this.redis.on('error', function (err) {
            console.error('Error ', err);
        });

        this.redis.on('ready', function (err) {
            console.info('redisCache connection succeed');
        });
    }
}

//导出RedisManager这个单例对象,其他的文件中使用这个导出的对象即可
export const cache = CacheManager.GetInstance();
