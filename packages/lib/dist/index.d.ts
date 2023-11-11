interface OptionInterface {
    pathName: string;
    bucketName: string;
    accessKey: string;
    secretKey: string;
    endpoint?: string;
}
type deployType = (outDir: string, options: OptionInterface) => void;

declare const deploy: deployType;

export { deploy as default };
