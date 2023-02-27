const tailwindRadix = require('tailwindcss-radix')

module.exports = {
	content: ['./app/**/*.{js,jsx,ts,tsx}', './common/**/*.{js,jsx,ts,tsx}'],
	theme: {
		extend: {
			colors: {
				brand: {
					DEFAULT: '#2CB67D',
					50: '#E6F9F1',
					100: '#D2F4E6',
					200: '#A5E9CD',
					300: '#77DEB3',
					400: '#46D298',
					500: '#2CB67D',
					600: '#239062',
					700: '#1B6F4C',
					800: '#124A33',
					900: '#092519',
				},
			},
			fontFamily: {
				sans: ['Inter', 'sans-serif'],
				serif: ['Merriweather', 'serif'],
				serif: ['Orbitron', 'serif'],
			},
		},
	},
	plugins: [tailwindRadix()],
}
