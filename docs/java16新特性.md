# Java 16 新特性总结

Java 16 是 Oracle 于 2021 年 3 月 16 日发布的版本，虽然不是长期支持（LTS）版本，但作为下一个 LTS 版本 Java 17 的先行版本，带来了 17 个新特性，其中许多重要特性最终成为了正式标准。

## 主要新特性

### 1. Record 类（正式特性）
Java 16 将记录类从预览转为正式特性。Records 允许我们以一种简洁的方式定义一个类，我们只需要指定其数据内容。对于每个 Record 类，Java 都会自动地为其成员变量生成 equals, hashCode, toString 方法，以及所有字段的访问器方法（getter）。

```java
// 使用 Records 定义数据载体类
public record Person(String name, int age) {
    // 编译器自动生成构造器、访问器、equals、hashCode 和 toString 方法
}

// 使用示例
Person person = new Person("John", 30);
System.out.println(person.name()); // 获取 name
System.out.println(person.age());  // 获取 age
```

### 2. instanceof 模式匹配（正式特性）
instanceof 模式匹配在 Java 16 中正式发布，简化了类型检查和转换的过程。

```java
// 使用模式匹配简化类型检查
if (obj instanceof String str) {
    System.out.println(str.toUpperCase()); // 自动转换为 String 类型
}
```

### 3. 密封类（第二次预览）
密封类在 Java 16 中继续作为预览特性，允许开发者对继承进行更精细的控制。

```java
// 使用 sealed 关键字限制继承
public sealed class Shape
    permits Circle, Square, Rectangle {
    // ...
}

final class Circle extends Shape {
    // ...
}

final class Square extends Shape {
    // ...
}

non-sealed class Rectangle extends Shape {
    // ...
}
```

### 4. jpackage 工具（正式特性）
jpackage 工具在 Java 16 中正式发布，不再是孵化器功能，允许将 Java 应用程序打包成原生安装包。

### 5. Unix 域套接字通道
SocketChannel 和 ServerSocketChannel 现在支持 Unix 域套接字，提供更高效的进程间通信。

## JVM 相关改进

### 1. ZGC：并发线程栈处理
ZGC 通过将其线程堆栈处理从安全点移至并发阶段得到改进，减少了垃圾收集的停顿时间。

### 2. 弹性元空间（Elastic Metaspace）
通过将未使用的 HotSpot 类元数据或元空间内存快速返回给操作系统来改进元空间内存管理，减少元空间占用空间。

### 3. 启用 C++14 语言特性
C++ 14 功能可以在带有 JDK 16 的 C++ 源代码中使用，提高了 JDK 内部开发的灵活性。

## API 增强

### 1. Vector API（孵化器）
引入了新的矢量 API，允许开发人员明确执行矢量操作，为在 Java 中进行高性能并行计算提供了基础。

### 2. Foreign Linker API（孵化器）
Java 代码可以由 C/C++ 调用，反之亦然，使用新的 API 替换 JNI，简化了与本地代码的交互。

### 3. 基于值的类的警告
如果使用 synchronize 同步基于值的类，则会引发警告，这是为了推动使用更适合的同步机制。

## 平台支持改进

### 1. Alpine Linux 端口
现在 JDK 可用于 Alpine Linux 和其他使用 musl 实现的 Linux 发行版。

### 2. Windows/AArch64 端口
现在 JDK 可以在 AArch64、ARM 硬件服务器或基于 ARM 的笔记本电脑上运行。

## 开发工具和环境改进

### 1. 从 Mercurial 迁移到 Git/GitHub
OpenJDK 源代码从 Mercurial 转移到 Git/GitHub，使开发流程更加现代化。

### 2. 强封装 JDK 内部 API
Java 16 开启了对内部 API 强封装的最后一步，默认情况下禁止访问内部 API。

## 预览和孵化器功能

### 1. 密封类（第二次预览）
- 作为预览特性继续提供
- 提供更精确的类继承控制
- 增强类的封装性和安全性

### 2. Vector API（孵化器）
- 提供矢量操作的能力
- 为高性能并行计算奠定基础

### 3. Foreign Linker API（孵化器）
- 提供与本地代码交互的新方式
- 简化了与 C/C++ 代码的集成

## 总结

Java 16 是一个重要的过渡版本，完成了若干预览特性的正式化（如 Records 和 instanceof 模式匹配），并推进了 JDK 内部重构。其中最显著的变化是 Record 类正式发布，这极大地简化了数据载体类的创建；instanceof 模式匹配也成为正式特性，使类型检查和转换更加简洁。

Java 16 还在性能和 JVM 改进方面做了很多工作，包括 ZGC 的改进、弹性元空间的引入等。同时，平台支持的扩展（如 Alpine Linux 和 Windows/AArch64）也表明了 Java 生态的持续扩展。

这些新特性的引入，标志着 Java 语言正在向更现代化、更简洁和更安全的方向发展，为即将到来的 Java 17 LTS 版本奠定了坚实的基础。