import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { Navbar } from '../Components/Navigation/Navbar';
import Footer from '../Components/Footer/Footer';
import { footerConfig } from '../Components/Footer/footerConfig';

export default function MarcomLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-primary">
            <Navbar />
            <main>
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
    );
}

MarcomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
