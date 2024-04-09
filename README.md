## AUTO DEPLOY CLI

对自有服务器自动化构建并打包发布。

## 重要提示(important)

如果不是在win平台使用，请直接跳过这段内容！

在 `0.0.4` 中，新增了对win平台打包成功后的弹窗提醒。由于涉及平台库的使用，引入了 `ffi-napi` 包。此包使用的 `node-gyp` 对node的版本有所要求（^16.14.0 || >=18.0.0）因此使用此版本需要使用对应版本的node来升级。

此外，工具编译过程需要使用python，建议安装3.6.8版本的。对于win编译环境的要求，请先安装：

```js
npm install --global --production windows-build-tools
```

注意：新版本仅仅是应网友需求增加的弹窗提示，但这会增加对包安装的难度，如果不需要弹窗就还是继续用 `0.0.3` 版本！

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

注意：在填写您的 `distPath` 的时候，只需告诉 cli 您项目打包后的目录名即可，一般打包后的目录都在项目的根目录。cli 当前只以项目根目录路径来获取目标目录，如您打包后的目录在项目根目录的某个子目录内，则需要您表明路径关系。
