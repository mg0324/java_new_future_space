# Java 10 新特性

## 1. 局部变量类型推断（Local-Variable Type Inference）
- 引入 var 关键字，允许编译器根据初始化表达式自动推断局部变量类型。
- 只能用于局部变量声明、循环索引、try-with-resources变量，不能用于成员变量、方法参数或返回类型。
- 示例：
  ```java
  var list = new ArrayList<String>();
  var stream = list.stream();
  ```

## 2. 不可变集合（Unmodifiable Collections）新工厂方法
- 利用 List.of、Set.of、Map.of 创建不可变集合，已在Java 9引入，Java 10提供更方便的复制方法：
  ```java
  List<String> copy = List.copyOf(oldList);
  Set<String> copy = Set.copyOf(oldSet);
  Map<String, String> copy = Map.copyOf(oldMap);
  ```

## 3. G1 垃圾回收器改进
- G1垃圾回收器成为默认垃圾收集器。
- 改善和提升了 Full GC 的性能表现。

## 4. 并发线程局部握手（Thread-Local Handshakes）
- 支持在不全局暂停 JVM 的情况下单独暂停、恢复或检查某个线程，减少STW（Stop-the-World）暂停时间。

## 5. 应用类数据共享（Application Class-Data Sharing，AppCDS）
- 开放AppCDS到所有平台，允许用户自定义共享类，提升应用启动速度并减少内存占用。

## 6. 容器识别（Container Awareness）
- JVM 能更好地识别容器（如Docker）分配的内存和CPU资源，适合云原生和微服务场景。

## 7. 其他变更
- root 证书加入 OpenJDK，提升安全能力。
- 删除了一些过时的API和内部类接口。
