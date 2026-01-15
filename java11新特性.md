# Java 11 新特性总结

Java 11 是 Oracle 于 2018 年 9 月 25 日发布的长期支持（LTS）版本，是 Java 8 之后最重要的版本之一。Java 11 不仅包含许多重要的语言、API 和性能改进，还引入了一些新的功能，让 Java 更加现代化。

## 主要新特性

### 1. HTTP Client 标准化
Java 11 将新的 HTTP Client API 正式加入标准库（位于 `java.net.http` 包），取代了之前的 HttpURLConnection API。

```java
HttpClient client = HttpClient.newHttpClient();
HttpRequest request = HttpRequest.newBuilder()
    .uri(URI.create("https://api.example.com"))
    .build();
HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
System.out.println("Response: " + response.body());
```

- 支持 HTTP/1.1 和 HTTP/2
- 支持同步和异步请求
- 支持 WebSocket

### 2. 字符串增强
Java 11 为 String 类添加了多个实用的新方法：

- `isBlank()` - 检查字符串是否为空白
- `lines()` - 将字符串按行分割为流
- `strip()` - 去除前导和尾随空白
- `stripLeading()` - 去除前导空白
- `stripTrailing()` - 去除尾随空白
- `repeat(int count)` - 重复字符串指定次数

```java
String str = "  Hello World  ";
System.out.println(str.strip()); // "Hello World"
System.out.println(str.isBlank()); // false
System.out.println("Hello\nWorld".lines().count()); // 2
System.out.println("Java".repeat(3)); // "JavaJavaJava"
```

### 3. 局部变量类型推断增强
Java 11 扩展了 Java 10 引入的 `var` 关键字，允许在 Lambda 表达式的参数中使用 `var`：

```java
// 在 Lambda 表达式中使用 var
List<String> list = Arrays.asList("apple", "banana", "cherry");
list.forEach((@Nonnull var item) -> System.out.println(item));
```

### 4. 文件操作增强
新增了两个便捷的文件操作方法：

- `Files.readString(Path)` - 读取文件内容为字符串
- `Files.writeString(Path, String)` - 将字符串写入文件

```java
Path path = Path.of("example.txt");
String content = Files.readString(path);
Files.writeString(path, "Hello Java 11!");
```

### 5. ZGC 垃圾收集器
Java 11 引入了 ZGC（Z Garbage Collector），这是一个可伸缩的低延迟垃圾收集器：

- 最大暂停时间不超过 10 毫秒
- 支持 TB 级别的堆内存
- 适用于需要低延迟的大规模应用程序

### 6. Epsilon GC
Java 11 引入了 Epsilon GC，一个"无操作"垃圾收集器：

- 仅负责内存分配，不做任何回收操作
- 适用于运行时间很短的应用程序
- 主要用于性能测试和压力测试

### 7. 动态类文件常量（Dynamic Class-File Constants）
Java 11 支持动态类文件常量，这为未来 Java 语言的发展提供了基础。

### 8. Flight Recorder 和 Mission Control
Java Flight Recorder 和 Java Mission Control 从 JRockit 移植到 OpenJDK，并开源：

- 用于收集有关正在运行的 JVM 以及应用程序的数据
- 对性能影响极小（小于 1%）
- 有助于分析和诊断问题

### 9. 单文件源码程序
Java 11 正式支持直接运行单个源文件，无需预先编译：

```bash
java HelloWorld.java
```

这使得 Java 更适合编写脚本和小型程序。

### 10. Nest-Based 访问控制
引入了基于 Nest 的访问控制机制：

- 同一个类文件中的嵌套类可以访问彼此的私有成员
- 减少了编译器生成的桥接方法
- 提高了代码的可维护性

## 已删除的内容

### 1. 删除的 API
- Java EE 和 CORBA 模块被移除
- JavaFX 被移除（独立项目）
- Applet API 被弃用

### 2. 其他变化
- 移除了 Nashorn JavaScript 引擎
- 移除了 Pack200 工具和 API

## 总结

Java 11 作为继 Java 8 之后最重要的 LTS 版本，引入了大量实用的新特性和改进。这些新特性不仅提升了开发效率，也改善了性能和安全性。特别是 HTTP Client 标准化、字符串增强和垃圾收集器改进，为现代 Java 应用提供了更好的支持。

Java 11 的发布标志着 Java 平台进入了一个新的发展阶段，也为后续版本奠定了坚实的基础。