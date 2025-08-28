/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: ["class"],
    content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
        extend: {
                borderRadius: {
                        lg: 'var(--radius)',
                        md: 'calc(var(--radius) - 2px)',
                        sm: 'calc(var(--radius) - 4px)'
                },
                colors: {
                        // New Blue Color Palette
                        'federal_blue': {
                                DEFAULT: '#03045e',
                                50: '#f0f4ff',
                                100: '#e6ecff',
                                200: '#d1dcff',
                                300: '#a6bfff',
                                400: '#7395ff',
                                500: '#4066ff',
                                600: '#1a3cff',
                                700: '#0d27e6',
                                800: '#0620c2',
                                900: '#03045e'
                        },
                        'honolulu_blue': {
                                DEFAULT: '#0077b6',
                                50: '#f0f9ff',
                                100: '#e0f2fe',
                                200: '#bae6fd',
                                300: '#7dd3fc',
                                400: '#38bdf8',
                                500: '#0ea5e9',
                                600: '#0284c7',
                                700: '#0369a1',
                                800: '#075985',
                                900: '#0077b6'
                        },
                        'pacific_cyan': {
                                DEFAULT: '#00b4d8',
                                50: '#f0fdff',
                                100: '#ccf7fe',
                                200: '#99effd',
                                300: '#5ce2fa',
                                400: '#22d3ee',
                                500: '#06b6d4',
                                600: '#0891b2',
                                700: '#0e7490',
                                800: '#155e75',
                                900: '#00b4d8'
                        },
                        'non_photo_blue': {
                                DEFAULT: '#90e0ef',
                                50: '#f0fdff',
                                100: '#ccf7fe',
                                200: '#99effd',
                                300: '#5ce2fa',
                                400: '#22d3ee',
                                500: '#90e0ef',
                                600: '#67d8eb',
                                700: '#4ecde6',
                                800: '#3bc2e0',
                                900: '#2ab7db'
                        },
                        'light_cyan': {
                                DEFAULT: '#caf0f8',
                                50: '#f0fdff',
                                100: '#caf0f8',
                                200: '#b3ecf5',
                                300: '#9de8f2',
                                400: '#86e4ef',
                                500: '#70e0ec',
                                600: '#5adce9',
                                700: '#43d8e6',
                                800: '#2dd4e3',
                                900: '#16d0e0'
                        },
                        // Keeping existing system colors for compatibility
                        background: 'hsl(var(--background))',
                        foreground: 'hsl(var(--foreground))',
                        card: {
                                DEFAULT: 'hsl(var(--card))',
                                foreground: 'hsl(var(--card-foreground))'
                        },
                        popover: {
                                DEFAULT: 'hsl(var(--popover))',
                                foreground: 'hsl(var(--popover-foreground))'
                        },
                        primary: {
                                DEFAULT: 'hsl(var(--primary))',
                                foreground: 'hsl(var(--primary-foreground))'
                        },
                        secondary: {
                                DEFAULT: 'hsl(var(--secondary))',
                                foreground: 'hsl(var(--secondary-foreground))'
                        },
                        muted: {
                                DEFAULT: 'hsl(var(--muted))',
                                foreground: 'hsl(var(--muted-foreground))'
                        },
                        accent: {
                                DEFAULT: 'hsl(var(--accent))',
                                foreground: 'hsl(var(--accent-foreground))'
                        },
                        destructive: {
                                DEFAULT: 'hsl(var(--destructive))',
                                foreground: 'hsl(var(--destructive-foreground))'
                        },
                        border: 'hsl(var(--border))',
                        input: 'hsl(var(--input))',
                        ring: 'hsl(var(--ring))',
                        chart: {
                                '1': 'hsl(var(--chart-1))',
                                '2': 'hsl(var(--chart-2))',
                                '3': 'hsl(var(--chart-3))',
                                '4': 'hsl(var(--chart-4))',
                                '5': 'hsl(var(--chart-5))'
                        }
                },
                keyframes: {
                        'accordion-down': {
                                from: {
                                        height: '0'
                                },
                                to: {
                                        height: 'var(--radix-accordion-content-height)'
                                }
                        },
                        'accordion-up': {
                                from: {
                                        height: 'var(--radix-accordion-content-height)'
                                },
                                to: {
                                        height: '0'
                                }
                        }
                },
                animation: {
                        'accordion-down': 'accordion-down 0.2s ease-out',
                        'accordion-up': 'accordion-up 0.2s ease-out'
                }
        }
  },
  plugins: [require("tailwindcss-animate")],
};