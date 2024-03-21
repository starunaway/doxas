import { HeadConfig } from 'vitepress';

export const description =
  '深入浅出的前后端技术文章，包括React、Vue、Vite、Webpack、Redux等源码分析，以及Promise实现、Next.js、NestJS、Express、Koa等技术分享。LeetCode解析';

const head: HeadConfig[] = [
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
];

export default head;
