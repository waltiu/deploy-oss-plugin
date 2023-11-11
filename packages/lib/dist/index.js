var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);

// index.ts
var lib_exports = {};
__export(lib_exports, {
  default: () => lib_default
});
module.exports = __toCommonJS(lib_exports);
var fs2 = __toESM(require("fs"));

// util.ts
var fs = __toESM(require("fs"));
var import_glob = require("glob");
var dealPath = (dir, file) => {
  dir = `${dir}/`;
  return file.replace(/\\/g, "/").replace(dir.replace(/\\/g, "/"), "");
};
var getFilePath = function(dir) {
  return new Promise(function(resolve, rejects) {
    try {
      console.log("\u6B63\u5728\u67E5\u8BE2\u5C06\u4E0A\u4F20\u7684\u9759\u6001\u8D44\u6E90\u6587\u4EF6\uFF0C\u8BF7\u7A0D\u7B49...");
      const stat = fs.statSync(dir);
      let fileList = [];
      if (stat.isFile()) {
        console.log(`\u8BF7\u5C06\u8981\u4E0A\u4F20\u7684\u6587\u4EF6\u653E\u5230\u6253\u5305\u76EE\u5F55\u4E0B\uFF01\uFF01\uFF01\uFF01\uFF01\uFF01`);
      } else {
        fileList = (0, import_glob.globSync)(dir + "/**", {
          dot: true
        }).filter(function(file) {
          const stat2 = fs.statSync(file);
          return stat2.isFile();
        }).map(function(file) {
          const uploadTarget = {
            localPath: "",
            remotePath: ""
          };
          uploadTarget.localPath = file;
          uploadTarget.remotePath = dealPath(dir, file);
          return uploadTarget;
        });
      }
      resolve(fileList);
    } catch (e) {
      rejects(e);
    }
  });
};

// oss.ts
var import_aws_sdk = __toESM(require("aws-sdk"));

// constant.ts
var endpoint = "https://s3.cn-north-1.jdcloud-oss.com";

// oss.ts
var getClient = (ossOptions) => {
  const s3 = new import_aws_sdk.default.S3({ apiVersion: "2006-03-01" });
  s3.endpoint = ossOptions.endpoint || endpoint;
  s3.config.update({
    endpoint: ossOptions.endpoint || endpoint,
    accessKeyId: ossOptions.accessKey,
    secretAccessKey: ossOptions.secretKey,
    s3ForcePathStyle: true,
    signatureVersion: "v4"
  });
  return s3;
};
var uploadFile = (client, params) => {
  return new Promise((resolve, reject) => {
    client.upload(params, (err, data) => {
      if (err) {
        reject(`${params.key}\uFF1A${err}`);
      } else {
        resolve(data);
      }
    });
  });
};

// index.ts
var import_mime = __toESM(require("mime"));
var deploy = (outDir, options) => {
  const ossConfig = options;
  console.log("*************************");
  console.log("\u90E8\u7F72\u6D41\u7A0B\u51C6\u5907\u4E2D...");
  console.log("*************************");
  const startTime = (/* @__PURE__ */ new Date()).getTime();
  const client = getClient(ossConfig || {});
  getFilePath(outDir).then(async (fileList) => {
    console.log(fileList, "fileList");
    if (fileList.length) {
      console.log(`\u5171${fileList.length}\u4E2A\u6587\u4EF6\uFF0C\u5C06\u88AB\u4E0A\u4F20\uFF0C\u76EE\u6807\u4E3A${ossConfig == null ? void 0 : ossConfig.bucketName}/${ossConfig.pathName}`);
      console.log("-------------------------------------------------------------");
      await Promise.all(fileList.map((item) => {
        const fileData = fs2.readFileSync(item.localPath);
        const params = { Bucket: ossConfig.bucketName, Key: `${ossConfig.pathName}/${item.remotePath}`, Body: fileData, ContentType: import_mime.default.getType(item.remotePath) };
        return uploadFile(client, params);
      })).then(async () => {
        console.log("\u6587\u4EF6\u4E0A\u4F20\u6210\u529F");
      }).catch((err) => {
        console.log("\u6587\u4EF6\u4E0A\u4F20\u5931\u8D25\uFF1A", err.red);
      });
      const duration = ((/* @__PURE__ */ new Date()).getTime() - startTime) / 1e3;
      console.log("*************************");
      console.log("\x1B[32m%s\x1B[0m", `\u5DF2\u5B8C\u6210\u4E0A\u7EBF ^_^, cost ${duration.toFixed(2)}s`);
      console.log("*************************");
    } else {
      console.log("\u6682\u65E0\u90E8\u7F72\u6587\u4EF6\uFF0C\u4E0A\u7EBF\u4E2D\u65AD\uFF01\uFF01\uFF01\uFF01\uFF01");
    }
  });
};
var lib_default = deploy;
