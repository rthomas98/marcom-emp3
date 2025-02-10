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

export default function Home({ insights }) {
    return (
        <MarcomLayout>
            <Header79 
                heading="Crafting Digital Solutions That Drive Growth"
                description="Expert software development and digital solutions for businesses. From custom applications to e-commerce platforms, we deliver technology that transforms your vision into reality."
                images={[
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-1.jpg",
                        alt: "AI Innovation Image 1",
                    },
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-2.jpg",
                        alt: "AI Innovation Image 2",
                    },
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-3.jpg",
                        alt: "AI Innovation Image 3",
                    },
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-4.jpg",
                        alt: "AI Innovation Image 4",
                    },
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-5.jpg",
                        alt: "AI Innovation Image 5",
                    },
                    {
                        src: "https://empuls3.nyc3.digitaloceanspaces.com/images/home/ai-6.jpg",
                        alt: "AI Innovation Image 6",
                    },
                ]}
                links={[
                    { title: "Get Started", href: route('resources.contact') },
                    { title: "Learn More", href: route('company.about') }
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
            <Blog42 
                insights={insights}
                tagline="Latest Insights"
                heading="Technology & Innovation"
                description="Stay ahead with our latest insights on digital transformation, enterprise solutions, and industry trends."
            />
        </MarcomLayout>
    );
}
