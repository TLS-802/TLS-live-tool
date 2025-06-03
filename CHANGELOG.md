# Changelog

## v1.5.6

[compare changes](https://github.com/TLS-802/TLS-live-tool/compare/1.5.5...v1.5.6)

### 🚀 Features
- 新增 WebSocketService 类以支持 WebSocket 服务。
- 重构自动回复管理器，支持通过 WebSocket 发送评论信息。
- 移除 autoReplyPlus 相关代码，简化自动回复逻辑。
- 更新 IPC 通道以适应新的自动回复配置。
- 添加配置选项以启用或禁用 WebSocket 服务及其端口设置。


## v1.5.5

[compare changes](https://github.com/TLS-802/TLS-live-tool/compare/1.5.4...v1.5.5)

### 🚀 Features
- 自动回复: 添加了过滤器，可以设置满足过滤器条件时的回复信息
### 🐞 Bug Fixes
- 自动回复: 修复了自动回复的设置在不同账号间切换导致的异常问题
