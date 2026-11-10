import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Vercel Node lambdas (Next 16.2.x) can resolve @swc/helpers via the ESM
  // path even when NFT only traces the CJS build — include both so /api/*
  // functions do not crash with FUNCTION_INVOCATION_FAILED.
  outputFileTracingIncludes: {
    "/api/*": ["./node_modules/@swc/helpers/**/*"],
  },
  experimental: {
    viewTransition: true,
  },
  async redirects() {
    return [
      {
        source: "/link-bio",
        destination: "/hub",
        permanent: true,
      },
    ];
  },
  // Landing pages estáticas em public/<slug>/index.html. O Next não serve
  // index.html de pasta sozinho, então mapeamos /<slug> para o arquivo.
  async rewrites() {
    return ["grape-clinic", "ebook-menopausa-grape", "obg-grape-clinic"].map(
      (slug) => ({
        source: `/${slug}`,
        destination: `/${slug}/index.html`,
      }),
    );
  },
  images: {
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    imageSizes: [64, 96, 128, 256, 384],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "i.ytimg.com",
        pathname: "/vi/**",
      },
    ],
  },
  async headers() {
    const immutable = "public, max-age=31536000, immutable";

    return [
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: immutable }],
      },
      {
        source: "/brand/:path*",
        headers: [{ key: "Cache-Control", value: immutable }],
      },
      {
        source: "/videos/:path*",
        headers: [{ key: "Cache-Control", value: immutable }],
      },
    ];
  },
};

export default nextConfig;
