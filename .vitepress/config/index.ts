import { defineConfig } from 'vitepress';
import head, { description } from './head';

import nav from './nav';
import sidebar from './sidebar';

export default defineConfig({
  // 应用级配置选项

  title: 'Doxas',
  description,
  head,
  sitemap: {
    hostname: 'https://doxas.dev/',
  },
  cleanUrls: true,
  themeConfig: {
    logo: '/apple-touch-icon.png',
    nav,
    sidebar,
    socialLinks: [{ icon: 'github', link: 'https://github.com/starunaway/doxas' }],
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
