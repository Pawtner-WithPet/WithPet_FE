module.exports = {
  presets: ["@react-native/babel-preset"], // ✅ 수정된 부분Add commentMore actions
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        blocklist: null,
        allowlist: null,
        safe: false,
        allowUndefined: true,
        verbose: false,
      },
    ],
  ],
};
