
export class Singleton
{
    static GetInstance<T extends {}>(this: new () => T): T
    {
        if (!(<any>this).instance)
        {
            (<any>this).instance = new this();
        }
        return (<any>this).instance;
    }
}
