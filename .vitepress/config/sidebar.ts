import { DefaultTheme } from 'vitepress';

const sidebar: DefaultTheme.Sidebar = {
  '/archive/': {
    base: '/archive/',
    items: [
      {
        text: 'Git',
        collapsed: false,
        items: [{ text: 'Git 配置', link: '/git' }],
      },
      {
        text: '网络',
        collapsed: false,
        items: [{ text: 'Cors', link: '/cors' }],
      },
    ],
  },

  '/algorithm/': {
    base: '/algorithm/',
    items: [
      {
        text: 'LRU',
        link: 'lru',
      },
    ],
  },
};

export default sidebar;
