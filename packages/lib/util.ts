import * as fs from "fs";
import { globSync } from "glob";
import { FileItemType } from "./type";
const dealPath = (dir, file) => {
  dir = `${dir}/`
  return file.replace(/\\/g, "/").replace(dir.replace(/\\/g, "/"), "");
};

export const getFilePath = function (dir) {
  return new Promise(function (resolve, rejects) {
    try {
      console.log("正在查询将上传的静态资源文件，请稍等...");
      const stat = fs.statSync(dir);
      let fileList = [];
      if (stat.isFile()) {
        console.log(`请将要上传的文件放到打包目录下！！！！！！`)
      } else {
        fileList = globSync
          (dir + "/**", {
            dot: true,
          })
          .filter(function (file) {
            const stat = fs.statSync(file);
            return stat.isFile();
          })
          .map(function (file) {
            const uploadTarget: FileItemType = {
              localPath: "",
              remotePath: ""
            };
            uploadTarget.localPath = file;
            uploadTarget.remotePath = dealPath(dir, file)
            return uploadTarget;
          }) as any;
      }
      resolve(fileList);
    } catch (e) {
      rejects(e);
    }
  });
};
