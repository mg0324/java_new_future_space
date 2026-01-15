# Java 12 新特性总结

Java 12 是 Oracle 于 2019 年 3 月 19 日发布的版本，作为 Java 11 之后的第一个版本，Java 12 带来了许多有用的新特性和改进，虽然它不是长期支持（LTS）版本，但仍包含了一些重要的功能更新。

## 主要新特性

### 1. Switch 表达式（预览特性）
Java 12 引入了 Switch 表达式作为预览特性，它允许 switch 不仅可以用作语句，还可以用作表达式，可以直接返回值并使用简洁的"箭头语法"。

```java
// 传统的 switch 语句
int numLetters = 0;
switch (day) {
    case MONDAY:
    case FRIDAY:
    case SUNDAY:
        numLetters = 6;
        break;
    case TUESDAY:
        numLetters = 7;
        break;
    default:
        numLetters = 10;
}

// Java 12 的 Switch 表达式
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    default                   -> 10;
};
```

### 2. 字符串增强
Java 12 为 String 类添加了几个新的实用方法：

#### indent() - 调整字符串每行的缩进
```java
String text = "Hello\nWorld";
System.out.println(text.indent(2)); // 为每行添加2个空格的缩进
```

#### transform() - 将字符串通过给定的函数转换为另一种对象
```java
String original = "hello";
String result = original.transform(str -> str.toUpperCase());
System.out.println(result); // "HELLO"
```

#### describeConstable() 和 resolveConstantDesc()
这两个方法用于支持 JVM 常量 API。

### 3. Files.mismatch() 方法
Java 12 在 java.nio.file.Files 类中新增了 mismatch() 方法，用于高效比较两个文件的内容是否相同。

```java
Path file1 = Path.of("file1.txt");
Path file2 = Path.of("file2.txt");

long mismatch = Files.mismatch(file1, file2);
if (mismatch == -1) {
    System.out.println("Files are identical");
} else {
    System.out.println("Files differ at byte " + mismatch);
}
```

### 4. Compact Number Formatting（紧凑数字格式）
Java 12 引入了紧凑数字格式（Compact Number Formatting），可以将数字格式化为人类可读的形式。

```java
NumberFormat fmt = NumberFormat.getCompactNumberInstance(
    Locale.US, NumberFormat.Style.SHORT);
String result = fmt.format(1000); // "1K" for English locale
System.out.println(result);

NumberFormat fmt2 = NumberFormat.getCompactNumberInstance(
    Locale.US, NumberFormat.Style.LONG);
String result2 = fmt2.format(1000); // "1 thousand" for English locale
System.out.println(result2);
```

### 5. Collectors.teeing() 收集器
Java 12 增加了一个很有用的 Collector：teeing()，可以让流拆分成两个子流，各自收集后再合并结果。

```java
DoubleSummaryStatistics stats = Stream.of(1.0, 2.0, 3.0, 4.0, 5.0)
    .collect(Collectors.teeing(
        Collectors.summingDouble(Double::doubleValue),
        Collectors.counting(),
        (sum, count) -> new DoubleSummaryStatistics(count, sum)
    ));
```

### 6. Shenandoah GC（实验性）
Java 12 正式引入了 Shenandoah 垃圾收集器（实验性），这是由 Red Hat 开发的低停顿垃圾收集器。

- 设计目标是实现低暂停时间
- 适用于需要低延迟的应用程序

### 7. G1 垃圾收集器优化
Java 12 对默认的 G1 垃圾收集器进行了改进：
- G1 的可中断 mixed GC
- 从 G1 立即返回未使用的已提交内存

### 8. Microbenchmark Harness（微基准测试套件）
Java 12 引入了一个基于 Java 的微基准测试框架（JEP 230），方便开发者进行性能测试。

### 9. JVM 常量 API
Java 12 提供了一套新的 API，用于在字节码中加载动态常量（JEP 309）。

### 10. 默认 CDS（Class-Data Sharing）归档
Java 12 实现了默认的 CDS 归档，减少了启动时间和内存占用。

## 预览和实验性功能

### Switch 表达式
- 作为预览特性引入
- 提供了更简洁、安全的 Switch 语法

## 其他改进

### Unicode 11 支持
Java 12 增加了对 Unicode 11 的支持。

### instanceof 模式匹配（预览）
Java 12 引入了模式匹配的 instanceof（预览特性），简化了在进行类型检查后再强制转换的常见模式。

## 总结

Java 12 虽然不是一个长期支持版本，但仍带来了许多实用的改进和新功能。其中最值得注意的是 Switch 表达式的预览，它大大简化了 Switch 语句的语法。此外，字符串增强、Files.mismatch() 方法、紧凑数字格式等功能也为日常开发提供了更多便利。

Java 12 还为后续版本的开发奠定了基础，特别是在语法简化和 API 增强方面，为 Java 语言的演进做出了贡献。