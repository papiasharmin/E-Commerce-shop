/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env:{
    mongodb_user: 'papiasharmin',
    mongodb_pass: '7MfyyvryELf5HxiY',
    mongodb_cluster: 'cluster0',
    NEXTAUTH_URL:'http://localhost:3000',
    NEXTAUTH_SECRET: 'papiasharim25121991',

  },
  images: {
    domains: ['img.ltwebstatic.com','m.media-amazon.com',"localhost"],
  },
}

module.exports = nextConfig

// const withVideos = require('next-videos')

// module.exports = withVideos({
//   basePath: '/v2',

//   webpack(config, options) {
//     return config
//   }
// })

//mongodb+srv://papiasharmin:7MfyyvryELf5HxiY@cluster0.lhg764a.mongodb.net/?retryWrites=true&w=majority


