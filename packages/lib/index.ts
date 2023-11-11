/* eslint-disable @typescript-eslint/no-explicit-any */
import * as fs from "fs";
import { getFilePath } from './util'
import { FileItemType, OptionInterface, deployType } from './type';
import { getClient, uploadFile } from './oss';
import mime from 'mime';

const deploy: deployType = (outDir: string, options: OptionInterface) => {
    const ossConfig = options
    console.log("*************************");
    console.log("部署流程准备中...");
    console.log("*************************");
    const startTime = new Date().getTime();
    const client = getClient(ossConfig || {})
    getFilePath(outDir).then(async (fileList: FileItemType[]) => {
        console.log(fileList,'fileList')
        if (fileList.length) {
            console.log(`共${fileList.length}个文件，将被上传，目标为${ossConfig?.bucketName}/${ossConfig.pathName}`);
            console.log('-------------------------------------------------------------')
            await Promise.all(fileList.map((item) => {
                const fileData = fs.readFileSync(item.localPath)
                const params = { Bucket: ossConfig.bucketName, Key: `${ossConfig.pathName}/${item.remotePath}`, Body: fileData, ContentType: mime.getType(item.remotePath) };
                return uploadFile(client, params)
            })).then(async () => {
                console.log('文件上传成功')
            }).catch(err => {
                console.log("文件上传失败：", err.red)
            })
            const duration = (new Date().getTime() - startTime) / 1000;
            console.log("*************************");
            console.log("\x1b[32m%s\x1b[0m", `已完成上线 ^_^, cost ${duration.toFixed(2)}s`);
            console.log("*************************");

        } else {
            console.log("暂无部署文件，上线中断！！！！！",)
        }
    });
}


export default deploy