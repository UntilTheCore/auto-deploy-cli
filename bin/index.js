#!/usr/bin/env node

const path = require( 'path' )
const fs = require( 'fs' )
// 控制台交互插件
const inquirer = require( 'inquirer' )
// 获取package.json 配置文件
const packageJson = require( '../package.json' )
// process.cwd() 方法会返回 Node.js 进程的当前工作目录
const deployPath = path.join( process.cwd(), './deploy' )
// 部署的配置文件
const deployConfigPath = `${deployPath}/deploy.config.js`
const { checkNodeVersion, checkDeployConfig, underlineLog } = require( '../lib/schema' )

const version = packageJson.version
const requiredNodeVersion = packageJson.engines.node

const versionOptions = [ '-V', '--version' ]

checkNodeVersion( requiredNodeVersion, 'auto-deploy' )

const program = require( 'commander' )

program
.version( version )
.command( 'init' )
.description( '初始化部署相关配置' )
.action( () => {
  require( '../lib/init' )()
} )

const agrs = process.argv.slice( 2 )

const firstArg = agrs[0]

// 非version选项且有配置文件时，进入部署流程
if ( !versionOptions.includes( firstArg ) && fs.existsSync( deployConfigPath ) ) {
  deploy()
}

// 无参数时默认输出help信息
if ( !firstArg ) {
  program.outputHelp()
}

// 部署流程
function deploy() {
  // 检测部署配置是否合理
  const deployConfigs = checkDeployConfig( deployConfigPath )
  if ( !deployConfigs ) {
    process.exit( 1 )
  }

  // 注册部署命令
  deployConfigs.forEach( config => {
    const { command, projectName, name } = config
    program
    .command( `${command}` )
    .description( `${underlineLog( projectName )}项目${underlineLog( name )}部署` )
    .action( () => {
      inquirer.prompt( [
        {
          type: 'confirm',
          message: `${underlineLog( projectName )}项目是否部署到${underlineLog( name )}？`,
          name: 'sure'
        }
      ] ).then( answers => {
        const { sure } = answers
        if ( !sure ) {
          process.exit( 1 )
        }
        if ( sure ) {
          const deploy = require( '../lib/engine' )
          deploy( config )
        }
      } )

    } )
  } )
}

// 解析参数
program.parse( process.argv )