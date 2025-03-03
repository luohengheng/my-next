/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      // {
      //   protocol: 'https',
      //   hostname: 'www.imooc.com',
      //   pathname: '/static/**',
      // }
    ],
  },
  pageExtensions: ['ts', 'tsx', 'js', 'jsx', 'md', 'mdx'],
};

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
});

const removeImports = require('next-remove-imports')();

module.exports = removeImports(withMDX(nextConfig));

