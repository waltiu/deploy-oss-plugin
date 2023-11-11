import deploy from "deploy-oss";
import { OptionInterface, PluginRes } from "../lib/type";;

export  function DeployWebpackPlugin(options: OptionInterface): PluginRes | undefined {
    let buildConfig: any = {};
    return {
      name: "upload-oss-to-ducc",
      enforce: "post",
      apply: "build",
      configResolved(config: any) {
        buildConfig = config.build;
      },
      async closeBundle() {
        const outDir = buildConfig.outDir
        deploy(outDir, options)
      },
    };
  }