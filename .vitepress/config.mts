import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Java新特性学习空间",
  description: "Java版本新特性完整指南，从Java 5到Java 21",
  // GitHub Pages 部署配置
  base: './',
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: 'Java新特性', link: '/java5新特性' }
    ],

    sidebar: [
      {
        text: 'Java版本新特性',
        items: [
          { text: 'Java 5 新特性', link: '/java5新特性' },
          { text: 'Java 6 新特性', link: '/java6新特性' },
          { text: 'Java 7 新特性', link: '/java7新特性' },
          { text: 'Java 8 新特性', link: '/java8新特性' },
          { text: 'Java 9 新特性', link: '/java9新特性' },
          { text: 'Java 10 新特性', link: '/java10新特性' },
          { text: 'Java 11 新特性', link: '/java11新特性' },
          { text: 'Java 12 新特性', link: '/java12新特性' },
          { text: 'Java 13 新特性', link: '/java13新特性' },
          { text: 'Java 14 新特性', link: '/java14新特性' },
          { text: 'Java 15 新特性', link: '/java15新特性' },
          { text: 'Java 16 新特性', link: '/java16新特性' },
          { text: 'Java 17 新特性', link: '/java17新特性' },
          { text: 'Java 18 新特性', link: '/java18新特性' },
          { text: 'Java 19 新特性', link: '/java19新特性' },
          { text: 'Java 20 新特性', link: '/java20新特性' },
          { text: 'Java 21 新特性', link: '/java21新特性' },
          { text: 'jpackage 详解', link: '/jpackage详解' }
        ]
      }
    ],

    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ],

    footer: {
      message: 'Java新特性学习空间',
      copyright: 'Copyright © 2024'
    }
  }
})
