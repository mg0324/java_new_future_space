# Java 7 新特性总结

Java 7（代号 Dolphin）是甲骨文在 2011 年发布的第一个 Java 版本，它是 Oracle 工程师和全球 Java 社区成员广泛合作的结果。Java 7 包含了很多变化，虽然比开发人员预期的要少，但它引入了许多重要的语言和 API 改进。

## 主要新特性

### 1. 在 switch 语句中使用 String
Java 7 允许在 switch 语句中使用 String 类型，这是非常实用的改进。

```java
public String generate(String name, String gender) {
    String title = "";
    switch (gender) {
        case "男":
            title = name + " 先生";
            break;
        case "女":
            title = name + " 女士";
            break;
        default:
            title = name;
    }
    return title;
}
```

### 2. 自动资源管理（Try-with-resources）
Java 7 引入了 try-with-resources 语句，自动管理资源的关闭，无需手动在 finally 块中关闭资源。

```java
// 以前的写法
BufferedReader br = new BufferedReader(new FileReader(path));
try {
    return br.readLine();
} finally {
    br.close();
}

// Java 7 的写法
try (BufferedReader br = new BufferedReader(new FileReader(path))) {
    return br.readLine();
}
```

### 3. 改进的泛型实例创建类型推断（Diamond Operator）
Java 7 引入了钻石操作符（<>），可以从声明中推断泛型类型。

```java
// 以前的写法
Map<String, List<String>> anagrams = new HashMap<String, List<String>>();

// Java 7 的写法
Map<String, List<String>> anagrams = new HashMap<>();
```

### 4. 数字字面量中的下划线支持
Java 7 允许在数字字面量中使用下划线来提高可读性。

```java
int one_million = 1_000_000;           // 更易读的数字
long creditCardNumber = 1234_5678_9012_3456L;
float pi = 3.14_15F;
long hexBytes = 0xFF_EC_DE_5E;
```

### 5. 二进制字面量
Java 7 支持直接使用二进制表示整数，使用 0b 或 0B 前缀。

```java
int binary = 0b001001;     // 十进制数字 9
int binary2 = 0B001001;    // 十进制数字 9
```

### 6. 多异常捕获（Multi-catch Exception Handling）
Java 7 允许在一个 catch 块中捕获多个异常类型。

```java
try {
    // 一些可能抛出异常的代码
} catch (IOException | SQLException ex) {
    // 处理 IOException 或 SQLException
    logger.error(ex);
}
```

### 7. 对集合类的语言级支持（Project Coin）
虽然 Java 7 最终没有完全实现对集合类的字面量支持，但这一特性曾被讨论过。实际上，Java 7 中并未包含此功能。

## JVM 和底层改进

### 1. JSR 292: 动态语言支持
Java 7 通过新的 invoke 动态字面量支持动态语言，使 Java 代码可以使用 Python、Ruby、Perl、JavaScript 和 Groovy 等非 Java 语言实现的代码。

### 2. 压缩的 64 位指针
JVM 的内部优化，使用压缩的 64 位指针，因此消耗的内存更少。

### 3. G1 垃圾回收器
引入了新的 G1（Garbage First）垃圾回收器，旨在替代 CMS 垃圾回收器，提供更好的性能和可预测的暂停时间。

## 并发性改进

### Fork/Join 框架
Java 7 引入了 Fork/Join 框架，用于更好地支持并行计算，利用多核处理器的优势。

```java
import java.util.concurrent.RecursiveTask;

public class Fibonacci extends RecursiveTask<Integer> {
    final int n;
    Fibonacci(int n) { this.n = n; }
    public Integer compute() {
        if (n <= 1) return n;
        Fibonacci f1 = new Fibonacci(n - 1);
        f1.fork();
        Fibonacci f2 = new Fibonacci(n - 2);
        return f2.compute() + f1.join();
    }
}
```

## I/O 改进

### NIO.2 (New I/O 2)
Java 7 引入了 NIO.2，提供了更好的文件系统支持和异步 I/O 操作。

```java
import java.nio.file.*;

// 使用 NIO.2 进行文件操作
Path path = Paths.get("example.txt");
String content = Files.readAllLines(path).stream()
    .collect(Collectors.joining("\n"));
```

## 总结

Java 7 虽然不像 Java 8 那样引入了 Lambda 表达式等重大语言特性，但它仍然带来了许多实用的改进，特别是在资源管理、异常处理和代码可读性方面。try-with-resources 语句、钻石操作符、数字字面量改进等特性大大简化了 Java 代码的编写和维护。

尽管 Project Coin 中的一些激进想法（如对集合字面量的支持）没有实现，但 Java 7 的改进为后续版本的发展奠定了基础。Java 7 的发布标志着 Java 平台在现代化道路上的稳步前进，为开发者提供了更简洁、更安全的编程方式。