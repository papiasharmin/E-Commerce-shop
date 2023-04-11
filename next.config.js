/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    mongodb_user: 'XXXXXXXXX',
    mongodb_pass: 'XXXXXXXXXXX',
    mongodb_cluster: 'XXXXXXXX',
    NEXTAUTH_URL:'XXXXXXXX',
    NEXTAUTH_SECRET: 'XXXXXXXXXX',

  },
  images: {
    domains: ['img.ltwebstatic.com','m.media-amazon.com',"localhost"],
  },
}

module.exports = nextConfig




