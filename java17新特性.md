# Java 17 新特性总结

Java 17 是 Oracle 于 2021 年 9 月 14 日发布的长期支持（LTS）版本，这也是继 Java 11 之后的又一个长期支持版本。根据 Oracle 的支持路线图，Java 17 将获得至少八年的支持，使其成为企业级应用的理想选择。

## 主要新特性

### 1. 密封类（Sealed Classes，正式特性）
Java 17 将密封类从预览特性转为正式特性。密封类和接口限制了哪些其他类或接口可以扩展或实现它们，提供了对类继承结构的更好控制。

```java
// 使用 sealed 关键字限制继承
public sealed class Shape
    permits Circle, Rectangle, Square {
    // ...
}

final class Circle extends Shape {
    // ...
}

final class Rectangle extends Shape {
    // ...
}

non-sealed class Square extends Shape {
    // ...
}
```

### 2. Switch 模式匹配（预览特性）
Java 17 提供了 switch 的模式匹配作为预览特性，扩展了 switch 表达式和语句的模式匹配功能。

```java
// 使用模式匹配的 switch 表达式
static String formatter(Object obj) {
    return switch (obj) {
        case Integer i -> String.format("int %d", i);
        case Long l    -> String.format("long %d", l);
        case Double d  -> String.format("double %f", d);
        case String s  -> String.format("String %s", s);
        default        -> obj.toString();
    };
}
```

### 3. 弃用安全管理器（Security Manager）
Java 17 标记安全管理器（Security Manager）为弃用，因为其复杂性和维护成本较高。

### 4. 永久性强封装 JDK 内部 API
Java 17 完成了对 JDK 内部 API 强封装的最后工作，默认情况下禁止访问内部 API。

## API 增强

### 1. 伪随机数生成器（Pseudo-Random Number Generators）
Java 17 通过 JEP 356 引入了一系列新的随机数生成器接口和实现，提供了更好的性能和更灵活的选择。

```java
// 使用新的随机数生成器接口
RandomGenerator rng = RandomGeneratorFactory.all().findFirst().get().create();

// 生成随机数
int randomInt = rng.nextInt();
```

### 2. Stream API 增强
Java 17 为 Stream API 添加了新的方法，如 toList()，用于简化流操作。

```java
// 使用 Stream.toList() 方法
List<String> list = Stream.of("a", "b", "c")
    .filter(s -> s.length() > 0)
    .toList(); // 替代 collect(Collectors.toList())
```

### 3. 外部函数和内存 API（孵化特性）
Java 17 引入了外部函数和内存 API（孵化特性），用于替代 JNI，提供更安全和高效的本地代码互操作性。

## JVM 相关改进

### 1. ZGC 改进
ZGC 在 Java 17 中继续得到改进，包括并发栈处理和其他性能优化。

### 2. 弃用 Applet API
Java 17 完全弃用了 Applet API，因为 Applet 技术已经过时。

### 3. macOS 渲染改进
针对 macOS 平台，Java 17 引入了基于 Metal 的 Java 2D 渲染管线，提高了图形性能。

## 语言和语法改进

### 1. Records 增强
Java 17 进一步增强了 Records 的功能，使其更适合数据载体类的定义。

```java
// 使用 Records 定义数据类
public record Person(String name, int age) {
    public Person {
        if (age < 0) {
            throw new IllegalArgumentException("Age cannot be negative");
        }
    }
}
```

### 2. instanceof 模式匹配增强
Java 17 在已有 instanceof 模式匹配基础上进行了增强，使类型检查和转换更加简洁。

## 平台支持改进

### 1. 跨平台渲染管线
Java 17 改进了对不同操作系统的渲染支持，特别是在 macOS 上引入了基于 Metal 的渲染管线。

### 2. 增强的伪随机数生成器
Java 17 引入了更灵活和高性能的随机数生成器 API。

## 安全改进

### 1. 上下文特定的反序列化过滤器
Java 17 引入了上下文特定的反序列化过滤器，增强了反序列化操作的安全性。

## 已删除和弃用的功能

### 1. 弃用安全管理器
安全管理器被标记为弃用，计划在未来版本中移除。

### 2. 移除 Applet API
完全移除了已经过时的 Applet API。

## 预览和孵化功能

### 1. Switch 模式匹配（预览特性）
- 扩展了 switch 表达式和语句的模式匹配功能
- 提供了更强大的数据查询能力

### 2. 外部函数和内存 API（孵化特性）
- 提供了与本地代码互操作的新方式
- 替代了复杂的 JNI 机制

## 总结

Java 17 是继 Java 11 之后的又一个长期支持版本，也是"现代 Java"功能集的大成者。它巩固了近年来引入的重要语言特性，如密封类、Record、Pattern Matching 等，使其成为正式特性。

Java 17 的发布标志着 Java 平台的一个重要里程碑，它不仅带来了许多新的特性和改进，还为 Java 社区的未来发展奠定了坚实的基础。Java 17 的增强特性和性能改进将使 Java 在各个领域发挥更大的作用，满足现代应用的需求。

对于企业级应用来说，Java 17 提供了稳定性、安全性和性能的完美平衡，是升级到现代 Java 版本的理想选择。