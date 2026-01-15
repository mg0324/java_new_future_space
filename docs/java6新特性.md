# Java 6 新特性总结

Java 6（也称为 Java SE 6）是 Java 平台的一个重要版本，于 2006 年 12 月发布。与 Java 5 相比，Java 6 没有引入太多新的语言特性，而更多的是以稳定、提高性能和质量为目标。尽管如此，Java 6 仍引入了许多重要的 API 和功能增强。

## 主要新特性

### 1. 脚本语言支持（Scripting Support）
Java 6 引入了对脚本语言的支持，允许在 Java 应用程序中嵌入脚本引擎。

```java
import javax.script.ScriptEngineManager;
import javax.script.ScriptEngine;
import javax.script.ScriptException;

// 使用脚本引擎执行 JavaScript
ScriptEngineManager manager = new ScriptEngineManager();
ScriptEngine engine = manager.getEngineByName("JavaScript");
Object result = engine.eval("function hello(name) { return 'Hello, ' + name; } hello('World');");
System.out.println(result); // 输出: Hello, World
```

### 2. Compiler API
Java 6 提供了编译器 API，允许在运行时动态编译 Java 源代码。

```java
import javax.tools.ToolProvider;
import javax.tools.JavaCompiler;
import java.io.File;

// 使用编译器 API 动态编译 Java 源代码
JavaCompiler compiler = ToolProvider.getSystemJavaCompiler();
int result = compiler.run(null, null, null, "MyClass.java");
if (result == 0) {
    System.out.println("编译成功");
} else {
    System.out.println("编译失败");
}
```

### 3. 轻量级 HTTP 服务器（Lightweight HTTP Server）
Java 6 引入了内置的轻量级 HTTP 服务器 API。

```java
import com.sun.net.httpserver.HttpServer;
import com.sun.net.httpserver.HttpHandler;
import com.sun.net.httpserver.HttpExchange;
import java.io.IOException;
import java.io.OutputStream;
import java.net.InetSocketAddress;

// 创建轻量级 HTTP 服务器
HttpServer server = HttpServer.create(new InetSocketAddress(8080), 0);
server.createContext("/test", new MyHandler());
server.setExecutor(null);
server.start();

static class MyHandler implements HttpHandler {
    @Override
    public void handle(HttpExchange t) throws IOException {
        String response = "This is the response";
        t.sendResponseHeaders(200, response.length());
        OutputStream os = t.getResponseBody();
        os.write(response.getBytes());
        os.close();
    }
}
```

### 4. Common Annotations（JSR 250）
Java 6 引入了对通用注解的支持，包括 @PostConstruct、@PreDestroy、@Resource 等。

```java
import javax.annotation.PostConstruct;
import javax.annotation.PreDestroy;
import javax.annotation.Resource;

public class MyService {
    @Resource
    private DataSource dataSource;
    
    @PostConstruct
    public void init() {
        // 初始化代码
        System.out.println("初始化完成");
    }
    
    @PreDestroy
    public void cleanup() {
        // 清理代码
        System.out.println("清理完成");
    }
}
```

### 5. JDBC 4.0
Java 6 引入了 JDBC 4.0，带来了多项改进：

- 自动驱动程序加载
- RowId 支持
- SQL/XML 支持
- 大对象（LOB）改进

```java
// JDBC 4.0 自动加载驱动程序
Connection conn = DriverManager.getConnection(
    "jdbc:mysql://localhost:3306/test", "user", "password");

// 使用 RowId
PreparedStatement pstmt = conn.prepareStatement(
    "INSERT INTO table VALUES (?, ?)");
RowId rowId = pstmt.executeReturningGeneratedKeys().getRowId(1);
```

### 6. JAXB 2.0（Java Architecture for XML Binding）
JAXB 2.0 提供了更好的 XML 和 Java 对象之间的映射功能。

```java
import javax.xml.bind.annotation.XmlRootElement;

@XmlRootElement
public class Person {
    private String name;
    private int age;
    
    // getters and setters
}
```

### 7. StAX（Streaming API for XML）
StAX 提供了流式 XML 处理 API，允许对 XML 文档进行逐事件的解析和生成。

```java
import javax.xml.stream.XMLInputFactory;
import javax.xml.stream.XMLStreamReader;
import java.io.FileReader;

// 使用 StAX 解析 XML
XMLInputFactory factory = XMLInputFactory.newInstance();
XMLStreamReader reader = factory.createXMLStreamReader(
    new FileReader("data.xml"));

while (reader.hasNext()) {
    int event = reader.next();
    if (event == XMLStreamReader.CHARACTERS) {
        System.out.println(reader.getText());
    }
}
```

### 8. Console 类
Java 6 引入了 Console 类，提供了与控制台交互的更好支持。

```java
import java.io.Console;

// 使用 Console 读取密码
Console console = System.console();
if (console != null) {
    char[] password = console.readPassword("Enter password: ");
    String userInput = console.readLine("Enter username: ");
}
```

### 9. Web Services Metadata（JSR 181）
Java 6 引入了 Web 服务元数据支持，简化了 Web 服务的开发。

```java
import javax.jws.WebService;
import javax.jws.WebMethod;

@WebService
public class Calculator {
    @WebMethod
    public int add(int a, int b) {
        return a + b;
    }
}
```

### 10. Java DB (Apache Derby)
Java 6 集成了 Apache Derby 作为内置的纯 Java 数据库。

## 性能和质量改进

### 1. 性能提升
Java 6 在服务器端和客户端版本都有了两位数百分比的提高，根据不同领域，性能提高了 20%-40%。

### 2. 更高的质量
- 兼容性测试包含超过 100,000 个测试程序
- 首个在社区模式下开放开发的 Java 版本
- 更高的稳定性和可靠性

### 3. 安全功能增强
Java 6 包含了一系列新的安全相关的增强功能。

## GUI 增强

Java 6 对 Swing 和 AWT 进行了多项改进，包括更好的外观和感觉支持、性能优化等。

## 总结

Java 6 虽然不像 Java 5 那样引入了大量新的语言特性，但仍然带来了许多重要的 API 增强和功能改进。它重点关注性能提升、稳定性改进和安全性增强，为后续版本的发展奠定了基础。

Java 6 的发布标志着 Java 平台在企业级应用开发方面更加成熟，特别是在 Web 服务、数据库连接、脚本语言集成等方面提供了更好的支持。这些改进使得 Java 6 成为了当时企业级开发的重要平台。