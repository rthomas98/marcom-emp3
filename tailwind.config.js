import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';
import relumePreset from '@relume_io/relume-tailwind';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
        './node_modules/@relume_io/relume-ui/dist/**/*.{js,ts,jsx,tsx}'
    ],

    presets: [relumePreset],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Montserrat', ...defaultTheme.fontFamily.sans],
                heading: ['Asap', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                "port-gore": "#1F1946",
                "cardinal": "#BD1550",
                "koromiko": "#FFC259",
                "athens-gray": "#F8F9FA",
                "white": "#FFFFFF",
                "black": "#0D0D0D",
            },
            keyframes: {
                'marquee-horizontally': {
                    '0%': { transform: 'translateX(0)' },
                    '100%': { transform: 'translateX(-50%)' },
                },
                'loop-vertically-top': {
                    '0%': { transform: 'translateY(0)' },
                    '100%': { transform: 'translateY(-50%)' }
                },
                'loop-vertically-bottom': {
                    '0%': { transform: 'translateY(-50%)' },
                    '100%': { transform: 'translateY(0)' }
                }
            },
            animation: {
                'marquee-horizontally': 'marquee-horizontally 40s linear infinite',
                'loop-vertically-top': 'loop-vertically-top 40s linear infinite',
                'loop-vertically-bottom': 'loop-vertically-bottom 40s linear infinite'
            },
        },
    },

    plugins: [forms],
};
