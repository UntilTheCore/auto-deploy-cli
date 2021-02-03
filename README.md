## AUTO DEPLOY

对自有服务器自动化构建并打包发布。

1. 安装脚手架(建议全局安装)

```bash
npm i -g auto-deploy-cli
```

2. 在您的项目根目录下执行

```bash
deploy init
```

3. 配置您的项目部署配置文件

```javascript
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
}
```

您可以在执行`init` 命令后在`deploy/deploy.config.js`下查看完整的配置说明。

4. 完成配置后

```bash
deploy -h
```

查看您配置的构建命令

5. 执行

```bash
deploy prod
```

如果您修改了配置文件，即环境属性名，那么您需在使用您自己定义的名称。