module.exports = {
  images: {
    domains: ['placeimg.com'],
  },
  webpack: function webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ['@svgr/webpack'],
    });

    return config;
  },
};
