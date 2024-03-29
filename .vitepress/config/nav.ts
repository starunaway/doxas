import { DefaultTheme } from 'vitepress';

const nav: DefaultTheme.NavItem[] = [
  {
    text: '前端',
    items: [
      { text: 'React', link: '/react/read1' },
      {
        text: 'Item A',
        items: [
          { text: 'Section A Item A', link: '...' },
          { text: 'Section B Item B', link: '...' },
        ],
      },
      { text: 'Item C', link: '/item-3' },
    ],
  },

  {
    text: '算法',
    link: '/algorithm/',
  },
  {
    text: '归档',
    link: '/archive/git',
  },
];

export default nav;
