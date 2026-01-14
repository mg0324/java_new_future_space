# Java 8 新特性总结

Java 8 是一个划时代的版本，引入了许多革命性的特性，改变了Java开发的方式。本文档总结了Java 8的主要新特性。

## 1. Lambda 表达式

Lambda表达式是Java 8最重要的特性，提供了一种简洁的函数式编程方式。

### 语法
```java
(parameters) -> { body }
```

### 示例
```java
// 传统方式
Comparator<Integer> comp = new Comparator<Integer>() {
    @Override
    public int compare(Integer o1, Integer o2) {
        return o1.compareTo(o2);
    }
};

// Lambda表达式
Comparator<Integer> comp = (o1, o2) -> o1.compareTo(o2);

// 排序列表
List<Integer> numbers = Arrays.asList(3, 1, 4, 1, 5);
numbers.sort((a, b) -> a.compareTo(b));
```

### 优点
- 代码简洁，可读性强
- 减少匿名内部类的冗余
- 支持函数式编程风格

## 2. 函数式接口（Functional Interfaces）

函数式接口是只有一个抽象方法的接口，Lambda表达式可以实现函数式接口。

### 核心函数式接口

#### Function<T, R>
```java
Function<String, Integer> strLength = str -> str.length();
System.out.println(strLength.apply("hello")); // 5
```

#### Predicate<T>
```java
Predicate<String> isEmpty = str -> str.isEmpty();
System.out.println(isEmpty.test("")); // true
```

#### Consumer<T>
```java
Consumer<String> print = str -> System.out.println(str);
print.accept("Hello");
```

#### Supplier<T>
```java
Supplier<String> supplier = () -> "Hello";
System.out.println(supplier.get());
```

#### BiFunction<T, U, R>
```java
BiFunction<Integer, Integer, Integer> add = (a, b) -> a + b;
System.out.println(add.apply(5, 3)); // 8
```

## 3. Stream API

Stream API 提供了一种函数式的、链式的数据处理方式。

### 基本操作

#### 创建Stream
```java
List<String> list = Arrays.asList("a", "b", "c");
Stream<String> stream = list.stream();

// 并行流
Stream<String> parallelStream = list.parallelStream();

// 从数组创建
Stream<String> stream2 = Arrays.stream(new String[]{"a", "b"});
```

#### 中间操作（Intermediate Operations）

**filter** - 过滤
```java
list.stream()
    .filter(s -> s.length() > 1)
    .forEach(System.out::println);
```

**map** - 映射
```java
list.stream()
    .map(String::toUpperCase)
    .forEach(System.out::println);
```

**flatMap** - 扁平化映射
```java
List<List<String>> lists = Arrays.asList(
    Arrays.asList("a", "b"),
    Arrays.asList("c", "d")
);
lists.stream()
    .flatMap(Collection::stream)
    .forEach(System.out::println); // a, b, c, d
```

**sorted** - 排序
```java
list.stream()
    .sorted()
    .forEach(System.out::println);

list.stream()
    .sorted((s1, s2) -> s2.compareTo(s1)) // 降序
    .forEach(System.out::println);
```

**distinct** - 去重
```java
Arrays.asList(1, 2, 2, 3, 3, 3).stream()
    .distinct()
    .forEach(System.out::println); // 1, 2, 3
```

**limit** - 限制数量
```java
list.stream()
    .limit(2)
    .forEach(System.out::println);
```

**skip** - 跳过数量
```java
list.stream()
    .skip(1)
    .forEach(System.out::println);
```

#### 终端操作（Terminal Operations）

**forEach** - 遍历
```java
list.stream().forEach(System.out::println);
```

**collect** - 收集
```java
List<String> result = list.stream()
    .filter(s -> s.length() > 0)
    .collect(Collectors.toList());

// 转为Set
Set<String> set = list.stream()
    .collect(Collectors.toSet());

// 转为String，用逗号分隔
String str = list.stream()
    .collect(Collectors.joining(","));
```

**reduce** - 归约
```java
int sum = Arrays.asList(1, 2, 3, 4).stream()
    .reduce(0, (a, b) -> a + b);

Optional<Integer> sum2 = Arrays.asList(1, 2, 3).stream()
    .reduce((a, b) -> a + b);
```

**match** - 匹配
```java
// 全部匹配
boolean allMatch = list.stream().allMatch(s -> s.length() > 0);

// 任意匹配
boolean anyMatch = list.stream().anyMatch(s -> s.length() > 1);

// 都不匹配
boolean noneMatch = list.stream().noneMatch(s -> s.length() > 10);
```

