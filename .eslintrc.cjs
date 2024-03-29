// https://github.com/Arno-Fiire/vite-react-ts-eslint-prettier/blob/main/.eslintrc.cjs
module.exports = {
	root: true,
	env: {
		browser: true,
		es2021: true,
	},
	extends: [
		'airbnb',
		'airbnb/hooks',
		'plugin:react/recommended',
		'plugin:@typescript-eslint/recommended-type-checked',
		'prettier',
		'plugin:prettier/recommended',
		'plugin:import/recommended',
	],
	ignorePatterns: ['dist', '.eslintrc.cjs'],
	parser: '@typescript-eslint/parser',
	parserOptions: {
		ecmaVersion: 'latest',
		sourceType: 'module',
		project: ['./tsconfig.json', './tsconfig.node.json'],
		tsconfigRootDir: __dirname,
	},
	plugins: ['react', 'react-refresh', '@typescript-eslint', 'prettier'],
	rules: {
		'react/prop-types': 0,
		'react/react-in-jsx-scope': 0,
		'react/jsx-filename-extension': [
			2,
			{ extensions: ['.js', '.jsx', '.ts', '.tsx'] },
		],
		'react-refresh/only-export-components': [
			'warn',
			{ allowConstantExport: true },
		],
		'no-console': 0,
		'no-continue': 0,
		'no-nested-ternary': 0,
		'no-unused-vars': 0,
		'@typescript-eslint/no-unused-vars': [
			'warn',
			{ vars: 'all', args: 'after-used', ignoreRestSiblings: false },
		],
		'no-shadow': 0,
		'@typescript-eslint/no-shadow': ['error'],
		'no-use-before-define': 0,
		'@typescript-eslint/no-use-before-define': ['warn'],
		'arrow-parens': ['error', 'always'],
		'import/prefer-default-export': 0,
		'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
		'import/extensions': ['error', 'always', { ignorePackages: true }],
	},
};
