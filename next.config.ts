import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        port: "",
        pathname: "/images/**",
      },
    ],
  },
  // Force the non-www domain to redirect to the canonical www domain.
  // Vercel already forces http -> https automatically for verified domains,
  // so combined with this, all 3 duplicate address variants funnel into
  // https://www.rayanwellness.com — matching what we told Google Search
  // Console is the preferred URL.
  async redirects() {
    return [
      {
        source: "/:path*",
        has: [{ type: "host", value: "rayanwellness.com" }],
        destination: "https://www.rayanwellness.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
