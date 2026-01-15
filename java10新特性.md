# Java 10 新特性

## 1. 局部变量类型推断（Local Variable Type Inference）
Java 10 引入了 `var` 关键字，允许编译器自动推断局部变量的类型。

**优点：**
- 减少冗余的类型声明
- 提高代码的可读性
- 编译器进行类型检查，保证类型安全

**示例：**
```java
// Java 9 及之前
List<Integer> list = new ArrayList<Integer>();
Map<String, String> map = new HashMap<String, String>();

// Java 10 使用 var
var list = new ArrayList<Integer>();
var map = new HashMap<String, String>();

// 其他使用场景
var message = "Hello World"; // String
var numbers = new int[]{1, 2, 3, 4, 5}; // int[]
var stream = list.stream(); // Stream<Integer>

// var 的限制条件
// 1. 只能用于局部变量，不能用于成员变量、方法参数、返回类型
// 2. 变量必须在声明时初始化
// 3. 不能初始化为 null
```

## 2. 不可变集合（Unmodifiable Collections）
Java 10 提供了便捷的方式创建不可变集合。

**示例：**
```java
// 创建不可变 List
List<String> immutableList = List.of("a", "b", "c");
// immutableList.add("d"); // 会抛出 UnsupportedOperationException

// 创建不可变 Set
Set<String> immutableSet = Set.of("apple", "banana", "orange");

// 创建不可变 Map
Map<String, Integer> immutableMap = Map.of("one", 1, "two", 2, "three", 3);
```

## 3. 垃圾回收改进
- **G1GC（Garbage First GC）**变为默认垃圾回收器
- 改进了并发标记的线程数量设置
- 优化了完整 GC 的性能

## 4. 应用类数据共享（Application Class Data Sharing, AppCDS）
允许应用程序类被存档到共享归档文件中，在多个 JVM 实例之间共享。

**优点：**
- 减少应用启动时间
- 降低内存占用

## 5. 线程本地握手（Thread-Local Handshake）
允许线程相互请求停止，而无需全局虚拟机安全点。

**优点：**
- 减少 STW（Stop-The-World）的停顿时间
- 提高应用的响应性

## 6. 删除的特性
- **删除 JDK 8 中的 Nashorn JavaScript 引擎**
- **删除 applet 支持**
- **删除 JNLP（Java Network Launch Protocol）支持**

## 7. 其他改进
- **容器感知（Container Awareness）**：JVM 能更好地识别容器环境的资源限制
- **新增的 API**：`ProcessHandle` 增强，提供获取进程 ID 和进程树的能力
- **Java 源文件的直接执行**：可以直接运行 `.java` 文件而无需先编译

**示例：**
```bash
# Java 10 支持直接运行 Java 文件
java HelloWorld.java
```

## 总结

Java 10 是一个重要的改进版本，主要聚焦于简化开发体验和提升性能：

- **`var` 关键字**：简化了局部变量声明，减少样板代码
- **不可变集合**：提供了更便捷的不可变集合创建方式
- **GC 优化**：G1GC 成为默认，提升了垃圾回收性能
- **容器支持**：更好地支持云原生和容器化部署环境
- **开发者体验**：删除过时特性，优化开发流程

Java 10 虽然是一个短期支持版本（仅6个月），但它引入的 `var` 关键字等特性在后续版本中得到了保留和广泛应用。
