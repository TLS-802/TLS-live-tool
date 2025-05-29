# GitHub Actions 工作流修复说明

## 修复的问题

### 1. Release 工作流失败的根本原因
- **原问题**: `release.yml` 工作流依赖 `workflow_run` 触发器，但存在以下问题：
  - Artifact 名称不匹配：`build.yml` 上传 `release-artifact-{os}`，但 `release.yml` 下载 `release-tls-{os}`
  - `workflow_run` 触发器在跨工作流传递 artifacts 时存在权限和可靠性问题
  - 缺少适当的错误处理

### 2. 修复方案

#### A. 重构 Release 工作流
- **触发方式**: 改为基于 Git tag 触发 (`push: tags: v*`)
- **架构**: 采用单一工作流包含 build 和 release 两个 job
- **优势**: 
  - 消除跨工作流 artifact 传递问题
  - 更可靠的触发机制
  - 更好的错误处理和调试

#### B. 统一 Artifact 命名
- **Build 工作流**: 使用 `build-{os}` 命名
- **Release 工作流**: 使用 `release-{os}` 命名
- **路径**: 统一使用 `release/**/*` 包含所有构建产物

#### C. 改进 Changelog 提取
- 增加错误处理，防止脚本失败导致工作流中断
- 改进正则表达式，更准确匹配版本号
- 添加回退机制，确保即使 changelog 解析失败也能创建 release

## 修改的文件

### 1. `.github/workflows/release.yml`
```yaml
# 主要变更:
- 触发器: workflow_run → push.tags
- 架构: 分离的 build 和 release jobs
- Artifact 处理: 统一命名和路径
- 错误处理: 增加 fail_on_unmatched_files: false
```

### 2. `.github/workflows/build.yml`
```yaml
# 主要变更:
- Artifact 名称: release-tls-{os} → build-{os}
- 路径: 具体文件模式 → release/**/*
- 保留期: 增加 retention-days: 7
```

### 3. `scripts/extract-changelog.js`
```javascript
// 主要变更:
- 增加 try-catch 错误处理
- 改进版本号正则表达式
- 添加回退机制
- 防止脚本失败中断工作流
```

## 使用方法

### 创建 Release
1. 确保 `package.json` 中的版本号已更新
2. 确保 `CHANGELOG.md` 包含对应版本的更新日志
3. 创建并推送 Git tag:
   ```bash
   git tag v1.5.6
   git push origin v1.5.6
   ```
4. GitHub Actions 将自动：
   - 构建 Windows 和 macOS 版本
   - 提取 changelog
   - 创建 GitHub Release
   - 上传构建产物

### 验证构建
- 推送到 `main` 分支将触发 `build.yml` 工作流
- 用于验证代码更改不会破坏构建过程

## 技术细节

### Artifact 结构
```
release/
├── 1.5.5/                    # 版本目录
│   ├── TLS-live-tool_1.5.5.exe
│   ├── TLS-live-tool_1.5.5.dmg
│   ├── latest.yml
│   └── latest-mac.yml
```

### 工作流依赖
- Node.js LTS
- pnpm 10
- actions/checkout@v4
- actions/setup-node@v4
- pnpm/action-setup@v4
- actions/upload-artifact@v4
- actions/download-artifact@v4
- softprops/action-gh-release@v2

### 错误处理
- YAML 语法验证通过 yamllint
- Changelog 提取失败不会中断工作流
- 文件匹配失败不会中断 release 创建
- Artifact 下载失败会导致工作流失败（预期行为）

## 测试建议

1. **本地测试**:
   ```bash
   # 验证 changelog 提取
   node scripts/extract-changelog.js
   
   # 验证构建过程
   pnpm install
   pnpm build
   ```

2. **工作流测试**:
   - 创建测试分支推送到 main 验证 build 工作流
   - 创建测试 tag 验证 release 工作流

3. **YAML 验证**:
   ```bash
   yamllint .github/workflows/*.yml
   ```