**find** - 查找
```java
Optional<String> first = list.stream().findFirst();
Optional<String> any = list.stream().findAny();
```

**count** - 计数
```java
long count = list.stream().count();
```

**min/max** - 最小/最大值
```java
Optional<String> max = list.stream()
    .max(String::compareTo);
```

## 4. 方法引用（Method References）

方法引用是Lambda表达式的简化形式。

### 四种类型

#### 1. 静态方法引用
```java
// Lambda表达式
Function<String, Integer> func = str -> Integer.parseInt(str);

// 方法引用
Function<String, Integer> func2 = Integer::parseInt;
```

#### 2. 实例方法引用
```java
String str = "hello";

// Lambda表达式
Function<String, Boolean> func = s -> str.contains(s);

// 方法引用
Function<String, Boolean> func2 = str::contains;
```

#### 3. 任意对象的实例方法引用
```java
// Lambda表达式
Function<String, Integer> func = str -> str.length();

// 方法引用
Function<String, Integer> func2 = String::length;
```

#### 4. 构造器引用
```java
// Lambda表达式
Supplier<List> supplier = () -> new ArrayList();

// 方法引用
Supplier<List> supplier2 = ArrayList::new;
```

## 5. Optional 类

Optional 用于优雅地处理null值。

### 基本使用
```java
// 创建Optional
Optional<String> opt1 = Optional.of("hello");
Optional<String> opt2 = Optional.ofNullable(null);
Optional<String> opt3 = Optional.empty();

// 检查值是否存在
if (opt1.isPresent()) {
    System.out.println(opt1.get());
}

// 使用ifPresent
opt1.ifPresent(System.out::println);

// 使用ifPresentOrElse (Java 9)
opt1.ifPresentOrElse(
    System.out::println,
    () -> System.out.println("Value not present")
);
```

### 操作Optional
```java
// map - 转换值
Optional<Integer> length = Optional.of("hello")
    .map(String::length);

// flatMap - 扁平化映射
Optional<String> opt = Optional.of("hello")
    .flatMap(str -> Optional.of(str.toUpperCase()));

// filter - 过滤
Optional<String> opt2 = Optional.of("hello")
    .filter(str -> str.length() > 3);

// orElse - 提供默认值
String result = Optional.ofNullable(null)
    .orElse("default");

// orElseGet - 延迟获取默认值
String result2 = Optional.ofNullable(null)
    .orElseGet(() -> "default");

// orElseThrow - 不存在时抛出异常
String result3 = Optional.ofNullable(null)
    .orElseThrow(NullPointerException::new);
```

## 6. 日期和时间API（java.time）

Java 8 引入了全新的日期和时间API，解决了旧版Date和Calendar的问题。

### 主要类

#### LocalDate - 日期（不含时间）
```java
// 获取当前日期
LocalDate today = LocalDate.now();

// 指定日期
LocalDate date = LocalDate.of(2023, 12, 25);

// 解析字符串
LocalDate date2 = LocalDate.parse("2023-12-25");

// 日期操作
LocalDate tomorrow = today.plusDays(1);
LocalDate nextMonth = today.plusMonths(1);
LocalDate nextYear = today.plusYears(1);

// 获取信息
int day = today.getDayOfMonth();
int month = today.getMonthValue();
int year = today.getYear();
```

#### LocalTime - 时间（不含日期）
```java
// 获取当前时间
LocalTime now = LocalTime.now();

// 指定时间
LocalTime time = LocalTime.of(15, 30, 0);

// 解析字符串
LocalTime time2 = LocalTime.parse("15:30:00");

// 时间操作
LocalTime later = now.plusHours(2);
```

#### LocalDateTime - 日期和时间
```java
// 获取当前日期时间
LocalDateTime now = LocalDateTime.now();

// 指定日期时间
LocalDateTime dateTime = LocalDateTime.of(2023, 12, 25, 15, 30);

// 解析字符串
LocalDateTime dateTime2 = LocalDateTime.parse("2023-12-25T15:30:00");

// 转换
LocalDate date = dateTime.toLocalDate();
LocalTime time = dateTime.toLocalTime();
```

