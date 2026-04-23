module.exports = {
  root: true,
  parser: "@typescript-eslint/parser",
  plugins: ["@typescript-eslint"],
  extends: ["eslint:recommended", "plugin:@typescript-eslint/recommended", "prettier"],
  ignorePatterns: [
    "**/dist/**",
    "**/.next/**",
    "**/coverage/**",
    "**/node_modules/**",
    "**/*.d.ts"
  ],
  overrides: [
    {
      files: ["apps/web/**/*.{ts,tsx}", "apps/docs/**/*.{ts,tsx}"],
      extends: ["next/core-web-vitals"]
    }
  ]
};
