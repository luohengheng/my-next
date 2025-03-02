/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // remotePatterns: [
    //   {
    //     protocol: 'http',
    //     hostname: 'baijiahao.baidu.com',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 't11.baidu.com',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 't12.baidu.com',
    //     pathname: '/**',
    //   },
    //   {
    //     protocol: 'http',
    //     hostname: 't10.baidu.com',
    //     pathname: '/**',
    //   },
    // ],
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

