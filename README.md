# api-framework-express

## 项目部署和启动
1. 在服务器上安装nodejs 12LTS版本
2. 打开./app/config.json5 文件,进行服务器的相关配置
3. 在package.json文件所在的目录,运行 npm install 命令,安装npm包 
4. 通过命令 node ./app/install/install.js 进行项目安装(主要是建立数据库表等工作)
5. 将必要的端口打开
6. 通过命令 node ./app/start.js 启动程序


## 自动化部署
1. 在服务器上安装nodejs 12LTS版本
2. 打开./app/config.json5 文件,进行服务器的相关配置
3. 在本目录下运行 ./app/
