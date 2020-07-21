// Model/UserModel.ts
import { Sequelize, Model, DataTypes, BuildOptions } from 'sequelize';
import {
    HasManyGetAssociationsMixin,
    HasManyAddAssociationMixin,
    HasManyHasAssociationMixin,
    Association,
    HasManyCountAssociationsMixin,
    HasManyCreateAssociationMixin,
} from 'sequelize';
import { db } from '../lib/common/DBManager.sequelize';

//下面的UserModel.init代码需要用到一个sequelize的实例,这里的实例是从DBManager获取的,详解DBManager.sequelize.ts文件
db.InitMysql();
const sequelize = db.sequelize;

export class UserModel extends Model {
    public id!: number; // 注意在严格模式下需要 `null assertion` 或 `！`.
    public email!: string;
    public password!: string;
    public phone!: string | null; //可以为空的字段
    public username!: string | null;
    public nickname!: string | null;
    public age!: number | null;
}

UserModel.init(
    {
        id: {
            type: DataTypes.BIGINT({ length: 10 }).UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        email: {
            type: DataTypes.STRING(100),
            allowNull: false,
        },
        password: {
            type: DataTypes.STRING(32),
            allowNull: false,
        },
        phone: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        username: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        nickname: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        age: {
            type: DataTypes.INTEGER({ length: 3 }),
            allowNull: true,
        },
    },
    {
        // 将自动设置所有属性的字段参数为下划线命名方式.
        // 不会覆盖已经定义的字段选项
        underscored: true,

        // 不添加时间戳属性 (updatedAt, createdAt)
        timestamps: false,
        // 不删除数据库条目,但将新添加的属性deletedAt设置为当前日期(删除完成时).
        // paranoid 只有在启用时间戳时才能工作
        paranoid: false,
        // 禁用修改表名; 默认情况下,sequelize将自动将所有传递的模型名称(define的第一个参数)转换为复数. 如果你不想这样,请设置以下内容
        freezeTableName: true,
        // 定义表的名称
        tableName: 'users',
        sequelize,
    },
);
