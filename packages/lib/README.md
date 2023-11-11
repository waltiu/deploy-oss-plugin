
# deploy-oss  <a href="https://www.npmjs.com/package/deploy-oss"><img src="https://badgen.net/npm/v/deploy-oss" alt="Version"></a>
 <a href="https://www.npmjs.com/package/deploy-oss-vite-plugin"><img src="https://badgen.net/npm/v/deploy-oss-vite-plugin" alt="Version"></a>
  <a href="https://www.npmjs.com/package/deploy-oss-webpack-plugin"><img src="https://badgen.net/npm/v/deploy-oss-webpack-plugin" alt="Version"></a>

<p align="center">

 </p>

将前端打包资源通过s3 api 部署到oss上

## Install

```
npm i -D deploy-oss
```

or

```
npm i -D deploy-oss-vite-plugin
```
or

```
npm i -D deploy-oss-webpack-plugin
```

## Usage


```js

import deploy from "deploy-oss";

 deploy("dist",{
  {
    accessKey: "", // 密钥对
    secretKey: "", // 密钥对
    bucketName: "", // bucket名称
    pathName: "test" // 文件地址
  }
 })
```

