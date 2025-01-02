import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, ShoppingCart, CreditCard, Package, Truck } from 'lucide-react';

export const Layout247 = (props) => {
  const { tagline, heading, description, sections, buttons } = {
    ...Layout247Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 grid grid-cols-1 items-start gap-5 md:mb-18 md:grid-cols-2 md:gap-x-12 lg:mb-20 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading text-5xl font-bold text-port-gore md:text-7xl lg:text-8xl">{heading}</h2>
          </div>
          <p className="text-port-gore/70 md:text-lg">{description}</p>
        </div>
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-3 md:gap-x-8 lg:gap-x-12">
          {sections.map((section, index) => (
            <div key={index} className="flex gap-6">
              <div className="flex-none text-cardinal">
                {section.icon}
              </div>
              <div>
                <h3 className="font-heading mb-5 text-2xl font-bold text-port-gore md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                  {section.heading}
                </h3>
                <p className="text-port-gore/70">{section.description}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-12 flex items-center gap-4 md:mt-18 lg:mt-20">
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
    </section>
  );
};

export const Layout247Defaults = {
  tagline: "E-commerce Development",
  heading: "Build Your Online Store",
  description:
    "Create powerful, scalable e-commerce solutions that drive sales and growth. Our comprehensive platforms combine stunning design with robust functionality to deliver exceptional shopping experiences.",
  sections: [
    {
      icon: <ShoppingCart className="size-8 text-cardinal" />,
      heading: "Shopping Experience",
      description:
        "Intuitive and seamless shopping experiences with advanced product filtering, search, and recommendations.",
    },
    {
      icon: <CreditCard className="size-8 text-cardinal" />,
      heading: "Secure Payments",
      description:
        "Multiple payment gateways integration with robust security measures to protect customer transactions.",
    },
    {
      icon: <Package className="size-8 text-cardinal" />,
      heading: "Inventory Management",
      description:
        "Advanced inventory tracking and management systems to streamline your operations efficiently.",
    },
  ],
  buttons: [
    { 
      title: "Start Your Store", 
      variant: "primary" 
    },
    {
      title: "Learn More",
      variant: "link",
      size: "link",
    },
  ],
};
