# Java 13 新特性总结

Java 13 是 Oracle 于 2019 年 9 月 17 日发布的版本，虽然不是长期支持（LTS）版本，但也带来了不少重要的新功能和改进。Java 13 继续沿用了每六个月发布一个新版本的策略，并重点增强了性能和语言表达能力。

## 主要新特性

### 1. 文本块（Text Blocks，预览特性）
Java 13 引入了文本块作为预览特性，这是一个多行字符串文字，它避免了对大多数转义序列的需要，以可预测的方式自动格式化字符串，并在需要时让开发人员控制格式。

```java
// 传统的多行字符串写法
String html = "<html>\n" +
              "    <body>\n" +
              "        <p>Hello, world</p>\n" +
              "    </body>\n" +
              "</html>\n";

// Java 13 的文本块写法
String html = """
              <html>
                  <body>
                      <p>Hello, world</p>
                  </body>
              </html>
              """;
```

文本块使用三个双引号 (`"""`) 作为分隔符，使得多行字符串的编写更加简洁和易读。

### 2. Switch 表达式增强（二次预览）
Java 13 对在 Java 12 中首次引入的 Switch 表达式进行了增强，引入了 `yield` 语句来返回值，而不是使用 `break`。`yield` 关键字用于从 switch 表达式的 case 块中返回一个值。

```java
// 使用 yield 从 switch 表达式返回值
int i = switch (day) {
    case MONDAY, TUESDAY -> 1;
    case WEDNESDAY -> {
        System.out.println("Wednesday");
        yield 3; // 使用 yield 返回值
    }
    default -> 0;
};
```

### 3. 动态 CDS 归档（Dynamic CDS Archives）
Java 13 扩展了应用程序类-数据共享（AppCDS），以允许在 Java 应用程序执行结束时动态归档类。归档类将包括默认的基础层 CDS 存档中不存在的所有已加载的应用程序类和库类。

- 提升应用程序启动性能
- 减少内存占用
- 延续了在 Java 10 中引入的 AppCDS 功能

### 4. ZGC：释放未使用的内存（ZGC: Uncommit Unused Memory）
Java 13 增强了 ZGC，使其能够将未使用的堆内存返回给操作系统。ZGC 是一个可扩展的低延迟垃圾收集器，在 Java 13 中进一步优化了内存管理。

- 减少应用程序的内存占用
- 提高内存使用效率
- 适用于需要低延迟的大规模应用程序

### 5. 重新实现 Socket API（Reimplement the Legacy Socket API）
Java 13 使用更简单、更现代的实现替换了 java.net.Socket 和 java.net.ServerSocket API 使用的底层实现，以提高可维护性和调试性。

- 简化了 Socket API 的底层实现
- 提高了可维护性
- 便于调试和故障排除

## 预览和实验性功能

### 文本块（Text Blocks）
- 作为预览特性引入
- 提供了多行字符串字面量的简洁语法
- 自动处理字符串格式化

### Switch 表达式（增强版）
- 在 Java 12 的基础上进行了增强
- 引入了 `yield` 语句用于返回值
- 继续作为预览特性提供

## 其他改进

### 性能优化
- 通过动态 CDS 归档提升启动性能
- 通过 ZGC 改进内存管理
- 通过 Socket API 重构提高可维护性

### JVM 改进
- 更好的内存管理机制
- 优化的垃圾收集行为
- 改进的类加载机制

## 总结

Java 13 虽然不是长期支持版本，但仍然引入了一些非常有用的功能，特别是文本块和 Switch 表达式的增强，显著改善了 Java 代码的可读性和表达能力。动态 CDS 归档和 ZGC 的改进则进一步提升了性能表现。

Java 13 的发布延续了 Java 平台不断演进的趋势，通过预览特性的引入，允许开发者提前体验并反馈，确保新功能在正式发布前经过充分验证。文本块的引入使得处理多行字符串变得更加直观，而 Switch 表达式的改进则让条件逻辑的编写更加简洁。