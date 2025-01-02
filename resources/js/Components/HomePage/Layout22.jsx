import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Building2 } from 'lucide-react';

export const Layout22 = ({ 
  heading = Layout22Defaults.heading,
  description = Layout22Defaults.description,
  buttons = Layout22Defaults.buttons,
  image = Layout22Defaults.image,
  ...props 
}) => {
  return (
    <section className="bg-white px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <div className="rb-5 mb-5 text-cardinal md:mb-6">
              <Building2 className="size-20 stroke-[1.5]" />
            </div>
            <h2 className="font-heading rb-5 mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="font-sans text-port-gore/70 md:text-lg">{description}</p>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button 
                  key={index} 
                  {...button}
                  className={
                    button.variant === "primary" 
                      ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full font-sans"
                      : "text-cardinal hover:text-cardinal/80 group flex items-center gap-2 font-sans"
                  }
                >
                  {button.title}
                  {button.variant === "link" && (
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 -z-10 bg-gradient-to-tr from-port-gore/5 to-cardinal/5 blur-3xl"></div>
            <img 
              src={image.src} 
              className="w-full rounded-lg object-cover shadow-lg transition-all hover:shadow-xl" 
              alt={image.alt} 
              loading="lazy"
            />
          </div>
        </div>
        <div className="mt-16 grid grid-cols-2 gap-8 md:mt-24 md:grid-cols-4 lg:gap-12">
          <img 
            src="/images/clients/warner-bros.svg" 
            alt="Warner Brothers Discovery logo" 
            className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img 
            src="/images/clients/shell.svg" 
            alt="Shell logo" 
            className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img 
            src="/images/clients/samsung.svg" 
            alt="Samsung logo" 
            className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
          <img 
            src="/images/clients/more.svg" 
            alt="More enterprise clients" 
            className="h-12 w-auto opacity-60 grayscale transition-all hover:opacity-100 hover:grayscale-0"
          />
        </div>
      </div>
    </section>
  );
};

export const Layout22Defaults = {
  heading: "Enterprise Excellence",
  description:
    "Trusted by global industry leaders for delivering transformative digital solutions. Our proven track record includes successful partnerships with Warner Brothers Discovery, Shell, Samsung, and other Fortune 500 companies.",
  buttons: [
    { 
      title: "View Success Stories", 
      variant: "primary"
    },
    {
      title: "Enterprise Solutions",
      variant: "link",
      size: "link",
    },
  ],
  image: {
    src: "/images/placeholder-enterprise.svg",
    alt: "Enterprise collaboration showcase",
  },
};
