# Java 21 新特性总结

Java 21 是 Oracle 于 2023 年 9 月 19 日发布的长期支持（LTS）版本，这是继 Java 8、Java 11、Java 17 之后的第5个 LTS 版本。Java 21 作为里程碑式的发布，融合了过去几版的预览特性，带来了约 15 项新特性，使 Java 在语法、并发、性能等方面迈上新台阶。

## 主要新特性

### 1. 虚拟线程（Virtual Threads，正式特性）
虚拟线程是 Project Loom 的核心成果，现已正式发布。虚拟线程是由 JVM 管理的轻量级线程，可显著提高高并发应用程序的性能和可伸缩性。

```java
// 使用虚拟线程执行大量并发任务
try (var executor = Executors.newVirtualThreadPerTaskExecutor()) {
    IntStream.range(0, 10_000)
        .forEach(i -> executor.submit(() -> {
            // 执行长时间运行的任务
            try {
                Thread.sleep(Duration.ofMillis(100));
                System.out.println("Task " + i + " completed");
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }
        }));
}
```

### 2. 记录模式（Record Patterns，正式特性）
记录模式正式发布，扩展了模式匹配的能力，使解构记录类的组件变得更加简洁。

```java
// 使用记录模式进行解构
static String displayCenter(Object obj) {
    return switch (obj) {
        case Point(int x, int y) -> 
            "Point at (%d, %d)".formatted(x, y);
        case Rectangle(Point ul, Point lr) -> 
            "Rectangle with center at (%d, %d)"
                .formatted((ul.x() + lr.x()) / 2, (ul.y() + lr.y()) / 2);
        default -> "Unknown shape";
    };
}

// 记录类定义
record Point(int x, int y) {}
record Rectangle(Point upperLeft, Point lowerRight) {}
```

### 3. Switch 模式匹配（Pattern Matching for Switch，正式特性）
Switch 模式匹配正式发布，提供了更强大的类型匹配和数据提取能力。

```java
// 使用模式匹配的 switch 表达式
static double calculateArea(Shape shape) {
    return switch (shape) {
        case Circle(var radius) -> Math.PI * radius * radius;
        case Rectangle(var width, var height) -> width * height;
        case Triangle(var base, var height) -> 0.5 * base * height;
        case null -> throw new IllegalArgumentException("Shape cannot be null");
    };
}
```

### 4. 未命名模式和变量（Unnamed Patterns and Variables，正式特性）
Java 21 引入了未命名模式和变量，允许使用 `_` 作为未使用的模式变量名，提升代码简洁性。

```java
// 使用未命名变量
static boolean isValid(Object obj) {
    return switch (obj) {
        case Point(_, _) -> true;  // 忽略 x 和 y 坐标
        case null -> false;
        default -> false;
    };
}
```

### 5. 序列化集合（Sequenced Collections，正式特性）
Java 21 引入了序列化集合 API，提供了一个统一的接口来处理有序集合。

```java
import java.util.SequencedCollection;
import java.util.SequencedMap;
import java.util.ArrayList;

// 使用序列化集合
List<String> list = new ArrayList<>();
list.addFirst("first");  // 添加到开头
list.addLast("last");    // 添加到结尾
String first = list.getFirst();  // 获取第一个元素
String last = list.getLast();    // 获取最后一个元素
```

## API 增强

### 1. 字符串模板（String Templates，预览特性）
Java 21 引入了字符串模板预览特性，提供更安全和更易读的字符串拼接方式。

```java
// 使用字符串模板
Point p = new Point(10, 20);
String message = STR."The point is at (\{p.x()}, \{p.y()})";  // 需启用预览

// 字符串模板处理器
String sql = STR."SELECT * FROM users WHERE id = \{userId} AND active = \{true}";
```

### 2. 作用域值（Scoped Values，正式特性）
作用域值提供了一种安全地在线程内和线程间共享不可变数据的方式。

```java
import java.lang.ScopedValue;

// 使用作用域值传递上下文信息
static final ScopedValue<Carrier> CARRIER = ScopedValue.newInstance();

// 在作用域中绑定值
ScopedValue.runWhere(CARRIER, carrier, () -> {
    // 在此作用域内可以访问 CARRIER.get()
    processRequest();
});

// 在方法中访问作用域值
void processRequest() {
    Carrier carrier = CARRIER.get(); // 获取作用域值
    // 使用 carrier 处理请求
}
```

### 3. 结构化并发（Structured Concurrency，正式特性）
结构化并发正式发布，提供了一种更安全和可维护的方式来处理多线程任务。

```java
import java.util.concurrent.StructuredTaskScope;

// 使用结构化并发处理多个异步任务
try (var scope = new StructuredTaskScope.ShutdownOnFailure()) {
    var userTask = scope.fork(() -> findUser(userId));
    var orderTask = scope.fork(() -> findOrder(userId));
    
    scope.join(); // 等待所有任务完成
    scope.throwIfFailed(); // 检查是否有失败的任务
    
    User user = userTask.resultNow();
    Order order = orderTask.resultNow();
    
    return new UserProfile(user, order);
}
```

## JVM 和性能改进

### 1. 分代 ZGC（Generational ZGC）
Java 21 引入了分代 ZGC，通过将堆分为年轻代和老年代来减少垃圾收集的停顿时间。

### 2. 序列化 API
Java 21 引入了序列化集合 API，提供统一的接口来处理有序集合。

### 3. 更详细的 NullPointerExceptions
Java 21 对 NullPointerException 进行了改进，提供更详细的错误信息，包括异常的来源和路径。

## 语言和语法改进

### 1. 模式匹配的进一步增强
- 记录模式的正式发布
- Switch 模式匹配的完善
- 未命名模式和变量的引入

### 2. 集合 API 的统一
- SequencedCollection 接口的引入
- 统一的首尾元素操作方法

## 预览特性

### 1. 字符串模板（String Templates）
- 提供更安全的字符串拼接
- 支持表达式嵌入和自定义处理器

## 平台支持改进

### 1. Unicode 15 支持
Java 21 增加了对 Unicode 15 的支持。

### 2. 更好的性能和稳定性
- 虚拟线程带来的并发性能提升
- 分代 ZGC 的引入
- 更好的内存管理

## 总结

Java 21 作为最新的长期支持版本，是 Java 语言发展历程中的一个重要里程碑。它不仅固化了多年来预览的特性（如虚拟线程、记录模式、Switch 模式匹配等），还引入了新的功能（如序列化集合、作用域值等）。

虚拟线程的正式发布将彻底改变 Java 的并发编程模型，使得编写高并发应用变得更加容易；记录模式和 Switch 模式匹配的正式发布进一步简化了数据处理代码；分代 ZGC 的引入则显著提升了垃圾收集的性能。

对于企业和开发者来说，Java 21 提供了更好的性能、更高的生产力和更强的安全性，是升级到现代 Java 版本的理想选择。Java 21 的发布标志着 Java 在并发编程、性能优化和代码简洁性方面达到了新的高度。