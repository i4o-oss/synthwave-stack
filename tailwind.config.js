const tailwindRadix = require('tailwindcss-radix')

module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './common/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#2CB67D',
					50: '#AEEBD2',
					100: '#9EE7C9',
					200: '#7DE0B7',
					300: '#5CD8A5',
					400: '#3BD092',
					500: '#2CB67D',
					600: '#21895E',
					700: '#165C3F',
					800: '#0B2E20',
					900: '#000101',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
			},
		},
	},
	plugins: [tailwindRadix()],
}
