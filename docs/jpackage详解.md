# jpackage 详解

jpackage 是 Java 16 中正式发布的工具，用于将 Java 应用程序打包成原生安装包。它最初作为孵化器功能引入，在 Java 16 中成为标准特性。

## 概述

jpackage 是一个命令行工具，它可以将 Java 应用程序及其依赖项（包括 JRE）打包成原生的安装包或应用程序包。这使得 Java 应用程序可以像原生应用程序一样安装和运行，无需用户单独安装 JRE。

## 主要功能

### 1. 创建原生安装包
- 为不同操作系统创建适当的安装包格式
- Windows: MSI 或 EXE
- macOS: PKG 或 DMG
- Linux: RPM 或 DEB

### 2. 打包 JRE
- 自动包含最小化的 JRE，无需用户预先安装
- 减少应用程序的依赖复杂性

### 3. 创建可执行文件
- 生成原生可执行文件
- 提供更自然的用户体验

## 使用示例

### 基本用法
```bash
# 创建简单的应用程序包
jpackage --input input_directory --name MyApp --app-version 1.0 --module com.example.mymodule/com.example.MainClass
```

### 详细参数示例
```bash
# 完整的打包命令示例
jpackage \
    --input dist \                    # 包含 JAR 文件的输入目录
    --name MyApplication \            # 应用程序名称
    --app-version 1.0.0 \            # 应用程序版本
    --icon icon.png \                 # 应用程序图标
    --main-class com.example.Main \   # 主类
    --main-jar myapp.jar \            # 主 JAR 文件
    --java-options "-Xmx2g" \         # JVM 选项
    --description "My Application" \   # 应用程序描述
    --vendor "My Company"             # 供应商名称
```

### 平台特定选项

#### Windows 选项
```bash
# Windows 特定选项
jpackage \
    --input dist \
    --name MyApp \
    --win-console                # 显示控制台窗口
    --win-dir-chooser           # 显示目录选择对话框
    --win-menu                  # 创建开始菜单项
    --win-menu-group "My Apps"  # 菜单组名称
    --win-per-user-install      # 每用户安装
    --win-shortcut              # 创建桌面快捷方式
```

#### macOS 选项
```bash
# macOS 特定选项
jpackage \
    --input dist \
    --name MyApp \
    --mac-package-name "My App"          # 包名称
    --mac-package-identifier com.mycompany.myapp  # 包标识符
    --mac-signing-key-user-name "Developer ID Application: Name"  # 签名密钥
    --mac-app-store-compliant            # 符合 App Store 规范
```

#### Linux 选项
```bash
# Linux 特定选项
jpackage \
    --input dist \
    --name MyApp \
    --linux-app-category Game      # 应用程序类别
    --linux-deb-maintainer "maintainer@example.com"  # DEB 维护者
    --linux-menu-group "Games"     # 菜单组
    --linux-shortcut               # 创建快捷方式
```

## 支持的输出格式

### Windows
- `.exe` - 可执行安装程序
- `.msi` - Windows Installer 包

### macOS
- `.pkg` - Apple Installer 包
- `.dmg` - 磁盘镜像

### Linux
- `.deb` - Debian 包
- `.rpm` - Red Hat 包

## 优势

### 1. 用户体验
- 无需预先安装 JRE
- 原生安装体验
- 简化应用程序分发

### 2. 开发者友好
- 简化的部署流程
- 减少兼容性问题
- 自动处理依赖关系

### 3. 安全性
- 包含固定版本的 JRE
- 避免系统 JRE 变化的影响

## 限制和注意事项

### 1. 平台依赖
- 需要在目标平台上构建
- 无法跨平台构建安装包

### 2. 大小考虑
- 包含 JRE 可能增加包大小
- 需要权衡功能和大小

### 3. 签名要求
- macOS 和 Windows 可能需要代码签名
- 对于分发到应用商店尤其重要

## 与其他工具的关系

### 与 JavaFX Packager 的关系
- jpackage 替代了 JavaFX Packager
- 提供更广泛的功能和平台支持

### 与 JLink 的关系
- jpackage 可以与 jlink 结合使用
- jlink 用于创建自定义运行时镜像
- jpackage 用于创建原生安装包

## 最佳实践

### 1. 应用程序准备
- 确保应用程序具有清晰的主类
- 测试在不同环境下的运行

### 2. 图标和资源
- 提供适当大小的应用程序图标
- 确保资源文件路径正确

### 3. 版本管理
- 使用有意义的版本号
- 考虑自动更新机制

## 未来发展方向

jpackage 的引入标志着 Java 应用程序分发的重大进步，它解决了长期以来 Java 应用程序部署复杂的问题。随着 Java 平台的发展，jpackage 也在不断完善，未来可能会支持更多平台特性和更灵活的配置选项。

## 总结

jpackage 是 Java 16 中一个重要的新功能，它简化了 Java 应用程序的部署和分发过程。通过将应用程序及其运行时环境打包成原生格式，jpackage 提供了更好的用户体验和更简单的分发机制。对于希望提供专业级 Java 应用程序的开发者来说，jpackage 是一个不可或缺的工具。