import * as path from 'path';

//后台所在绝对路径
const rootPath = path.resolve(__dirname, '..');

let config = {
  //markdown 笔记仓库地址,请勿添加除博文外的markdown文件，比如README.md
  gitRep: process.env.GIT_REP || 'https://github.com/FleyX/technology-note.git',
  // hexo中_post的路径
  postPath: path.resolve(rootPath, '../hexo/source/_posts'),
  // git webhock密码
  token: process.env.TOKEN || '',
  // 定时更新整点数（整点定时从github拉取数据，并生成html）
  updateHour: process.env.UPDATE_HOUR || 0,
  rootPath,
  port: process.env.PORT || 8080,
  urlPrefix: '/api',
  bodyLimit: {
    formLimit: '2mb',
    urlencoded: true,
    multipart: true,
    formidable: {
      uploadDir: path.join(rootPath, 'files', 'temp', 'uploads'),
      keepExtenstions: true,
      maxFieldsSize: 1024 * 1024
    }
  }
};

export default config;
