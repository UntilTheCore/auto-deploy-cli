const ffi = require('ffi-napi');
const path = require('path');
// 加载Windows API动态链接库 user32.dll
const user32 = ffi.Library('user32.dll', {
  MessageBoxA: ['int', ['int', 'string', 'string', 'int']], // [返回值类型, [arg1, arg2, arg3, arg4]]
});

function successMsgBox() {
// 创建消息框的参数
  const messageBoxParams = Buffer.alloc(1024); // 用于存储消息框的文本
  messageBoxParams.write('deploy success!', 0); // 将文本写入缓冲区

// 调用 MessageBox 函数并显示消息框
  user32.MessageBoxA(0, messageBoxParams, "tips", 0);
}

function failMsgBox() {
// 创建消息框的参数
  const messageBoxParams = Buffer.alloc(1024); // 用于存储消息框的文本
  messageBoxParams.write('deploy fail, retry!', 0); // 将文本写入缓冲区

// 调用 MessageBox 函数并显示消息框
  user32.MessageBoxA(0, messageBoxParams, "tips", 0);
}

exports.default = {
  successMsgBox,
  failMsgBox,
}
