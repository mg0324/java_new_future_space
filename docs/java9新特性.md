# Java 9 新 特性

## 概述
Java 9 是 Java 平台的一个重要里程碑版本，于 2017 年 9 月发布。这个版本引入了许多革命性的新特性，为 Java 生态系统的现代化奠定了基础。

## 主要新特性

### 1. 模块系统 (Project Jigsaw)
Java 9 引入了全新的模块系统，这是 Java 平台历史上最重要的变化之一。

#### 特点：
- **模块化 JDK**：将 JDK 按功能模块化组织
- **模块描述文件**：使用 `module-info.java` 定义模块
- **强封装性**：可以精确控制哪些包对外可见
- **依赖管理**：显式声明模块间的依赖关系

#### 示例代码：
```java
// module-info.java
module com.example.app {
    requires java.base;
    requires java.sql;
    exports com.example.app.api;
}
```

### 2. JShell (REPL 工具)
JShell 是 Java 9 引入的交互式编程工具，允许开发者快速测试代码片段。

#### 特点：
- **即时执行**：无需创建完整的类和方法
- **代码补全**：支持 Tab 键自动补全
- **即时反馈**：立即看到代码执行结果
- **学习友好**：非常适合学习和演示 Java 语法

#### 使用示例：
```bash
jshell> int add(int a, int b) { return a + b; }
 created method add(int,int)

jshell> add(5, 3)
$3 ==> 8
```

### 3. 集合工厂方法
Java 9 为集合创建提供了简洁的工厂方法。

#### 不可变集合创建：
```java
// Java 9 之前
List<String> list = Collections.unmodifiableList(Arrays.asList("a", "b", "c"));

// Java 9 之后
List<String> list = List.of("a", "b", "c");
Set<String> set = Set.of("a", "b", "c");
Map<String, Integer> map = Map.of("a", 1, "b", 2);
```

#### 特点：
- **简洁语法**：一行代码创建不可变集合
- **空值限制**：不允许包含 null 元素
- **线程安全**：创建的集合天然不可变
- **性能优化**：针对小集合做了特殊优化

### 4. 接口私有方法
Java 9 允许在接口中定义私有方法。

#### 用途：
- **代码复用**：在接口内部共享通用逻辑
- **封装实现细节**：隐藏辅助方法
- **保持接口简洁**：避免公开内部实现方法

#### 示例：
```java
public interface MyInterface {
    void publicMethod();
    
    default void defaultMethod() {
        helperMethod();
        // 其他逻辑
    }
    
    private void helperMethod() {
        // 私有方法，只能在接口内部使用
        System.out.println("Helper logic");
    }
}
```

### 5. HTTP/2 客户端 API (孵化)
Java 9 引入了现代化的 HTTP 客户端 API，支持 HTTP/2 和 WebSocket。

#### 特点：
- **HTTP/2 支持**：支持多路复用和头部压缩
- **异步编程**：基于 CompletableFuture 的异步 API
- **WebSocket 支持**：原生支持 WebSocket 协议
- **流式 API**：流畅的构建器模式

#### 示例：
```java
HttpClient client = HttpClient.newBuilder()
    .version(HttpClient.Version.HTTP_2)
    .build();

HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com"))
    .GET()
    .build();

HttpResponse<String> response = client.send(request,
    HttpResponse.BodyHandlers.ofString());
```

### 6. 改进的 Stream API
Java 9 增强了 Stream API，增加了新的中间操作和终止操作。

#### 新增方法：
```java
// takeWhile - 获取满足条件的元素
List.of(1, 2, 3, 4, 5, 4, 3, 2, 1)
    .stream()
    .takeWhile(n -> n < 4)
    .collect(Collectors.toList()); // [1, 2, 3]

// dropWhile - 跳过满足条件的元素
List.of(1, 2, 3, 4, 5, 4, 3, 2, 1)
    .stream()
    .dropWhile(n -> n < 4)
    .collect(Collectors.toList()); // [4, 5, 4, 3, 2, 1]

// ofNullable - 处理可能为 null 的元素
Stream.ofNullable(null).count(); // 0
Stream.ofNullable("hello").count(); // 1

// iterate - 带终止条件的迭代
Stream.iterate(1, n -> n * 2, n -> n <= 64)
    .forEach(System.out::println);
```

