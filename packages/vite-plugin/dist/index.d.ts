interface OptionInterface {
    pathName: string;
    bucketName: string;
    accessKey: string;
    secretKey: string;
    endpoint?: string;
}
interface PluginRes {
    name: string;
    enforce: "pre" | "post" | undefined;
    apply: "build" | "serve";
    configResolved(config: any): void;
    closeBundle(): Promise<void>;
}

declare function DeployWebpackPlugin(options: OptionInterface): PluginRes | undefined;

export { DeployWebpackPlugin };
