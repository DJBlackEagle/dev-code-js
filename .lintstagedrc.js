export default {
  '*.{ts,tsx}': ['eslint --fix', 'prettier --write'],
  '*.{js,jsx}': ['eslint --fix', 'prettier --write'],
  '*.md': ['eslint --fix', 'markdownlint-cli2 --fix', 'prettier --write'],
  '*.{json,jsonc,yml,yaml}': ['eslint --fix', 'prettier --write'],
};
