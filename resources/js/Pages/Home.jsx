import React from 'react';
import MarcomLayout from '../Layouts/MarcomLayout';
import { Header79 } from '../Components/HomePage/Header79';
import { Layout6 } from '../Components/HomePage/Layout6';
import { Layout393 } from '../Components/HomePage/Layout393';
import { Layout457 } from '../Components/HomePage/Layout457';
import { Layout51 } from '../Components/HomePage/Layout51';
import { Layout131 } from '../Components/HomePage/Layout131';
import { Layout499 } from '../Components/HomePage/Layout499';
import { Testimonial20 } from '../Components/HomePage/Testimonial20';
import { Cta3 } from '../Components/HomePage/Cta3';
import { Blog42 } from '../Components/HomePage/Blog42';

export default function Home() {
    return (
        <MarcomLayout>
            <Header79 
                heading="Empowering Digital Innovation with AI"
                description="Transform your business with cutting-edge AI solutions and custom foundation models. Experience the future of digital transformation powered by machine learning."
                buttons={[
                    { title: "Get Started", variant: "primary" },
                    { title: "Learn More", variant: "secondary-alt" }
                ]}
            />
            <Layout6 />
            <Layout393 />
            <Layout457 />
            <Layout51 />
            <Layout131 />
            <Layout499 />
            <Testimonial20 />
            <Cta3 />
            <Blog42 />
        </MarcomLayout>
    );
}
