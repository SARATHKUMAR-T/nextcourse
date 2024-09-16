/** @type {import('next').NextConfig} */
import withBundleAnalyzer from '@next/bundle-analyzer'
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'fudmnvmwdzszrfvhntto.supabase.co',
        port: '',
        pathname: '/storage/v1/object/public/cabin-images/**',
      },
    ],
  },

  // output: 'export'
};


const analyzer = withBundleAnalyzer({ enabled: process.env.ANALYZE === 'true' })


export default analyzer(nextConfig);
