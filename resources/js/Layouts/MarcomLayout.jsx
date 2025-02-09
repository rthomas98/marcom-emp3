import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { Navbar } from '../Components/Navigation/Navbar';
import Footer from '../Components/Footer/Footer';

const footerConfig = {
    logo: {
        url: '/',
        src: 'https://empuls3.nyc3.digitaloceanspaces.com/images/logos/logo.svg',
        alt: 'Empuls3 Logo'
    },
    newsletterDescription: 'Stay up to date with our latest news and updates.',
    inputPlaceholder: 'Enter your email',
    button: {
        title: 'Subscribe',
        url: '#'
    },
    termsAndConditions: 'By subscribing you agree to our Terms and Conditions',
    columnLinks: [
        {
            title: 'Company',
            links: [
                { title: 'About Us', url: '/company/about' },
                { title: 'Latest News', url: '/company/latest-news' },
                { title: 'Careers', url: '/company/careers' },
                { title: 'Contact', url: '/company/contact' }
            ]
        },
        {
            title: 'Services',
            links: [
                { title: 'AI & ML Development', url: '/services/ai-ml-development' },
                { title: 'Foundation Models', url: '/services/foundation-models' },
                { title: 'MLOps & Infrastructure', url: '/services/mlops-infrastructure' }
            ]
        },
        {
            title: 'Resources',
            links: [
                { title: 'Blog', url: '/resources/blog' },
                { title: 'Case Studies', url: '/resources/case-studies' },
                { title: 'Documentation', url: '/resources/documentation' }
            ]
        }
    ],
    footerText: ' 2025 Empuls3. All rights reserved.',
    footerLinks: [
        { title: 'Privacy Policy', url: '/privacy' },
        { title: 'Terms of Service', url: '/terms' }
    ]
};

export default function MarcomLayout({ children }) {
    return (
        <div className="min-h-screen bg-white relative overflow-hidden">
            {/* Animated background squares */}
            <div className="absolute inset-0 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, rgba(255,255,255,0.8), rgba(255,255,255,0.9))' }}>
                <ul className="squares">
                    {[...Array(10)].map((_, i) => (
                        <li key={i}></li>
                    ))}
                </ul>
            </div>

            {/* Content */}
            <div className="relative z-10">
                <Navbar />
                <main className="pt-16 md:pt-18 lg:pt-18">
                    {children}
                </main>
                <Footer 
                    logo={footerConfig.logo}
                    newsletterDescription={footerConfig.newsletterDescription}
                    inputPlaceholder={footerConfig.inputPlaceholder}
                    button={footerConfig.button}
                    termsAndConditions={footerConfig.termsAndConditions}
                    columnLinks={footerConfig.columnLinks}
                    footerText={footerConfig.footerText}
                    footerLinks={footerConfig.footerLinks}
                />
            </div>
        </div>
    );
}

MarcomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
