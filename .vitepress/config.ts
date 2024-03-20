import { defineConfig } from 'vitepress';
const description =
  '深入浅出的前后端技术文章，包括React、Vue、Vite、Webpack、Redux等源码分析，以及Promise实现、Next.js、NestJS、Express、Koa等技术分享。LeetCode解析';

export default defineConfig({
  // 应用级配置选项

  title: 'Doxas',
  description,
  head: [
    ['meta', { name: 'author', content: 'Doxas' }],
    ['meta', { property: 'og:url', content: 'https://doxas.dev' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Doxas' }],
    ['meta', { property: 'og:description', content: description }],
    ['meta', { name: 'generator', content: 'VitePress' }],
    [
      'meta',
      {
        name: 'keywords',
        content:
          'React, Vue, Vite, Webpack, Redux, Promise, Next.js, NestJS, Express, Koa, 前端, 后端,LeetC, 源码分析',
      },
    ],
    ['link', { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' }],
    ['link', { rel: 'icon', sizes: '32x32', href: '/favicon-32x32.png' }],
    ['link', { rel: 'icon', sizes: '16x16', href: '/favicon-16x16.png' }],
    ['link', { rel: 'icon', href: '/favicon.ico' }],
  ],

  sitemap: {
    hostname: 'https://doxas.dev/',
  },
  cleanUrls: true,
  themeConfig: {
    logo: '/apple-touch-icon.png',
    nav: [
      { text: 'Guide', link: '/guide' },
      {
        text: 'Dropdown Menu',
        items: [
          {
            text: 'Item A',
            items: [
              { text: 'Section A Item A', link: '...' },
              { text: 'Section B Item B', link: '...' },
            ],
          },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' },
        ],
      },

      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' },
        ],
      },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2', rel: 'noopener' },
          { text: 'Item C', link: '/item-3' },
        ],
      },
      {
        text: 'Dropdown Menu',
        items: [
          { text: 'Item A', link: '/item-1' },
          { text: 'Item B', link: '/item-2' },
          { text: 'Item C', link: '/item-3' },
        ],
      },
    ],
    sidebar: [
      {
        text: 'Guide',
        items: [
          { text: 'Introduction', link: '/introduction' },
          { text: 'Getting Started', link: '/getting-started' },
        ],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2019-present starunaway',
    },
    docFooter: {
      prev: '上一页',
      next: '下一页',
    },
    externalLinkIcon: true,
    search: {
      provider: 'local',
    },
  },
});
