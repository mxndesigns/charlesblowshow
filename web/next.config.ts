import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root to this app — silences the multi-lockfile warning
  // caused by an unrelated package-lock.json higher up the filesystem.
  turbopack: {
    root: __dirname,
  },
};

export default nextConfig;
