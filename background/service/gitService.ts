import config from '../config';
import * as path from 'path';
import * as fs from 'fs-extra';

import ProcessHelper from '../util/ProcesHelper';
import { toUnicode } from 'punycode';

/**
 * 仓库名
 */
const repName = config.gitRep
  .substr(config.gitRep.lastIndexOf('/') + 1)
  .replace('.git', '');
const hexoPath = path.join(config.rootPath, '../hexo');
const initCommand = `cd ${config.postPath} &&git clone ${config.gitRep}`;
const updateGitCommand = `cd ${path.join(config.postPath, repName)}&&git pull`;
const generateCommand = `cd  ${hexoPath}&& hexo g`;
const deleteOldCommand = `cd ${hexoPath} && rm -rf public/*`;

/**
 * 是否首次运行
 */
let isFirst: boolean = true;
class gitService {
  static count: number = 1;

  static isRun: boolean = false;

  /**
   * 文章有更新
   */
  static async updateGitBlog() {
    if (gitService.isRun == true) {
      return;
    }
    gitService.isRun = true;
    try {
      fs.ensureDir(path.resolve(config.rootPath, '../hexo/source/_posts'));
      //检查git仓库是否拉下来了
      let fileList = await fs.readdir(config.postPath);
      if (fileList.indexOf(repName) === -1) {
        //说明不存在该文件夹
        let res = await ProcessHelper.exec(initCommand);
        console.log(res);
      }
      //判断是否有新的修改
      let res = await ProcessHelper.exec(updateGitCommand);
      if (res['stdout'].startsWith('Already up') && !isFirst) {
        //无更新数据且不为第一次时不刷新
        return;
      }
      //删除旧的构建
      await ProcessHelper.exec(deleteOldCommand);
      //构建新的数据
      await ProcessHelper.exec(generateCommand);
    } catch (error) {
      console.error(error);
    } finally {
      gitService.count--;
      gitService.isRun = false;
      console.info('本次处理完毕，时间:' + new Date().toLocaleString());
    }
  }
}

// 定时判断是否需要进行更新操作
//记录上次处理的日期，确保每天只处理一次
let lastDealData = '';
setInterval(() => {
  //判断是否到了定义的整点
  let today = new Date().toLocaleDateString();
  if (lastDealData != today && new Date().getHours() == config.updateHour) {
    lastDealData = today;
    gitService.count++;
  }
  if (gitService.count > 0) {
    console.log(`当前count:${gitService.count},需要进行处理`);
    gitService.updateGitBlog();
  }
}, 10000);

export default gitService;
