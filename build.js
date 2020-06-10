const fs = require('fs-extra');
const childProcess = require('child_process');


try
{
    // 删除当前app文件夹中的所有内容
    fs.removeSync('./app');
    // 复制配置文件到app目录
    fs.copy('./src/config.json5', './app/config.json5');
    // 复制public文件夹内容到app目录
    fs.copy('./src/public', './app/public');
    //复制install.sh
    fs.copy('./src/install.sh','./app/install.sh')
    // 执行tsc命令 编译ts文件
    childProcess.exec('tsc');
} catch (err)
{
    console.log(err);
}