import { defineConfig } from 'vitepress'

export default defineConfig({
  title: 'i18n-sharpen',
  description: 'AST-based static analysis for i18n — finds missing keys, unused keys, dynamic patterns, and hardcoded strings across TS, JS, Vue, Svelte, and Astro.',
  cleanUrls: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/icon.svg' }]
  ],
  themeConfig: {
    logo: {
      light: '/logo-light.svg',
      dark: '/logo-dark.svg',
      alt: 'i18n-sharpen'
    },
    siteTitle: false,
    nav: [
      { text: 'Guide', link: '/guide/getting-started' },
      { text: 'CLI', link: '/guide/cli' },
      { text: 'Config', link: '/guide/configuration' },
      { text: 'GitHub', link: 'https://github.com/Schalkez/i18n-sharpen' }
    ],
    sidebar: [
      {
        text: 'Introduction',
        items: [
          { text: 'Getting Started', link: '/guide/getting-started' },
          { text: 'Why i18n-sharpen?', link: '/guide/why' }
        ]
      },
      {
        text: 'Core Concepts',
        items: [
          { text: 'Configuration', link: '/guide/configuration' },
          { text: 'Supported Formats', link: '/guide/formats' },
          { text: 'Locale Layouts', link: '/guide/layouts' }
        ]
      },
      {
        text: 'Command Line',
        items: [
          { text: 'CLI Reference', link: '/guide/cli' }
        ]
      },
      {
        text: 'APIs',
        items: [
          { text: 'Programmatic API', link: '/guide/api' }
        ]
      }
    ],
    socialLinks: [
      { icon: 'github', link: 'https://github.com/Schalkez/i18n-sharpen' }
    ],
    footer: {
      message: 'Released under the MIT License.',
      copyright: 'Copyright © 2026-present Schalkez'
    }
  }
})
