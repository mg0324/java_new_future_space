pandoc ^
  -s ^
  --toc ^
  --toc-depth=3 ^
  -V toc-title="目录" ^
  java5新特性.md java6新特性.md java7新特性.md java8新特性.md java9新特性.md java10新特性.md java11新特性.md java12新特性.md java13新特性.md java14新特性.md java15新特性.md java16新特性.md java17新特性.md java18新特性.md java19新特性.md java20新特性.md java21新特性.md jpackage详解.md ^
  --pdf-engine=xelatex ^
  -V mainfont="Microsoft YaHei" ^
  -V CJKmainfont="Microsoft YaHei" ^
  -o "Java新特性完整版.pdf"