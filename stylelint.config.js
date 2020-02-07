module.exports = {
	extends: 'stylelint-config-standard',
	rules: {
		indentation: 'tab',
		'declaration-colon-newline-after': null,
		'value-list-comma-newline-after': 'never-multi-line',
		'at-rule-no-unknown': [
			true,
			{
				ignoreAtRules: [
					'function',
					'at-root',
					'include',
					'extend',
					'return',
					'mixin',
					'warn',
					'each',
					'else',
					'for',
					'if',
				],
			},
		],
		'number-leading-zero': null,
		'unit-whitelist': ['rem', 'deg', 'em', 'vh', 'fr', 'vw', 'px', 'ms', '%', 's'],
	},
}
