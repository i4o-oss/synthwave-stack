module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './common/**/*.{js,jsx,ts,tsx}'],
	darkMode: 'class',
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: 'rgb(var(--brand) / <alpha-value>)',
					subtle: 'rgb(var(--brand-subtle) / <alpha-value>)',
					hover: 'rgb(var(--brand-hover) / <alpha-value>)',
					states: 'rgb(var(--brand-states) / <alpha-value>)',
				},
				muted: {
					DEFAULT: 'rgb(var(--muted) / <alpha-value>)',
					foreground: 'rgb(var(--muted-foreground) / <alpha-value>)',
				},
				primary: {
					DEFAULT: 'rgb(var(--primary) / <alpha-value>)',
					subtle: 'rgb(var(--primary-subtle) / <alpha-value>)',
					foreground:
						'rgb(var(--primary-foreground) / <alpha-value>)',
					'foreground-subtle':
						'rgb(var(--primary-foreground-subtle) / <alpha-value>)',
				},
				subtle: {
					DEFAULT: 'rgb(var(--subtle) / <alpha-value>)',
				},
				ui: {
					DEFAULT: 'rgb(var(--ui) / <alpha-value>)',
					hover: 'rgb(var(--ui-hover) / <alpha-value>)',
					states: 'rgb(var(--ui-states) / <alpha-value>)',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
			animation: {
				text: 'text 5s ease infinite',
			},
			keyframes: {
				text: {
					'0%, 100%': {
						'background-size': '200% 200%',
						'background-position': 'left center',
					},
					'50%': {
						'background-size': '200% 200%',
						'background-position': 'right center',
					},
				},
			},
		},
	},
}
