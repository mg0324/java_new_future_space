# Java 15 新特性总结

Java 15 是 Oracle 于 2020 年 9 月 15 日发布的版本，虽然不是长期支持（LTS）版本，但带来了 14 个新功能，其中有不少是十分实用的特性。Java 15 在语言特性、JVM 改进和 API 增强等方面都有显著的提升。

## 主要新特性

### 1. 密封类（Sealed Classes，预览特性）
密封类允许开发者对继承进行更精细的控制，提供了一种更加精确地控制类继承的方法。类的设计者可以指定一个类能够被哪些类继承，增强了类的封装性和安全性。

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

### 2. 文本块（Text Blocks，正式特性）
经过两次预览，Text Blocks 在 Java 15 成为正式特性，使多行字符串处理不再繁琐。

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

### 3. Records（二次预览）
Records 特性在 Java 15 中继续作为预览特性，可以用来简化对象的创建和访问，自动生成 getter 和其他必要的方法。

```java
// 使用 Records 简化数据载体类
public record Person(String name, int age) {
    public String getName() {
        return name;
    }
    
    public int getAge() {
        return age;
    }
}
```

### 4. instanceof 模式匹配（二次预览）
instanceof 模式匹配在 Java 15 中继续作为预览特性，简化了类型检查和转换的过程。

```java
// 使用模式匹配简化类型检查
if (obj instanceof String str) {
    System.out.println(str.toUpperCase()); // 自动转换为 String 类型
}
```

### 5. 隐藏类（Hidden Classes）
Java 15 引入了隐藏类（Hidden Classes）特性，可以用来隐藏类的实现细节。隐藏类不能被其他类直接引用，主要用于框架和库的内部实现。

```java
// 隐藏类主要用于框架实现，普通开发者较少直接使用
// 但可以提高框架的性能和灵活性
```

## JVM 相关改进

### 1. ZGC: 可扩展低延迟垃圾收集器（正式发布）
ZGC 在 Java 15 中正式发布，不再处于实验阶段，提供可扩展的低延迟垃圾收集功能。

- 停顿时间不超过 10 毫秒
- 支持 TB 级别的堆内存
- 适用于需要低延迟的大规模应用程序

### 2. Shenandoah GC（正式发布）
Shenandoah 垃圾收集器在 Java 15 中正式发布，提供低停顿时间的垃圾收集功能。

### 3. 禁用和废弃偏向锁（Biased Locking）
Java 15 开始禁用和废弃偏向锁（Biased Locking），这是为了未来的性能优化做准备。

### 4. 重新实现 DatagramSocket API
Java 15 重新实现了 DatagramSocket API，使其更加现代化和易于维护。

## API 增强

### 1. 外部内存访问 API（第二个孵化器）
Java 15 继续提供外部内存访问 API 的孵化器版本，允许更安全地访问 JVM 外部内存。

### 2. 爱德华曲线算法（EdDSA）
Java 15 增加了一个新的密码学算法，爱德华曲线算法（EdDSA）签名算法。

## 已删除和移除的功能

### 1. 移除 Nashorn JavaScript 引擎
Java 15 正式移除了 Nashorn JavaScript 引擎，这是因为在 GraalVM 提供了更好的替代方案。

### 2. 删除 Solaris 和 SPARC 端口
由于缺乏足够的维护资源，Solaris 和 SPARC 端口在 Java 15 中被完全删除。

## 预览和孵化器功能

### 1. 密封类（Sealed Classes）
- 作为预览特性引入
- 提供更精确的类继承控制
- 增强类的封装性和安全性

### 2. Records（二次预览）
- 简化数据载体类的定义
- 自动生成构造函数、访问器方法、equals、hashCode 和 toString 方法

### 3. instanceof 模式匹配（二次预览）
- 简化类型检查和转换过程
- 减少样板代码

## 总结

Java 15 虽然是短期版本，但特性相当丰富。其中最引人注目的是文本块在这一版终于正式发布，使多行字符串处理不再繁琐。密封类的引入为开发者提供了更精确的继承控制机制，隐藏类为框架开发者提供了更灵活的实现方式。

Java 15 还在性能和 JVM 改进方面做了很多工作，包括 ZGC 和 Shenandoah GC 的正式发布，这为低延迟应用场景提供了更多选择。同时，移除 Nashorn JavaScript 引擎等决策也表明了 Java 平台向前发展的决心。

这些新特性的引入，标志着 Java 语言正在向更现代化、更安全和更高效的方向发展。