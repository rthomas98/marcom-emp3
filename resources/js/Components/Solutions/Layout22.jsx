import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Smartphone, Tablet, Laptop, CheckCircle2 } from 'lucide-react';

export const Layout22 = (props) => {
  const { heading, description, buttons, image, features } = {
    ...Layout22Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <div className="mb-5 flex items-center gap-4 md:mb-6">
              <div className="flex items-center gap-2">
                <Tablet className="size-8 text-cardinal" />
                <Laptop className="size-8 text-cardinal" />
              </div>
            </div>
            <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="text-port-gore/70 md:text-lg">{description}</p>
            <div className="mt-8 grid grid-cols-1 gap-4">
              {features.map((feature, index) => (
                <div key={index} className="flex items-center gap-3 text-port-gore/70">
                  <CheckCircle2 className="size-8 text-cardinal" />
                  <span>{feature.text}</span>
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
            <img 
              src={image.src} 
              className="w-full rounded-2xl object-cover shadow-lg" 
              alt={image.alt} 
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout22Defaults = {
  heading: "Cross-Platform Mobile Apps",
  description:
    "Build powerful mobile applications that run natively on both iOS and Android platforms. React Native delivers the perfect blend of development efficiency and native performance.",
  features: [
    {
      text: "Single codebase for iOS and Android",
    },
    {
      text: "Native performance and user experience",
    },
    {
      text: "Access to platform-specific features",
    },
    {
      text: "Faster development and deployment",
    },
  ],
  buttons: [
    { 
      title: "Start Your App", 
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
    alt: "React Native Development",
  },
};
