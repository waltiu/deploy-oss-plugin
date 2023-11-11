export interface OptionInterface {
    pathName: string,  // 文件的路径
    bucketName: string, // bucket名称
    accessKey: string, // 密钥对
    secretKey: string, // 密钥对
    endpoint?:string // 服务器地址
}

// outDir 打包文件的地址，方便后面去遍历找文件
export type deployType=(outDir:string,options:OptionInterface)=>void

export interface PluginRes {
  name: string;
  enforce: "pre" | "post" | undefined;
  apply: "build" | "serve";
  configResolved(config: any): void;
  closeBundle(): Promise<void>;
}


export type FileItemType = {
  localPath: string,
  remotePath: string
}
