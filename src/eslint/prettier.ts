import eslintConfigPrettier from 'eslint-config-prettier';
import type { ConfigArray } from 'typescript-eslint';

const prettierEslintConfig: ConfigArray = [eslintConfigPrettier];

export { prettierEslintConfig };
export default prettierEslintConfig;
