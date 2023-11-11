import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { DeployWebpackPlugin } from "deploy-oss-vite-plugin";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), DeployWebpackPlugin({
    accessKey: "",
    secretKey: "",
    bucketName: "",
    pathName: "test"
  })],
})