### 7. 响应式流 (Reactive Streams)
Java 9 引入了响应式流 API，为异步流处理提供标准接口。

#### 核心接口：
- `Flow.Publisher` - 数据发布者
- `Flow.Subscriber` - 数据订阅者
- `Flow.Subscription` - 订阅管理
- `Flow.Processor` - 数据处理器

### 8. 改进的 Process API
改进了进程 API，更好地支持操作系统进程管理。

#### 增强功能：
- **进程句柄**：`ProcessHandle` 接口提供更丰富的进程信息
- **进程信息**：获取进程 PID、命令行、启动时间等
- **进程管理**：创建子进程、等待进程结束、销毁进程

#### 示例：
```java
ProcessHandle.current()
    .info()
    .commandLine()
    .ifPresent(System.out::println);
```

### 9. 多版本兼容 JAR
允许 JAR 文件包含针对不同 Java 版本的类文件。

#### 结构：
```
mylib.jar
├── META-INF/
│   └── versions/
│       ├── 9/
│       │   └── com/example/MyClass.class
│       └── 10/
│           └── com/example/MyClass.class
├── com/example/
│   └── MyClass.class (默认版本)
└── META-INF/MANIFEST.MF
```

### 10. 改进的 try-with-resources
Java 9 改进了 try-with-resources 语句，支持使用已声明的资源。

#### 对比：
```java
// Java 8
try (BufferedReader br = new BufferedReader(new FileReader("file.txt"))) {
    // 使用 br
}

// Java 9
BufferedReader br = new BufferedReader(new FileReader("file.txt"));
try (br) {
    // 使用 br
}
```

### 11. 钻石操作符改进
钻石操作符在匿名内部类中可以更好地推断类型。

```java
// Java 9
List<String> list = new ArrayList<>() { // 可以省略泛型参数
    {
        add("hello");
    }
};
```

### 12. 改进的警告信息
Java 9 改进了编译器警告信息，提供更清晰的错误提示。

- **弃用警告**：更详细的弃用信息
- **模块系统警告**：模块相关的警告信息
- **原始类型警告**：更精确的原始类型使用警告

## 性能改进

### 1. GC 改进
- **G1 收集器**：成为默认垃圾收集器
- **并行 Full GC**：改进 G1 的 Full GC 性能
- **堆分配**：更好的大内存分配性能

### 2. 编译器优化
- **JIT 编译器**：改进的方法内联
- **字符串优化**：更好的字符串处理性能

## 安全性改进

### 1. 加密增强
- **更强的加密算法**：支持更多现代加密标准
- **密钥管理**：改进的密钥管理系统

### 2. TLS 1.3 支持
为未来的 TLS 1.3 标准做准备。

## 开发工具改进

### 1. 编译器改进
- **诊断信息**：更丰富的错误和警告信息
- **性能改进**：更快的编译速度

### 2. 调试工具
- **jcmd**：增强的诊断命令工具
- **jmap**：改进的内存映射工具
- **jstat**：增强的统计信息工具

## 向后兼容性

### 1. 保持兼容
Java 9 保持了与 Java 8 的高度向后兼容性，大部分现有代码无需修改即可运行。

### 2. 弃用的功能
- **Applet API**：标记为弃用（后续版本移除）
- **Java EE 和 CORBA 模块**：从 JDK 中移除

## 升级建议

### 1. 模块化迁移
- 评估现有项目的模块化需求
- 逐步引入模块系统
- 优先模块化核心组件

### 2. API 迁移
- 使用新的集合工厂方法
- 替换过时的 API 调用
- 采用新的 HTTP 客户端

### 3. 开发实践
- 学习和使用 JShell
- 采用新的 Stream API 特性
- 使用接口私有方法优化代码结构

## 总结

Java 9 是一个具有里程碑意义的版本，它不仅引入了许多实用的新特性，更重要的是通过模块系统为 Java 平台的未来发展奠定了基础。虽然模块系统的学习曲线相对陡峭，但它带来的强封装性和可维护性是值得的。对于新项目，建议直接采用 Java 9+ 的特性；对于现有项目，可以根据实际需求逐步迁移。

Java 9 的设计理念体现了现代化编程语言的发展趋势：更好的模块化、更强的类型安全、更简洁的语法、更优秀的性能，这些特性为 Java 在云原生时代的发展奠定了坚实基础。