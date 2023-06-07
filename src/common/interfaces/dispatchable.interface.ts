export interface DispatchableInterface {
    invoke(args: any): Promise<any>;
}