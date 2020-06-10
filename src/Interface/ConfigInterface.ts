export interface ConfigInterface
{
    server: {
        port: number, //服务所使用的端口号
    },

    //数据库配置
    database: {
        server: string,//地址
        user: string,//用户名
        password: string,//密码
        port: number,//端口号
        dbname: string,//数据库名称
    },

    //redis配置
    redis: {
        host: string,
        port: number,
        password: string,
        family: number,
        db: number
    }
}