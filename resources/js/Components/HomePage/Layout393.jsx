import React from 'react';
import { Button } from "@relume_io/relume-ui";
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
        <img src={image.src} alt={image.alt} className="w-full" />
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
          <Button 
            {...button} 
            className="group flex items-center gap-2 text-cardinal hover:text-cardinal/80"
          >
            {button.title}
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          </Button>
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
        <Button 
          {...button}
          className="group flex items-center gap-2 text-cardinal hover:text-cardinal/80"
        >
          {button.title}
          <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
        </Button>
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
  tagline: "Technical Excellence",
  heading: "Full-Stack Mastery",
  description: "Leveraging cutting-edge technologies and best practices to deliver robust, scalable, and innovative solutions that drive your business forward.",
  cards: [
    {
      tagline: "Modern Architecture",
      image: {
        src: "/images/placeholder-card.svg",
        alt: "Modern architecture visualization",
      },
      heading: "Cloud-Native Solutions",
      description: "Building scalable, resilient applications with microservices architecture and containerization for optimal performance.",
      button: {
        title: "Explore Architecture",
        variant: "link",
        size: "link",
      },
    },
    {
      tagline: "Development Excellence",
      image: {
        src: "/images/placeholder-card.svg",
        alt: "Development workflow visualization",
      },
      heading: "Agile Development",
      description: "Implementing CI/CD pipelines and automated testing for rapid, reliable software delivery.",
      button: {
        title: "View Process",
        variant: "link",
        size: "link",
      },
    },
  ],
  featureSections: [
    {
      icon: {
        component: <Code2 className="size-12 stroke-[1.5]" />,
        alt: "Frontend development icon",
      },
      heading: "Frontend Excellence",
      description: "Expert implementation of React, Vue, and modern JavaScript frameworks for exceptional user experiences.",
      button: {
        title: "Learn More",
        variant: "link",
        size: "link",
      },
    },
    {
      icon: {
        component: <Database className="size-12 stroke-[1.5]" />,
        alt: "Backend development icon",
      },
      heading: "Backend Power",
      description: "Robust server-side solutions using Node.js, Python, and enterprise-grade databases for reliable performance.",
      button: {
        title: "Discover More",
        variant: "link",
        size: "link",
      },
    },
  ],
};
