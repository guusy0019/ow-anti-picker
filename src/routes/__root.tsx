import { TanStackDevtools } from '@tanstack/react-devtools';
import { ReactQueryDevtoolsPanel } from '@tanstack/react-query-devtools';
import { createRootRoute, HeadContent, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtoolsPanel } from '@tanstack/react-router-devtools';

import { Layout } from '@/lib/layout';
import { publicUrl } from '@/lib/utils/public-url';

const title = 'OW アンチピック';
const description =
  '相手ヒーローを選んでアンチピック候補と理由を確認できる Overwatch 2 用ツール。';

/** OGP / Twitter 用。`public/logo.png`（1024×1024）の説明 */
const ogImageAlt =
  'Abstract circular logo in metallic rose gold featuring a stylized mountain peak and orbiting celestial accents on a white background.';

const TRAILING_SLASH = /\/$/;

function getAbsoluteSiteUrl(): string {
  if (typeof globalThis.window === 'undefined') {
    return '';
  }
  return new URL(publicUrl(''), globalThis.window.location.origin).href.replace(
    TRAILING_SLASH,
    ''
  );
}

function getOgImageUrl(): string {
  if (typeof globalThis.window === 'undefined') {
    return '';
  }
  return new URL(publicUrl('logo.png'), globalThis.window.location.origin).href;
}

export const Route = createRootRoute({
  head: () => {
    const siteUrl = getAbsoluteSiteUrl();
    const ogImgUrl = getOgImageUrl();
    return {
      meta: [
        {
          title,
        },
        {
          name: 'description',
          content: description,
        },
        {
          name: 'viewport',
          content: 'width=device-width, initial-scale=1.0',
        },
        {
          name: 'application-name',
          content: title,
        },
        {
          name: 'apple-mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'apple-mobile-web-app-status-bar-style',
          content: 'default',
        },
        {
          name: 'apple-mobile-web-app-title',
          content: title,
        },
        {
          name: 'format-detection',
          content: 'telephone=no',
        },
        {
          name: 'mobile-web-app-capable',
          content: 'yes',
        },
        {
          name: 'theme-color',
          content: '#c9a087',
        },
        {
          property: 'og:type',
          content: 'website',
        },
        ...(siteUrl
          ? [
              {
                property: 'og:url',
                content: siteUrl,
              } as const,
            ]
          : []),
        {
          property: 'og:title',
          content: title,
        },
        {
          property: 'og:description',
          content: description,
        },
        {
          property: 'og:locale',
          content: 'ja_JP',
        },
        ...(ogImgUrl
          ? [
              {
                property: 'og:image',
                content: ogImgUrl,
              } as const,
              {
                property: 'og:image:width',
                content: '1024',
              } as const,
              {
                property: 'og:image:height',
                content: '1024',
              } as const,
              {
                property: 'og:image:alt',
                content: ogImageAlt,
              } as const,
            ]
          : []),
        {
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        ...(siteUrl
          ? [
              {
                name: 'twitter:url',
                content: siteUrl,
              } as const,
            ]
          : []),
        {
          name: 'twitter:title',
          content: title,
        },
        {
          name: 'twitter:description',
          content: description,
        },
        ...(ogImgUrl
          ? [
              {
                name: 'twitter:image',
                content: ogImgUrl,
              } as const,
              {
                name: 'twitter:image:alt',
                content: ogImageAlt,
              } as const,
            ]
          : []),
      ],
      links: [
        {
          rel: 'icon',
          href: publicUrl('logo.png'),
          type: 'image/png',
        },
        {
          rel: 'apple-touch-icon',
          href: publicUrl('logo.png'),
        },
        {
          rel: 'manifest',
          href: publicUrl('manifest.webmanifest'),
        },
      ],
    };
  },
  component: () => (
    <>
      <HeadContent />
      <Layout>
        <Outlet />
      </Layout>
      <TanStackDevtools
        plugins={[
          {
            name: 'TanStack Router',
            render: <TanStackRouterDevtoolsPanel />,
          },
          {
            name: 'TanStack Query',
            render: <ReactQueryDevtoolsPanel />,
          },
        ]}
      />
    </>
  ),
});
