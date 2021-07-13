const { i18n } = require("./next-i18next.config");
module.exports = {
  i18n,
  images: {
    domains: ["devmds.com"],
  },
  reactStrictMode: true,
  eslint: {
    // Warning: Dangerously allow production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  generateBuildId: async () => {
    // You can, for example, get the latest git commit hash here
    return "1.0";
  },
};
