
import deploy from "deploy-oss";
import { OptionInterface } from "../lib/type";;


export class DeployWebpackPlugin {
    private options: OptionInterface
    constructor(config: OptionInterface) {
        this.options = config;
    }
    apply(compiler: any) {
        const path = compiler.options.output.path || "";
        const afterEmit = (compilation, callback) => {
            deploy(path, this.options)
        };

        if (compiler.hooks) {
            compiler.hooks.afterEmit.tapAsync("UploadOssToDuccPlugin", afterEmit);
        } else {
            compiler.plugin("UploadOssToDuccPlugin", afterEmit);
        }
    }
}
