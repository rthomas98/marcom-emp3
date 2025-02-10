import React from 'react';
import { Link } from "@inertiajs/react";
import { 
  ArrowRight, 
  Code2, 
  Database, 
  Cloud,
  Layers 
} from 'lucide-react';

const Card = ({ tagline, image, heading, description, button }) => {
  return (
    <div className="flex auto-cols-fr flex-col border border-port-gore/10 bg-white transition-all hover:shadow-lg last-of-type:row-span-1 last-of-type:grid sm:col-span-2 sm:grid-cols-2 sm:last-of-type:row-start-2 md:last-of-type:col-span-2 lg:col-span-1 lg:col-start-3 lg:row-span-2 lg:last-of-type:col-span-2">
      <div className="flex size-full flex-col items-center justify-center self-start bg-athens-gray lg:h-auto">
        <img src={image.src} alt={image.alt} className="w-full" loading="lazy" />
      </div>
      <div className="block flex-1 p-6 sm:flex sm:flex-col sm:justify-center md:p-8">
        <div>
          <p className="font-heading mb-2 font-semibold text-cardinal">{tagline}</p>
          <h2 className="font-heading mb-3 text-2xl font-bold text-port-gore md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
            {heading}
          </h2>
          <p className="font-sans text-port-gore/70">{description}</p>
        </div>
        <div className="mt-5 md:mt-6">
          <Link 
            href={button.href || '#'} 
            className="group flex items-center gap-2 text-cardinal hover:text-cardinal/80"
          >
            {button.title}
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </div>
    </div>
  );
};

const FeatureSection = ({ icon, heading, description, button }) => (
  <div className="flex flex-col border border-port-gore/10 bg-white transition-all hover:shadow-lg">
    <div className="flex flex-1 flex-col justify-center p-6 md:p-8">
      <div>
        <div className="rb-5 mb-5 text-port-gore md:mb-6">
          {icon.component}
        </div>
        <h2 className="font-heading mb-3 text-2xl font-bold text-port-gore md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
          {heading}
        </h2>
        <p className="font-sans text-port-gore/70">{description}</p>
      </div>
      <div className="mt-5 md:mt-6">
        <Link 
          href={button.href || '#'} 
          className="group flex items-center gap-2 text-cardinal hover:text-cardinal/80"
        >
          {button.title}
          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  </div>
);

export const Layout393 = ({ 
  tagline = Layout393Defaults.tagline,
  heading = Layout393Defaults.heading,
  description = Layout393Defaults.description,
  cards = Layout393Defaults.cards,
  featureSections = Layout393Defaults.featureSections,
  ...props 
}) => {
  return (
    <section className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto mb-12 w-full max-w-lg text-center md:mb-18 lg:mb-20">
          <p className="font-heading mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
          <h1 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h1>
          <p className="font-sans text-port-gore/70 md:text-lg">{description}</p>
        </div>
        <div className="grid auto-cols-fr gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
          {featureSections.map((feature, index) => (
            <FeatureSection key={index} {...feature} />
          ))}
          {cards.map((card, index) => (
            <Card key={index} {...card} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout393Defaults = {
  tagline: "Development Expertise",
  heading: "End-to-End Solutions",
  description: "We specialize in delivering comprehensive software solutions that empower businesses with modern, scalable, and user-centric applications.",
  cards: [
    {
      tagline: "E-commerce Solutions",
      image: {
        src: "/images/emp/rob_thomas23_African_American_developers_working_in_an_agency.__2447dfcb-adaf-4241-b1a4-34a264486177.png",
        alt: "Development team working on e-commerce platform",
      },
      heading: "Digital Commerce",
      description: "Custom e-commerce solutions built with modern frameworks and optimized for performance and conversion.",
      button: {
        title: "Explore E-commerce",
        href: route('solutions.ecommerce'),
      },
    },
    {
      tagline: "Web Applications",
      image: {
        src: "/images/emp/rob_thomas23_African_American_Web_Developers_in_a_working_envir_008ed057-ce50-4832-bfc4-21051acf71dd.png",
        alt: "Team developing web application",
      },
      heading: "Custom Solutions",
      description: "Scalable web applications that deliver exceptional user experiences across all devices.",
      button: {
        title: "View Solutions",
        href: route('solutions.custom'),
      },
    },
  ],
  featureSections: [
    {
      icon: {
        component: <Code2 className="size-12 stroke-[1.5]" />,
        alt: "Frontend development icon",
      },
      heading: "Frontend Development",
      description: "Creating responsive and intuitive user interfaces using React and modern web technologies.",
      button: {
        title: "Learn More",
        href: route('solutions.frontend'),
      },
    },
    {
      icon: {
        component: <Database className="size-12 stroke-[1.5]" />,
        alt: "Backend development icon",
      },
      heading: "Backend Development",
      description: "Building robust server-side solutions with secure APIs and efficient database management.",
      button: {
        title: "Discover More",
        href: route('solutions.backend'),
      },
    },
  ],
};
