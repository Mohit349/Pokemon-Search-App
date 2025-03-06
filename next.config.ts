import { NextConfig } from "next";

const config: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "raw.githubusercontent.com",
        port: "",
        search: "",
      },
    ],
  },
};

export default config;
