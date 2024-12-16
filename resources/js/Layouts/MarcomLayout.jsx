import React from 'react';
import PropTypes from 'prop-types';
import { Link } from '@inertiajs/react';
import { Navbar } from '../Components/Navigation/Navbar';
import { navigationConfig } from '../Components/Navigation/navigationConfig.jsx';
import Footer from '../Components/Footer/Footer';

export default function MarcomLayout({ children }) {
    return (
        <div className="min-h-screen bg-background-primary">
            <Navbar 
                logo={navigationConfig.logo}
                navLinks={navigationConfig.navLinks}
                buttons={navigationConfig.buttons}
            />
            <main>
                {children}
            </main>
            <Footer />
        </div>
    );
}

MarcomLayout.propTypes = {
    children: PropTypes.node.isRequired,
};