#### ZonedDateTime - 带时区的日期时间
```java
// 获取当前日期时间（带时区）
ZonedDateTime now = ZonedDateTime.now();

// 指定时区
ZonedDateTime now2 = ZonedDateTime.now(ZoneId.of("Asia/Shanghai"));

// 时区转换
ZonedDateTime tokyo = now.withZoneSameInstant(ZoneId.of("Asia/Tokyo"));
```

#### Duration - 时间段
```java
// 创建Duration
Duration d1 = Duration.ofHours(2);
Duration d2 = Duration.ofMinutes(30);
Duration d3 = Duration.between(time1, time2);

// Duration操作
long hours = d1.toHours();
long minutes = d1.toMinutes();
```

#### Period - 日期段
```java
// 创建Period
Period p1 = Period.ofDays(10);
Period p2 = Period.ofMonths(3);
Period p3 = Period.between(date1, date2);

// Period操作
int days = p1.getDays();
```

#### DateTimeFormatter - 日期时间格式化
```java
// 预定义格式
DateTimeFormatter formatter = DateTimeFormatter.ISO_LOCAL_DATE;

// 自定义格式
DateTimeFormatter formatter2 = DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss");

// 格式化
String str = now.format(formatter2); // 2023-12-25 15:30:00

// 解析
LocalDateTime dateTime = LocalDateTime.parse("2023-12-25 15:30:00", formatter2);
```

## 7. 接口的默认方法和静态方法

Java 8 允许在接口中定义默认方法和静态方法。

### 默认方法
```java
interface Animal {
    void eat();
    
    // 默认方法
    default void sleep() {
        System.out.println("Animal is sleeping");
    }
}

class Dog implements Animal {
    @Override
    public void eat() {
        System.out.println("Dog is eating");
    }
    
    // 可以选择重写或继承默认方法
}
```

### 静态方法
```java
interface Animal {
    static void staticMethod() {
        System.out.println("Static method");
    }
}

// 调用静态方法
Animal.staticMethod();
```

## 8. 注解的改进

### @FunctionalInterface
```java
@FunctionalInterface
public interface MyInterface {
    void doSomething();
}
```

### 可重复注解
```java
@Repeatable(Tags.class)
public @interface Tag {
    String value();
}

@interface Tags {
    Tag[] value();
}

// 使用
@Tag("tag1")
@Tag("tag2")
public class MyClass {}
```

### 类型注解
```java
// 在类型上使用注解
List<@NotNull String> list = new ArrayList<>();
```

## 9. 并行流（Parallel Streams）

Stream API 支持并行处理，充分利用多核处理器。

```java
// 创建并行流
List<Integer> numbers = Arrays.asList(1, 2, 3, 4, 5);
numbers.parallelStream()
    .filter(n -> n > 2)
    .forEach(System.out::println);

// 使用parallel()
numbers.stream()
    .parallel()
    .map(n -> n * n)
    .forEach(System.out::println);

// 收集结果
List<Integer> result = numbers.parallelStream()
    .filter(n -> n > 2)
    .collect(Collectors.toList());
```

### 注意事项
- 并行流不一定比顺序流快
- 对于小数据集，并行流可能更慢
- 适合大数据集和计算密集型操作
- 避免在并行流中修改外部变量

## 10. 其他改进

### Base64编码和解码
```java
// 编码
String encoded = Base64.getEncoder().encodeToString("hello".getBytes());

// 解码
byte[] decoded = Base64.getDecoder().decode(encoded);
```

### 集合增强
```java
// forEach方法
map.forEach((key, value) -> System.out.println(key + ":" + value));

// removeIf方法
list.removeIf(n -> n > 5);

// replaceAll方法
list.replaceAll(n -> n * 2);

// sort方法
list.sort((a, b) -> a.compareTo(b));

// getOrDefault方法
map.getOrDefault("key", "default");
```

### 构造函数引用（编译器改进）
```java
Supplier<List> supplier = ArrayList::new;
Function<Integer, List> func = ArrayList::new;
```

## 总结

Java 8 引入的特性彻底改变了Java的编程方式：

1. **Lambda表达式** - 提供简洁的函数式编程支持
2. **Stream API** - 优雅的数据处理方式
3. **函数式接口** - 支持函数式编程范式
4. **Optional** - 优雅处理null值
5. **新的日期时间API** - 更好的日期时间处理
6. **接口默认方法** - 增强的接口能力
7. **方法引用** - 更简洁的函数式表达

这些特性使得Java代码更加简洁、易读，并且能够充分利用多核处理器的优势。Java 8 是现代Java开发的基石，掌握这些特性对Java开发者来说至关重要。
