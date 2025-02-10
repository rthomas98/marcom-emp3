import React from 'react';
import { Link } from "@inertiajs/react";
import clsx from "clsx";
import { ArrowRight } from 'lucide-react';

const Feature = ({ image, heading, description, href }) => (
  <Link href={href} className="group block cursor-pointer">
    <div className="relative mb-6 w-full overflow-hidden rounded-lg bg-athens-gray md:mb-8">
      <div className="aspect-[3/2] w-full">
        <img
          src={image.src}
          alt={image.alt}
          loading="lazy"
          className="h-full w-full transform object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
    <h2 className="font-heading mb-3 text-2xl font-bold text-port-gore md:mb-4 md:text-3xl md:leading-[1.3] lg:text-4xl">
      {heading}
    </h2>
    <p className="font-sans mb-4 text-port-gore/70">{description}</p>
  </Link>
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
    <section className="relative overflow-hidden bg-white px-[5%] py-16 md:py-24 lg:py-28">
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
        <div className="mt-12 flex flex-wrap items-center gap-4 md:mt-16">
          {buttons.map((button, index) => (
            <Link 
              key={index} 
              href={button.href}
              className={clsx(
                "group inline-flex items-center gap-2 px-6 py-3 font-sans transition-all",
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
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout457Defaults = {
  tagline: "Industry Solutions",
  heading: "Expert Development",
  description:
    "We deliver tailored software solutions across various industries, helping businesses transform their digital presence and streamline operations.",
  features: [
    {
      image: {
        src: "/images/emp/rob_thomas23_Africa_American_Software_developers_discussing_abo_61339e21-6c03-4f31-9813-6dafd2b02df0.png",
        alt: "Startup development solutions",
      },
      heading: "Startup Solutions",
      description:
        "Agile development services tailored for startups, helping bring innovative ideas to market quickly and efficiently.",
      href: route('industries.startups'),
    },
    {
      image: {
        src: "/images/emp/rob_thomas23_A_dynamic_image_of_an_ecommerce_website_on_a_lapto_8573ee70-5ea2-48aa-ae70-35db662a51f2.png",
        alt: "E-commerce development",
      },
      heading: "E-commerce Growth",
      description:
        "Custom e-commerce platforms that drive sales, enhance customer experience, and scale with your business.",
      href: route('solutions.ecommerce'),
    },
    {
      image: {
        src: "/images/emp/rob_thomas23_African_American_Coders_working_in_a_Software_deve_390a7a57-d7d7-4496-88ad-dce46e0c4c80.png",
        alt: "Enterprise solutions",
      },
      heading: "Enterprise Systems",
      description:
        "Robust enterprise solutions that modernize operations, improve efficiency, and drive digital transformation.",
      href: route('solutions.custom'),
    },
  ],
  buttons: [
    { 
      title: "View All Solutions", 
      variant: "primary",
      href: route('solutions'),
    },
    {
      title: "Get Started",
      variant: "secondary-alt",
      href: route('solutions.custom'),
    },
  ],
};
