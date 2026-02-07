import type { Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class',
    content: ['./src/**/*.{ts,tsx}'],
    theme: {
        extend: {
            colors: {
                // Primary Pink Palette
                strawberry: {
                    50: '#FFFAF9', // Neutral Warm Off-White (Background)
                    100: '#FFD1DC',
                    200: '#FFB7C5',
                    500: '#FF3388', // Saturated Hero Pink (CTAs)
                    600: '#E62E7A',
                },
                plum: {
                    950: '#0F010F',
                    900: '#1A011A',
                    800: '#2D022D',
                    700: '#4D044D',
                    600: '#7A067A',
                },
                night: {
                    50: '#F5F5F3', // Warm Off-White
                    100: '#E8E8E1',
                    200: '#D1D1C7',
                    300: '#B9B9AD',
                    400: '#A1A193',
                    500: '#898979',
                    600: '#717163',
                    700: '#59594D',
                    800: '#414137',
                    900: '#292921',
                    950: '#11110B', // Near Black
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },
            fontFamily: {
                sans: ['Plus Jakarta Sans', 'sans-serif'],
                handwritten: ['Caveat', 'cursive'],
                display: ['Patrick Hand', 'cursive'],
                indie: ['Indie Flower', 'cursive'],
            },
            borderRadius: {
                'xl': '1rem',
                '2xl': '1.5rem',
                '3xl': '2rem',
                '4xl': '3rem',
            },
            boxShadow: {
                'soft': '0 2px 15px -3px rgba(255, 105, 180, 0.1)',
                'glow': '0 0 20px rgba(255, 105, 180, 0.3)',
                'warm': '0 4px 20px rgba(255, 127, 127, 0.15)',
                'pink-soft': '0 10px 40px -10px rgba(255, 105, 180, 0.2)',
            },
            letterSpacing: {
                'handwritten': '-0.03em',
                'tightest': '-0.05em',
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'pulse-soft': 'pulse-soft 2s ease-in-out infinite',
                'slide-up': 'slide-up 0.5s ease-out',
                'fade-in': 'fade-in 0.3s ease-out',
                'bounce-gentle': 'bounce-gentle 2s infinite',
                'shimmer': 'shimmer 2s linear infinite',
                'grow': 'grow 0.5s ease-out',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-10px)' },
                },
                'pulse-soft': {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.7' },
                },
                'slide-up': {
                    from: { transform: 'translateY(20px)', opacity: '0' },
                    to: { transform: 'translateY(0)', opacity: '1' },
                },
                'fade-in': {
                    from: { opacity: '0' },
                    to: { opacity: '1' },
                },
                'bounce-gentle': {
                    '0%, 100%': { transform: 'translateY(0)' },
                    '50%': { transform: 'translateY(-5px)' },
                },
                shimmer: {
                    '0%': { backgroundPosition: '-200% 0' },
                    '100%': { backgroundPosition: '200% 0' },
                },
                grow: {
                    from: { transform: 'scale(0.8)', opacity: '0' },
                    to: { transform: 'scale(1)', opacity: '1' },
                },
            },
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
        require('tailwindcss-animate'),
    ],
}

export default config
