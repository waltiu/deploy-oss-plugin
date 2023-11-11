import { OptionInterface } from "./type";
import AWS from 'aws-sdk'
import { endpoint } from "./constant";

export const getClient = (ossOptions: OptionInterface["oss"]) => {
    // oss-京东云： https://docs.jdcloud.com/cn/object-storage-service/sdk-nodejs
    const s3: any = new AWS.S3({ apiVersion: '2006-03-01' });
    s3.endpoint = endpoint;
    s3.config.update({
      endpoint: endpoint,
      accessKeyId: ossOptions.accessKey,
      secretAccessKey: ossOptions.secretKey,
      s3ForcePathStyle: true,
      signatureVersion: "v4"
    })
    return s3
  }
  
  
  
 export  const uploadFile = (client, params) => {
    return new Promise((resolve, reject) => {
      client.upload(params, (err, data) => {
        if (err) {
          reject(`${params.key}：${err}`);
        } else {
          resolve(data)
        }
      });
    })
  }