import * as xmlrpc from "xmlrpc";

const GET_CATEGORIES = "metaWeblog.getCategories";
const EDIT_POST = "metaWeblog.editPost";
const GET_POST = "metaWeblog.getPost";
const GET_RECENT_POSTS = "metaWeblog.getRecentPosts";
const NEW_MEDIA_OBJECT = "metaWeblog.newMediaObject";
const NEW_POST = "metaWeblog.newPost";
const NEW_CATEGORY = "wp.newCategory";
const config = require('../config/config.js').cnblog;

var client = xmlrpc.createSecureClient({
    host: "rpc.cnblogs.com",
    port: 443,
    path: config.path
});

/**
 * 统一通过此方法发起xmlrpc调用
 * 
 * @param {String} method  方法名
 * @param {Array} params  参数数组
 */
let sendRequest = async (method, params) => {
    return new Promise((resolve, reject) => {
        client.methodCall(method, params, (error, value) => {
            if (error) {
                reject(error);
            } else {
                resolve(value);
            }
        })
    })
}

/**
 * 修改一篇博文
 * 
 * @param {String} postId 该博客的id，就是url上的那串数字
 * @param {Object} data 博客内容
 * @param {Boolean} isPublish 是否发布 
 */
export let editPost = async (postId, data, isPublish) => {
    return sendRequest(EDIT_POST, [postId, config.userName, config.password, data, isPublish]);
}

/**
 * 获取分类
 */
export let getCategories = async () => {
    return sendRequest(GET_CATEGORIES, [config.blogId, config.userName, config.password]);
}

/**
 * 获取某篇博文详情
 * @param {String} postId 该博客的提交id
 */
export let getPost = async (postId) => {
    return sendRequest(GET_POST, [postId, config.userName, config.password]);
}

/**
 * 获取最近的num次投递
 * @param {Number} num 获取的数目
 */
export let getRecentPosts = async (num) => {
    return sendRequest(GET_RECENT_POSTS, [config.blogId, config.userName, config.password, num]);
}

/**
 * 上传一个文件
 * @param {Object} file 文件信息
 */
export let newMediaObject = async (file) => {
    return sendRequest(NEW_MEDIA_OBJECT, [config.blogId, config.userName, config.password, file]);
}

/**
 * 投递一篇博客
 * @param {Object} data 
 * @param {Boolean} isPublish 
 */
export let newPost = async (data, isPublish) => {
    return sendRequest(NEW_POST, [config.blogId, config.userName, config.password]);
}

export let newCategory = async (category) => {
    return sendRequest(NEW_CATEGORY, [config.blogId, config.userName, config.password, category]);
}

// (async () => {
//     let res = await exports.getCategories();
//     console.log(res);
// })()