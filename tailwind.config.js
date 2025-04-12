/** @type {import('tailwindcss').Config} */
module.exports = {
    darkMode: 'class',
    content: [
        './pages/**/*.{js,ts,jsx,tsx,mdx}',
        './components/**/*.{js,ts,jsx,tsx,mdx}',
        './app/**/*.{js,ts,jsx,tsx,mdx}',
    ],
    theme: {
        extend: {
            backgroundColor: {
                'dark-primary': '#1a1a1a',
                'dark-secondary': '#2d2d2d',
            },
            textColor: {
                'dark-primary': '#ffffff',
                'dark-secondary': '#a0a0a0',
            },
        },
    },
    plugins: [('@tailwindcss/typography')],
}