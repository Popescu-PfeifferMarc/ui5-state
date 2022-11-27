const config = {
	plugins: [require.resolve('@prettier/plugin-xml')],
	useTabs: true,
	tabWidth: 4,
	semi: true,
	singleQuote: true,
	printWidth: 110,
	xmlWhitespaceSensitivity: 'ignore',
};

module.exports = config;
