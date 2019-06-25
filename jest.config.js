/* eslint-disable max-len */
module.exports = {
  setupFiles: ["<rootDir>/src/tests/setup.js"],
  collectCoverageFrom: [
      "<rootDir>/src/**/*.{js,jsx}",
      "!<rootDir>/src/**/index.js",
      "!<rootDir>/src/config/*.js",
      "!<rootDir>/src/tests/**/*.(spec|test).{js,jsx}"
  ],
  moduleNameMapper: {
      ".+\\.(css|scss)$": "identity-obj-proxy",
      ".+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2)$": "jest-transform-stub",
  },
  coveragePathIgnorePatterns: [
      "<rootDir>/node_modules",
      "<rootDir>/src/tests",
      "<rootDir>/src/store/configureStore.js",
  ],
  testPathIgnorePatterns: [
      "<rootDir>/node_modules/"
  ],
  testMatch: [
      "<rootDir>/src/tests/**/*.(spec|test).{js,jsx}",
  ],
  transform: {
      "^.+\\.(js|jsx|mjs)$": "<rootDir>/node_modules/babel-jest",
  },
  transformIgnorePatterns: ["[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs)$"],
};
