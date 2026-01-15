# Java 18 新特性总结

Java 18 是 Oracle 于 2022 年 3 月 22 日发布的版本，虽然不是长期支持（LTS）版本，但带来了 9 个新功能。Java 18 在平台与性能、安全与密码等方面都有显著的提升。

## 主要新特性

### 1. UTF-8 作为默认字符集（JEP 400）
Java 18 通过 JEP 400 将默认字符集统一为 UTF-8。这意味着所有的 Java API（例如 String、FileReader 和 FileWriter）将默认使用 UTF-8 编码进行读取和写入操作。

```java
// 在 Java 18 之前，字符集依赖于平台
// 现在默认使用 UTF-8，提高了跨平台一致性
String text = "Hello, 世界!";
byte[] bytes = text.getBytes(); // 默认使用 UTF-8 编码
```

### 2. 简易 Web 服务器（JEP 408）
Java 18 引入了一个简单的 Web 服务器，通过命令行工具 jwebserver 可以启动一个只提供静态文件的最小网络服务器，主要用于原型设计、临时编码和测试目的。

```bash
# 启动简易 Web 服务器
jwebserver

# 或指定端口和目录
jwebserver -p 8080 -d /path/to/directory
```

### 3. Switch 模式匹配（第二次预览，JEP 420）
Java 18 继续预览 Switch 模式匹配功能，扩展了 switch 表达式和语句的模式匹配能力。

```java
// 使用模式匹配的 switch 表达式
static String formatterPatternSwitch(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> obj.toString();
    };
}
```

### 4. 代码片段标签 @snippet（JEP 413）
为 JavaDoc 的 Standard Doclet 引入了 @snippet 标签，简化了在 API 文档中嵌入示例源代码的难度。

```java
/**
 * 计算两个整数的和
 * {@snippet :
 * int sum = add(2, 3);
 * System.out.println(sum); // 输出 5
 * }
 */
public static int add(int a, int b) {
    return a + b;
}
```

### 5. 使用方法句柄重新实现核心反射（JEP 416）
使用方法句柄重新实现核心反射，以提高性能和安全性。

## API 增强

### 1. Vector API（第三次孵化，JEP 417）
Java 18 中 Vector API 进入第 3 轮孵化，提供了更高级别的 API 来表达向量计算，这些计算在支持的 CPU 架构上编译为相应的 SIMD 指令。

### 2. 外部函数与内存 API（第二次孵化，JEP 419）
Java 18 中外部函数与内存 API 进入第 2 轮孵化，提供了更安全和高效的方式来与 Java 之外的代码和数据进行互操作。

### 3. 互联网地址解析 SPI（JEP 418）
引入了互联网地址解析的服务提供商接口（SPI），允许应用程序使用不同的解析协议。

## JVM 相关改进

### 1. 弃用终结器（JEP 421）
Java 18 通过 JEP 421 正式将终结器（finalization）标记为废弃，因为终结器存在很多已知的问题，通常不推荐使用。

### 2. 安全与密码改进
Java 18 在安全方面也做了一些更新，例如禁用了 TLS 1.0 和 1.1 协议默认支持、更严格的默认信任库等。

## 语言和语法改进

### 1. 模式匹配增强
Java 18 在已有模式匹配基础上进行了增强，使代码更加简洁和易读。

### 2. 密封类支持
继续支持密封类（Sealed Classes），允许类或接口的继承和实现被限制到特定的类或接口。

## 平台支持改进

### 1. 默认字符集统一
通过将 UTF-8 作为默认字符集，消除了长期以来跨平台编码不一致的问题，让 Java 更贴合互联网时代的数据交换标准。

### 2. 简易 Web 服务器
内置的简易 Web 服务器体现了 Java 对开发者体验的重视，即使是小工具也能发挥作用。

## 预览和孵化功能

### 1. Switch 模式匹配（第二次预览）
- 扩展了 switch 表达式和语句的模式匹配功能
- 提供了更强大的数据查询能力

### 2. Vector API（第三次孵化）
- 提供了向量计算的高级 API
- 利用 SIMD 指令提高性能

### 3. 外部函数与内存 API（第二次孵化）
- 提供与本地代码和数据的互操作
- 更安全和高效的替代 JNI

## 总结

Java 18 虽然不是长期支持版本，但其新特性对开发者有重要意义。其中最大的变化对普通开发者来说莫过于默认编码 UTF-8 和内置简易 Web 服务器。

UTF-8 默认消除了长期以来跨平台编码不一致的问题，让 Java 更贴合互联网时代的数据交换标准。jwebserver 则体现出 Java 对开发者体验的重视，即使是一个很小的工具，也能发挥作用。

在底层性能上，Java 18 继续推进 Panama 和 Vector 等项目，使 Java 在系统编程和高性能计算上更具竞争力。作为非 LTS 版本，Java 18 提供了一个让社区试水新功能的平台，其反馈将作用于后续的 Java 版本中。