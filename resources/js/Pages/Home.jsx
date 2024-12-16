import React from 'react';
import MarcomLayout from '../Layouts/MarcomLayout';
import { Header79 } from '../Components/HomePage/Header79';

export default function Home() {
    return (
        <MarcomLayout>
            <Header79 
                heading="Empowering Digital Innovation"
                description="Transform your business with cutting-edge solutions that drive growth, engagement, and success. Experience the future of digital transformation today."
                buttons={[
                    { title: "Get Started", variant: "primary" },
                    { title: "Learn More", variant: "secondary-alt" }
                ]}
            />
        </MarcomLayout>
    );
}
