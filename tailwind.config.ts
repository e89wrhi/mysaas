import type { Config } from 'tailwindcss';

const { fontFamily } = require('tailwindcss/defaultTheme');

const config = {
  darkMode: ['class'],
  content: [
    './src/app/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/ui/**/*.{ts,tsx}',
    './content/**/*.{md,mdx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '.8rem',
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: ['var(--font-sans)', ...fontFamily.sans],
        urban: ['var(--font-urban)', ...fontFamily.sans],
        heading: ['var(--font-heading)', ...fontFamily.sans],
        geist: ['var(--font-geist)', ...fontFamily.sans],
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '80%': { opacity: '0.7' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },
        'fade-down': {
          '0%': { opacity: '0', transform: 'translateY(-10px)' },
          '80%': { opacity: '0.6' },
          '100%': { opacity: '1', transform: 'translateY(0px)' },
        },

        // Fade in and out
        'fade-in': {
          '0%': { opacity: '0' },
          '50%': { opacity: '0.6' },
          '100%': { opacity: '1' },
        },
        'fade-out': {
          '0%': { opacity: '1' },
          '50%': { opacity: '0.6' },
          '100%': { opacity: '0' },
        },

        // === Custom AI illustration animations ===
        'move-token': {
          '0%': { transform: 'translateX(0)', opacity: '1' },
          '50%': { transform: 'translateX(420px) scale(0.95)' },
          '80%': { transform: 'translateX(460px) scale(0.8)', opacity: '0.8' },
          '100%': { opacity: '0' },
        },
        'show-info': {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'draw-path': {
          '0%': { strokeDasharray: '400', strokeDashoffset: '400' },
          '100%': { strokeDasharray: '400', strokeDashoffset: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',

        'fade-up': 'fade-up 0.5s ease-out',
        'fade-down': 'fade-down 0.5s ease-out',
        'fade-in': 'fade-in 0.4s ease-in',
        'fade-out': 'fade-out 0.4s ease-out',

        // === Custom AI illustration animations ===
        'move-token': 'move-token 2.8s ease-in-out forwards',
        'show-info': 'show-info 0.8s ease-out forwards 2.3s',
        'draw-path': 'draw-path 1.5s ease-out forwards',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;
