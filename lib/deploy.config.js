module.exports = {
  projectName: '',            // 项目名称
  dev: {                      // 测试环境
    name: '测试环境',
    script: 'npm run build',  // 测试环境打包脚本
    host: '',                 // 测试服务器地址
    port: 22,                 // ssh port，一般默认22
    username: '',             // 登录服务器用户名
    password: '',             // 登录服务器密码
    distPath: '',             // 本地打包dist目录
    webDir: ''                // 测试环境服务器地址
  },
  prod: {                     // 线上环境
    name: '线上环境',
    script: 'npm run build',  // 线上环境打包脚本,如果要用yarn可以换成yarn
    host: '',                 // 线上服务器地址
    port: 22,                 // ssh port，一般默认22
    username: '',             // 登录服务器用户名
    password: '',             // 登录服务器密码
    distPath: '',             // 本地打包dist目录
    webDir: ''                // 线上环境web目录
  }
  // 根据需要进行配置，如只需部署prod线上环境，请删除dev测试环境配置，反之亦然，支持多环境部署
  // 还有更多的环境参照以上格式
}
