export interface OptionInterface {
  oss: Partial<{
    pathName: string,
    bucketName: string,
    accessKey: string,
    secretKey: string,
  }>,
  config: Partial<{
    
  }>
}

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
