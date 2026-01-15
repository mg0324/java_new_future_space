# Java 5 新特性总结

Java 5（也称为 JDK 1.5 或 J2SE 5.0）是 Java 发展历程中一个革命性的版本，于 2004 年发布。与先前的大多数 Java 升级不同，该版本有很多重要的改进，从根本上扩展了 Java 语言的应用领域、功能和范围。Java 5 引入了大量重要的语言特性和 API，是 Java 发展史上的一个重要里程碑。

## 主要新特性

### 1. 泛型（Generics）
Java 5 引入了泛型机制，允许开发者在编译时检查类型安全，从而避免了运行时的 ClassCastException。

```java
// 使用泛型前
List list = new ArrayList();
list.add("hello");
String str = (String) list.get(0); // 需要强制类型转换

// 使用泛型后
List<String> list = new ArrayList<String>();
list.add("hello");
String str = list.get(0); // 不需要强制类型转换，类型安全
```

### 2. 枚举类型（Enums）
Java 5 引入了枚举类型，允许开发者定义一组固定的常量。

```java
public enum Color {
    RED, GREEN, BLUE;
}

// 使用枚举
Color color = Color.RED;
switch (color) {
    case RED:
        System.out.println("红色");
        break;
    case GREEN:
        System.out.println("绿色");
        break;
    case BLUE:
        System.out.println("蓝色");
        break;
}
```

### 3. 自动装箱/拆箱（Autoboxing/Unboxing）
Java 5 引入了自动装箱和自动拆箱机制，允许开发者在基本类型和对象类型之间进行自动转换。

```java
// 自动装箱
List<Integer> list = new ArrayList<Integer>();
list.add(5); // 自动将 int 转换为 Integer

// 自动拆箱
int i = list.get(0); // 自动将 Integer 转换为 int
```

### 4. 注解（Annotations）
Java 5 引入了注解机制，提供了一种形式化的方法来为代码添加元数据。

```java
@Override
public String toString() {
    return "MyClass";
}

@SuppressWarnings("deprecation")
public void deprecatedMethod() {
    // 使用被废弃的方法
}
```

### 5. 增强的 for 循环（Enhanced for Loop）
Java 5 引入了 foreach 循环，允许开发者使用简洁的语法来遍历集合。

```java
// 遍历数组
int[] array = {1, 2, 3, 4, 5};
for (int i : array) {
    System.out.println(i);
}

// 遍历集合
List<String> list = Arrays.asList("a", "b", "c");
for (String item : list) {
    System.out.println(item);
}
```

### 6. 可变参数（Varargs）
Java 5 引入了可变参数机制，允许方法接受可变数量的参数。

```java
public static void printNumbers(String format, int... numbers) {
    for (int num : numbers) {
        System.out.printf(format, num);
    }
}

// 调用方法
printNumbers("%d ", 1, 2, 3, 4, 5);
```

### 7. 静态导入（Static Import）
Java 5 引入了静态导入机制，允许开发者直接使用静态成员，而不需要使用类名。

```java
import static java.lang.Math.PI;
import static java.lang.Math.max;

public class Example {
    public static void main(String[] args) {
        double area = PI * 5 * 5; // 直接使用 PI
        int maxVal = max(10, 20); // 直接使用 max 方法
    }
}
```

### 8. 协变返回类型（Covariant Return Types）
Java 5 允许在子类的覆盖方法中返回父类被覆盖方法的子类型。

```java
class Animal {}
class Dog extends Animal {}

class AnimalFactory {
    public Animal createAnimal() {
        return new Animal();
    }
}

class DogFactory extends AnimalFactory {
    @Override
    public Dog createAnimal() { // 协变返回类型
        return new Dog();
    }
}
```

## API 增强

### 1. 并发工具类（Concurrency Utilities）
Java 5 引入了 java.util.concurrent 包，提供了丰富的并发编程工具。

```java
import java.util.concurrent.*;

// 使用线程池
ExecutorService executor = Executors.newFixedThreadPool(10);
Future<String> future = executor.submit(() -> "Hello World");
String result = future.get(); // 获取结果

// 使用 Callable 和 Future
Callable<Integer> task = () -> {
    // 执行一些计算
    return 42;
};
Future<Integer> futureResult = executor.submit(task);
```

### 2. Scanner 类
Java 5 引入了 Scanner 类，提供了更方便的输入解析功能。

```java
import java.util.Scanner;

Scanner scanner = new Scanner(System.in);
String input = scanner.nextLine();
int number = scanner.nextInt();
```

### 3. StringBuilder 类
虽然 StringBuffer 早已存在，但 Java 5 引入了 StringBuilder，提供了非线程安全但性能更好的字符串拼接。

```java
StringBuilder sb = new StringBuilder();
sb.append("Hello");
sb.append(" ");
sb.append("World");
String result = sb.toString();
```

### 4. 格式化功能
Java 5 增强了字符串格式化功能，引入了 printf 风格的格式化。

```java
String formatted = String.format("Name: %s, Age: %d", "John", 25);
System.out.printf("Total: %.2f%n", 123.456);
```

### 5. 枚举的增强功能
枚举类提供了额外的方法，如 values() 和 valueOf()。

```java
Color[] colors = Color.values(); // 获取所有枚举值
Color red = Color.valueOf("RED"); // 从字符串获取枚举值
```

## 虚拟机改进

### 1. 自动装箱/拆箱的性能优化
Java 5 对自动装箱/拆箱进行了性能优化。

### 2. 更好的垃圾收集
改进了垃圾收集算法，提高了性能。

### 3. Tiger 编译器优化
引入了新的编译器优化技术。

## 总结

Java 5 是 Java 发展史上的一个重要里程碑，引入了大量重要的语言特性和 API。这些新特性包括泛型、枚举、注解、自动装箱/拆箱、增强的 for 循环、可变参数、静态导入等，极大地提高了 Java 代码的类型安全性、可读性和可维护性。

Java 5 的并发工具包（java.util.concurrent）为多线程编程提供了更强大和易用的工具，使并发编程变得更加安全和高效。这些改进奠定了现代 Java 开发的基础，影响了后续所有 Java 版本的发展方向。

Java 5 的发布标志着 Java 语言从简单面向对象语言向更成熟、更强大的编程平台的转变，为 Java 在企业级应用开发中的广泛应用奠定了坚实基础。