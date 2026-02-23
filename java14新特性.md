# Java 14 新特性总结

Java 14 是 Oracle 于 2020 年 3 月 17 日发布的版本，这个版本包含了 16 个新特性（JEP），是自 Java 采用六个月发布周期以来的重要版本之一。Java 14 在语言特性、JVM 改进和 API 增强等方面都有显著的提升。

## 主要新特性

### 1. Switch 表达式（正式特性）
经过两个版本的预览，增强型 switch 在 Java 14 中正式成为 Java 语言的一部分。Switch 表达式扩展了 switch 语句，使其不仅可以作为语句，还可以作为表达式，并且支持简化的 "case L ->" 模式匹配语法。

```java
// 传统的 switch 语句
int numLetters = switch (day) {
    case MONDAY, FRIDAY, SUNDAY -> 6;
    case TUESDAY                -> 7;
    case THURSDAY, SATURDAY     -> 8;
    case WEDNESDAY              -> 9;
    default                     -> throw new IllegalStateException("Unexpected value: " + day);
};

// 使用 yield 从复杂的 case 块返回值
int result = switch (day) {
    case MONDAY -> 0;
    case TUESDAY -> 1;
    default -> {
        int result = days.length;
        yield result;
    }
};
```

### 2. Record 类（预览特性）
Java 14 引入了一种全新的类型声明：记录类（Record），作为预览特性。Record 提供了一种紧凑的语法来声明类，主要用于创建不可变的数据载体类。

```java
// 使用 Record 简化 POJO 类的定义
public record Person(String name, int age) {}

// 使用示例
Person person = new Person("John", 30);
System.out.println(person.name()); // 获取 name
System.out.println(person.age());  // 获取 age
```

### 3. instanceof 模式匹配（预览特性）
Java 14 中，instanceof 模式匹配作为预览特性再次出现，简化了在进行类型检查后再强制转换的常见模式。

```java
// 传统的 instanceof 使用方式
if (obj instanceof String) {
    String s = (String) obj;
    System.out.println(s.toUpperCase());
}

// Java 14 的模式匹配
if (obj instanceof String s) {
    System.out.println(s.toUpperCase()); // 自动转换为 String 类型
}
```

### 4. 文本块（第二次预览）
文本块在 Java 14 中继续作为预览特性，并引入了新的转义序列。文本块提供了一种简洁的方式来表示多行字符串。

```java
// 使用文本块定义多行字符串
String html = """
             <html>
                 <body>
                     <p>Hello, world</p>
                 </body>
             </html>
             """;
```

### 5. 改进的 NullPointerExceptions 提示信息
Java 14 对长期困扰开发者的 NullPointerException 进行了改进。当发生 NPE 时，错误信息现在会指出具体哪个变量为空。

```java
// 改进后的 NullPointerException 会显示更详细的信息
// 如 "Exception in thread "main" java.lang.NullPointerException: 
// Cannot assign field "name" because "person" is null"
```

## JVM 相关改进

### 1. ZGC 扩展到 macOS 和 Windows
Java 14 将 ZGC 从仅支持 Linux 扩展到了 macOS 和 Windows 平台（实验性）。

- 提供低延迟的垃圾收集
- 支持跨平台使用
- 适用于需要低延迟的大规模应用程序

### 2. G1 的 NUMA 感知内存分配
Java 14 对 G1 垃圾收集器进行了优化，支持 NUMA（Non-Uniform Memory Access）感知的内存分配，以提高多核系统的性能。

### 3. 移除 CMS 垃圾回收器
并发标记清除（CMS）垃圾收集器自 Java 9 起被弃用，终于在 Java 14 中被完全移除。

## 工具和 API 增强

### 1. jpackage 工具（孵化特性）
Java 14 提供了 jpackage 工具的早期版本，可将 Java 应用打包成原生安装包，支持创建独立的可执行文件。

### 2. 非易失性映射字节缓冲区
新增了特定 JDK 的文件映射模式，可以使用 FileChannel 创建引用非易失性存储器的 MappedByteBuffer。

### 3. JFR 事件流
Java Flight Recorder (JFR) 现在支持事件流，允许应用程序代码注册回调以接收实时事件。

## 已删除和弃用的功能

### 1. 移除 Pack200 工具和 API
Pack200 工具和相关 API 在 Java 14 中被完全移除。

### 2. 弃用 Solaris 和 SPARC 端口
由于缺乏足够的维护资源，Solaris 和 SPARC 端口在 Java 14 中被弃用。

### 3. 弃用 ParallelScavenge 和 SerialOld GC 组合
ParallelScavenge 和 SerialOld 垃圾收集器的组合使用在 Java 14 中被弃用。

## 预览和实验性功能

### 1. Record 类
- 作为预览特性引入
- 提供了一种简洁的方式来定义数据载体类
- 自动生成构造函数、访问器方法、equals、hashCode 和 toString 方法

### 2. instanceof 模式匹配
- 简化类型检查和转换过程
- 减少样板代码

### 3. 文本块（第二次预览）
- 进一步完善多行字符串的处理
- 提供更自然的字符串字面量语法

## 总结

Java 14 是一个内容相当丰富的版本，其中最引人注目的是 Switch 表达式正式成为标准特性，以及 Record 类和 instanceof 模式匹配的引入。这些语言层面的增强让 Java 变得更简洁和富有表达力，逐步摆脱"样板代码多"的诟病。

Java 14 还在性能和 JVM 改进方面做了很多工作，包括 ZGC 的跨平台支持、G1 的 NUMA 优化等。同时，移除一些老旧的 GC 和工具也表明了 Java 平台向前发展的决心。这些新特性的引入，标志着 Java 语言正在向更现代化的方向发展。