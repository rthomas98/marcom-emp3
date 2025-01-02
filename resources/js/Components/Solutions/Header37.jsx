import React from 'react';
import { Link } from '@inertiajs/react';
import { ArrowRight, Code2, Rocket } from 'lucide-react';
import { Button } from "@relume_io/relume-ui";

export const Header37 = (props) => {
  const { heading, description, buttons, image } = {
    ...Header37Defaults,
    ...props,
  };
  return (
    <section
      id="relume"
      className="grid grid-cols-1 items-center gap-y-16 pt-16 md:pt-24 lg:grid-cols-2 lg:pt-0"
    >
      <div className="order-2 lg:order-1">
        <img
          src="/images/placeholder.svg"
          alt={image.alt}
          className="w-full object-cover lg:h-screen lg:max-h-[60rem]"
        />
      </div>
      <div className="order-1 mx-[5%] sm:max-w-md md:justify-self-start lg:order-2 lg:ml-20 lg:mr-[5vw]">
        <h1 className="font-heading mb-5 text-6xl font-bold text-port-gore md:mb-6 md:text-9xl lg:text-10xl">
          {heading}
        </h1>
        <p className="text-port-gore/70 md:text-lg">{description}</p>
        <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
          {buttons.map((button, index) => (
            <Button 
              key={index} 
              {...button}
              className={
                button.variant === "primary" 
                  ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full"
                  : "bg-port-gore text-white hover:bg-port-gore/90 hover:shadow-md rounded-full"
              }
            >
              {button.title}
            </Button>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Header37Defaults = {
  heading: "Enterprise Development Solutions",
  description:
    "Transform your business with our comprehensive suite of development solutions. From custom software to cloud infrastructure, we deliver innovative technology that drives growth and efficiency.",
  buttons: [
    { 
      title: "Explore Solutions",
      variant: "primary"
    }, 
    { 
      title: "Contact Sales",
      variant: "secondary"
    }
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "Enterprise Development Solutions",
  },
};
