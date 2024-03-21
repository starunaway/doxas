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
    text: 'Dropdown Menu',
    items: [
      { text: 'Item A', link: '/item-1' },
      { text: 'Item B', link: '/item-2', rel: 'noopener' },
      { text: 'Item C', link: '/item-3' },
    ],
  },
  {
    text: '归档',
    link: '/archive/git',
  },
];

export default nav;
