# Changelog


## v1.5.9

[compare changes](https://github.com/qiutongxue/oba-live-tool/compare/v1.5.8...v1.5.9)

### 🐞 Bug Fixes

- 修复登录控制台成功以后页面状态更新问题, fix #154 ([#154](https://github.com/qiutongxue/oba-live-tool/issues/154))

## v1.5.8

[compare changes](https://github.com/qiutongxue/oba-live-tool/compare/v1.5.7...v1.5.8)

### 🚀 Features

- 新增对淘宝直播平台的支持 ([30a7623](https://github.com/qiutongxue/oba-live-tool/commit/30a7623))
- **ui:** 添加连接到淘宝中控台时的提示 ([9ad7645](https://github.com/qiutongxue/oba-live-tool/commit/9ad7645))
- **中控台:** 连接中控台失败时自动关闭浏览器 ([996181f](https://github.com/qiutongxue/oba-live-tool/commit/996181f))

### 🐞 Bug Fixes

- **中控台:** 修复未直播状态下登录淘宝平台后错误提示异常问题 ([8f89ed2](https://github.com/qiutongxue/oba-live-tool/commit/8f89ed2))
- **中控台:** 优化登录逻辑，只要登录成功就保存登录状态 ([f888042](https://github.com/qiutongxue/oba-live-tool/commit/f888042))
- 修复账号管理的部分问题 ([887fa19](https://github.com/qiutongxue/oba-live-tool/commit/887fa19))
- 优化删除账号的逻辑 ([991a77f](https://github.com/qiutongxue/oba-live-tool/commit/991a77f))
- **ui:** 修复在中控台连接中切换到其它页面后连接状态失效的问题 ([75a254e](https://github.com/qiutongxue/oba-live-tool/commit/75a254e))
- 修复中控台连接失败后自动断开连接有延时的问题 ([01813fc](https://github.com/qiutongxue/oba-live-tool/commit/01813fc))

## v1.5.7

### 🚀 Features

- **ui:** API Key 输入栏添加隐藏/显示功能

### 🐞 Bug Fixes

- **ui:** 修复火山引擎配置中可能会造成歧义的信息
- **ai:** 修复 API Key 测试连接的部分问题
- **中控台:** 修复视频号无法登录的问题


## v1.5.6

### 🚀 Features

- **自动回复:** 添加 WebSocket 服务支持

### 🐞 Bug Fixes

- **自动发言:** 修复小红书平台无法正常发送评论的问题
- **中控台:** 增加小红书连接中控台的容错
- **中控台:** 优化连接中控台时的提示内容


## v1.5.5

### 🚀 Features
- 自动回复: 添加了过滤器，可以设置满足过滤器条件时的回复信息
### 🐞 Bug Fixes
- 自动回复: 修复了自动回复的设置在不同账号间切换导致的异常问题


## v1.5.4

### 🚀 Features

- 新增快手小店登录
- 新增快手小店的自动弹窗和自动发言
- **自动回复:** 添加新设置-当订单已支付时才自动回复
- **更新器:** 显示新版本的更新内容

### 🐞 Bug Fixes

- 修复部分错误无法被正确捕捉的问题
- **自动发言:** 降低随机空格中空格出现的概率，随机发送时不和上一条重复
