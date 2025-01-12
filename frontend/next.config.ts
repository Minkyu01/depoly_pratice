import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // 정적 사이트로 내보내기 -> nextjs 13부터 next export로 대신 next build로 통합됨

  /* config options here */
  async redirects() {
    return [
      {
        source: "/",
        destination: "/board",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
