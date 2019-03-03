import gitService from "../service/gitService";
import * as crypto from "crypto";
import config from "../config";
import * as Koa from "koa";

const router = {};
const HEADER_NAME = "X-Hub-Signature";

router["POST /git/push/blog"] = function(ctx: Koa.Context) {
  let res = crypto.createHmac("sha1", config.token).update(JSON.stringify(ctx.request.body))
    .digest("hex");
  console.log(`加密后数据为：${res}`);
  let receive:String = ctx.headers[HEADER_NAME.toLocaleLowerCase()];
  console.log(`收到密钥为：${receive}`);
  if(receive.endsWith(res)){
    gitService.count++;
  }
  ctx.onSuccess();
};

export default router;
