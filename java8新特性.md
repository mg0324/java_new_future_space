# Java 8 新特性

## 1. Lambda 表达式
Lambda 表达式是 Java 8 最重要的特性之一，它允许用简洁的方式定义匿名函数。

**语法：** `(parameters) -> expression` 或 `(parameters) -> { statements }`

**示例：**
```java
// 传统写法
Comparator<Integer> comparator1 = new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
        return o1.compareTo(o2);
    }
};

// Lambda 写法
Comparator<Integer> comparator2 = (o1, o2) -> o1.compareTo(o2);
```

### 2. 函数式接口（Functional Interface）
函数式接口是只有一个抽象方法的接口，可以使用 Lambda 表达式实现。

**常见函数式接口：**
- `java.util.function.Function<T, R>` - 接收一个参数，返回一个结果
- `java.util.function.Consumer<T>` - 接收一个参数，无返回值
- `java.util.function.Supplier<T>` - 无参数，返回一个结果
- `java.util.function.Predicate<T>` - 接收一个参数，返回 boolean

**示例：**
```java
Function<String, Integer> function = s -> s.length();
System.out.println(function.apply("hello")); // 输出: 5

Predicate<Integer> predicate = x -> x > 10;
System.out.println(predicate.test(15)); // 输出: true
```

### 3. Stream API
Stream API 提供了一种高效、优雅的方式来处理集合数据，支持函数式编程风格。

**主要特点：**
- 允许以声明性方式处理数据集合
- 支持并行处理（Parallel Stream）
- 支持链式调用

**常见操作：**
- **中间操作**：`filter`、`map`、`flatMap`、`distinct`、`sorted` 等（返回 Stream）
- **终端操作**：`collect`、`forEach`、`reduce`、`count` 等（返回非 Stream）

**示例：**
```java
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5, 6);

// 找出所有偶数，平方后求和
int result = numbers.stream()
    .filter(n -> n % 2 == 0)
    .map(n -> n * n)
    .reduce(0, Integer::sum);
System.out.println(result); // 输出: 56

// 并行流处理
numbers.parallelStream()
    .filter(n -> n > 3)
    .forEach(System.out::println);
```

### 4. 方法引用（Method Reference）
方法引用是一种更加简洁的 Lambda 表达式形式。

**四种方式：**
1. **静态方法引用**：`ClassName::staticMethodName`
2. **实例方法引用**：`instance::methodName`
3. **类的任意对象的实例方法引用**：`ClassName::methodName`
4. **构造方法引用**：`ClassName::new`

**示例：**
```java
// 静态方法引用
Function<String, Integer> function = Integer::parseInt;
System.out.println(function.apply("123")); // 输出: 123

// 实例方法引用
String str = "hello";
Consumer<String> consumer = System.out::println;
consumer.accept(str); // 输出: hello

// 构造方法引用
Supplier<List<String>> supplier = ArrayList::new;
List<String> list = supplier.get();
```

### 5. 接口默认方法（Default Method）和静态方法
Java 8 允许在接口中定义默认方法和静态方法。

**示例：**
```java
interface Animal {
    // 默认方法
    default void eat() {
        System.out.println("Animal is eating");
    }
    
    // 静态方法
    static void staticMethod() {
        System.out.println("Static method in interface");
    }
}

class Dog implements Animal {
    // 可以不实现 eat() 方法，直接使用默认实现
}
```

### 6. Optional 类
`Optional` 是一个容器类，用于处理可能为 null 的值，能有效地减少 NullPointerException。

**常见方法：**
- `Optional.of(T value)` - 创建一个包含非空值的 Optional
- `Optional.ofNullable(T value)` - 创建一个 Optional，可以包含 null
- `isPresent()` - 检查值是否存在
- `get()` - 获取值（如果值不存在则抛出异常）
- `getOrElse(T other)` - 获取值或返回默认值
- `map(Function<T, U> mapper)` - 对值进行转换
- `filter(Predicate<T> predicate)` - 对值进行过滤

**示例：**
```java
Optional<String> optional = Optional.of("Hello");
System.out.println(optional.isPresent()); // 输出: true
System.out.println(optional.get()); // 输出: Hello

Optional<String> emptyOptional = Optional.empty();
System.out.println(emptyOptional.orElse("Default")); // 输出: Default

Optional<Integer> optionalInt = Optional.ofNullable(null);
optionalInt.ifPresent(System.out::println); // 不会输出任何内容
```

### 7. 日期和时间 API（java.time）
Java 8 引入了新的日期和时间 API，替代了旧的 `Date` 和 `Calendar` 类。

**主要类：**
- `LocalDate` - 表示日期（年月日）
- `LocalTime` - 表示时间（时分秒）
- `LocalDateTime` - 表示日期和时间
- `Instant` - 表示时间戳
- `Duration` - 表示持续时间
- `Period` - 表示时间段
- `ZonedDateTime` - 表示带时区的日期和时间

**示例：**
```java
// 当前日期和时间
LocalDate today = LocalDate.now();
System.out.println(today); // 输出: 2026-01-14

LocalDateTime now = LocalDateTime.now();
System.out.println(now); // 输出: 2026-01-14T16:29:14.123456

// 创建指定日期
LocalDate date = LocalDate.of(2026, 1, 14);
LocalTime time = LocalTime.of(16, 29, 14);

// 日期计算
LocalDate tomorrow = today.plusDays(1);
LocalDate nextMonth = today.plusMonths(1);

// 比较
boolean isAfter = tomorrow.isAfter(today); // true
boolean isBefore = today.isBefore(tomorrow); // true

// 格式化
DateTimeFormatter formatter = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");
String formattedDate = now.format(formatter);
System.out.println(formattedDate); // 输出: 2026-01-14 16:29:14
```

### 8. 其他特性

#### 1) 重复注解（Repeatable Annotations）
允许在同一个元素上多次使用同一个注解。

```java
@Retention(RetentionPolicy.RUNTIME)
@Repeatable(Schedules.class)
public @interface Schedule {
    String value();
}

@Retention(RetentionPolicy.RUNTIME)
public @interface Schedules {
    Schedule[] value();
}

@Schedule("morning")
@Schedule("afternoon")
public void task() {
    // ...
}
```

#### 2) 类型注解（Type Annotations）
允许在任何使用类型的地方使用注解。

```java
@NotEmpty String str = "hello";
List<@NonNull String> list = new ArrayList<>();
```

#### 3) Base64 编码和解码
Java 8 提供了原生的 Base64 编码和解码支持。

```java
String originalString = "Hello World";
String encodedString = Base64.getEncoder().encodeToString(originalString.getBytes());
System.out.println("Encoded: " + encodedString); // Encoded: SGVsbG8gV29ybGQ=

String decodedString = new String(Base64.getDecoder().decode(encodedString));
System.out.println("Decoded: " + decodedString); // Decoded: Hello World
```

#### 4) 新的 HashMap 构造函数
```java
Map<String, Integer> map = new HashMap<String, Integer>() {{
    put("one", 1);
    put("two", 2);
    put("three", 3);
}};
```

## 总结

Java 8 是 Java 语言的重要里程碑版本，它引入了函数式编程范式，极大地简化了代码编写，提高了开发效率。核心贡献包括：

- **函数式编程支持**：Lambda 表达式和 Stream API
- **增强的日期和时间 API**：更直观、更易用的时间处理
- **更灵活的接口设计**：默认方法和静态方法
- **更好的空值处理**：Optional 类减少 NullPointerException

这些特性使得 Java 语言更加现代化、易用，同时保持了向后兼容性。
