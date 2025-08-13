import {themes as prismThemes} from 'prism-react-renderer';
import type {Config} from '@docusaurus/types';
import type * as Preset from '@docusaurus/preset-classic';

// This runs in Node.js - Don't use client-side code here (browser APIs, JSX...)

const config: Config = {
  title: 'BNBDEVELOPMENT Dokumentáció',
  tagline: 'BNBDEVELOPMENT által fejlesztett összes API és SDK dokumentációja.',
  favicon: 'img/favicon.ico',

  // Future flags, see https://docusaurus.io/docs/api/docusaurus-config#future
  future: {
    v4: true, // Improve compatibility with the upcoming Docusaurus v4
  },

  // Set the production url of your site here
  url: 'https://docs.bnbdevelopment.com',
  // Set the /<baseUrl>/ pathname under which your site is served
  // For GitHub pages deployment, it is often '/<projectName>/'
  baseUrl: '/',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'bnbdevelopment', // Usually your GitHub org/user name.
  projectName: 'documentation', // Usually your repo name.

  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',

  // Even if you don't use internationalization, you can use this field to set
  // useful metadata like html lang. For example, if your site is Chinese, you
  // may want to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  
  markdown: {
    mermaid: true,
  },
  themes: ['@docusaurus/theme-mermaid'],

  presets: [
    [
      'classic',
      {
        docs: {
          sidebarPath: './sidebars.ts',
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bnbdevelopment',
        },
        blog: {
          showReadingTime: true,
          feedOptions: {
            type: ['rss', 'atom'],
            xslt: true,
          },
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/bnbdevelopment/',
          // Useful options to enforce blogging best practices
          onInlineTags: 'warn',
          onInlineAuthors: 'warn',
          onUntruncatedBlogPosts: 'warn',
        },
        theme: {
          customCss: './src/css/custom.css',
        },
      } satisfies Preset.Options,
    ],
  ],

  themeConfig: {
    // Replace with your project's social card
    image: 'img/docusaurus-social-card.jpg',
    
    mermaid: {
      theme: {light: 'neutral', dark: 'dark'},
    },
    
    navbar: {
      title: 'Dokumentáció',
      logo: {
        alt: 'BNBDEVELOPMENT Logo',
        src: 'img/bnb-1x.png',
      },
      items: [
        // {
        //   type: 'docSidebar',
        //   sidebarId: 'tutorialSidebar',
        //   position: 'left',
        //   label: 'Tutorial',
        // },
        {
          type: 'docSidebar',
          sidebarId: 'irodalomerettsegiSidebar',
          position: 'left',
          label: 'IrodalomErettsegi API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'infoAcademySidebar',
          position: 'left',
          label: 'InfoAcademy API',
        },
        {
          type: 'docSidebar',
          sidebarId: 'simpleMailerSidebar',
          position: 'left',
          label: 'SimpleMailer',
        },
        {
          type: 'docSidebar',
          sidebarId: 'bnbInfraSidebar',
          position: 'left',
          label: 'Infrastructure',
        },
        // {to: '/blog', label: 'Blog', position: 'left'},
        {
          href: 'https://github.com/bnbdevelopment',
          label: 'GitHub',
          position: 'right',
        },
      ],
    },
    footer: {
      style: 'dark',
      links: [
        {
          title: 'Dokumentáció',
          items: [
            {
              label: 'Irodalomerettsegi API Dokumentáció',
              to: '/docs/irodalomerettsegi/hello',
            },
          ],
        },
        // {
        //   title: 'Community',
        //   items: [
        //     {
        //       label: 'Stack Overflow',
        //       href: 'https://stackoverflow.com/questions/tagged/docusaurus',
        //     },
        //     {
        //       label: 'Discord',
        //       href: 'https://discordapp.com/invite/docusaurus',
        //     },
        //     {
        //       label: 'X',
        //       href: 'https://x.com/docusaurus',
        //     },
        //   ],
        // },
        {
          title: 'Rólunk',
          items: [
            {
              label: 'Weboldal',
              href: 'https://bnbdevelopment.hu',
            },
            {
              label: 'GitHub',
              href: 'https://github.com/bnbdevelopment',
            },
          ],
        },
      ],
      copyright: `Copyright © ${new Date().getFullYear()} BNBDEVELOPMENT. Built with Docusaurus.`,
    },
    prism: {
      theme: prismThemes.github,
      darkTheme: prismThemes.dracula,
    },
  } satisfies Preset.ThemeConfig,
};

export default config;
