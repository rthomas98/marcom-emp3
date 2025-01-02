import React from 'react';
import { Button } from "@relume_io/relume-ui";
import clsx from "clsx";
import { ArrowRight } from 'lucide-react';

const Feature = ({ image, heading, description }) => (
  <div className="group cursor-pointer">
    <div className="rb-6 mb-6 w-full overflow-hidden rounded-lg md:mb-8">
      <img
        src={image.src}
        alt={image.alt}
        className="aspect-[3/2] w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <h2 className="font-heading mb-3 text-2xl font-bold text-port-gore md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
      {heading}
    </h2>
    <p className="font-sans text-port-gore/70">{description}</p>
  </div>
);

export const Layout457 = ({ 
  tagline = Layout457Defaults.tagline,
  heading = Layout457Defaults.heading,
  description = Layout457Defaults.description,
  features = Layout457Defaults.features,
  buttons = Layout457Defaults.buttons,
  ...props 
}) => {
  return (
    <section className="bg-white overflow-hidden px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="mb-12 max-w-lg md:mb-18 lg:mb-20">
          <p className="font-heading mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
          <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="font-sans text-port-gore/70 md:text-lg">{description}</p>
        </div>
        <div className="grid auto-cols-fr grid-cols-1 items-start gap-12 md:grid-cols-3 md:gap-8 lg:gap-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className={clsx("w-full", {
                "md:mt-[25%]": index === 1,
                "md:mt-[50%]": index === 2,
              })}
            >
              <Feature {...feature} />
            </div>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button 
              key={index} 
              {...button}
              className={clsx(
                "group flex items-center gap-2 transition-all font-sans",
                {
                  "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full": button.variant === "primary",
                  "bg-port-gore text-white hover:bg-port-gore/90 hover:shadow-md rounded-full": button.variant === "secondary-alt",
                  "text-cardinal hover:text-cardinal/80": button.variant === "link"
                }
              )}
            >
              {button.title}
              {button.variant === "link" && (
                <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
              )}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout457Defaults = {
  tagline: "Industry Understanding",
  heading: "Sector Expertise",
  description:
    "Deep knowledge and proven experience across diverse industries, delivering tailored solutions that address sector-specific challenges and opportunities.",
  features: [
    {
      image: {
        src: "/images/placeholder-industry.svg",
        alt: "Healthcare sector solutions",
      },
      heading: "Healthcare Innovation",
      description:
        "Transforming patient care through secure, compliant digital solutions that streamline operations and enhance healthcare delivery.",
    },
    {
      image: {
        src: "/images/placeholder-industry.svg",
        alt: "Financial services solutions",
      },
      heading: "Fintech Excellence",
      description:
        "Empowering financial institutions with robust, secure platforms that drive digital transformation and enhance customer experience.",
    },
    {
      image: {
        src: "/images/placeholder-industry.svg",
        alt: "E-commerce solutions",
      },
      heading: "Retail Evolution",
      description:
        "Building scalable e-commerce solutions that create seamless shopping experiences and drive business growth.",
    },
  ],
  buttons: [
    { 
      title: "Explore Industries", 
      variant: "primary"
    },
    {
      title: "Learn More",
      variant: "secondary-alt"
    },
  ],
};
