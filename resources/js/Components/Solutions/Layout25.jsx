import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Paintbrush, Globe, Rocket } from 'lucide-react';

export const Layout25 = (props) => {
  const { tagline, heading, description, stats, buttons, image } = {
    ...Layout25Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
            <p className="mb-6 text-port-gore/70 md:mb-8 md:text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {stats.map((stat, index) => (
                <div key={index}>
                  <h3 className="font-heading mb-2 text-5xl font-bold text-cardinal md:text-7xl lg:text-8xl">{stat.title}</h3>
                  <p className="text-port-gore/70">{stat.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button 
                  key={index} 
                  {...button}
                  className={
                    button.variant === "primary" 
                      ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full"
                      : "text-cardinal hover:text-cardinal/80 flex items-center gap-2"
                  }
                >
                  {button.title}
                  {button.variant !== "primary" && <ArrowRight className="size-5" />}
                </Button>
              ))}
            </div>
          </div>
          <div>
            <img src={image.src} className="w-full rounded-2xl object-cover shadow-lg" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout25Defaults = {
  tagline: "WordPress Development",
  heading: "Powerful Website Solutions",
  description:
    "Create stunning, scalable, and feature-rich WordPress websites that drive results. Our expert team delivers custom WordPress solutions tailored to your business needs.",
  stats: [
    {
      title: "40%",
      description: "Of all websites worldwide are powered by WordPress, making it the most popular CMS.",
    },
    {
      title: "75K+",
      description: "Premium WordPress plugins available to extend your website's functionality.",
    },
  ],
  buttons: [
    { 
      title: "Start Your Project", 
      variant: "primary" 
    },
    {
      title: "View Portfolio",
      variant: "link",
      size: "link",
    },
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "WordPress Development Solutions",
  },
};
