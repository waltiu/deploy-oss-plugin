interface OptionInterface {
    pathName: string;
    bucketName: string;
    accessKey: string;
    secretKey: string;
    endpoint?: string;
}

declare class DeployWebpackPlugin {
    private options;
    constructor(config: OptionInterface);
    apply(compiler: any): void;
}

export { DeployWebpackPlugin };
