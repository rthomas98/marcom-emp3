import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Rocket, Target, Clock, LineChart } from 'lucide-react';

export const Layout16 = (props) => {
  const { tagline, heading, description, features, buttons, image } = {
    ...Layout16Defaults,
    ...props,
  };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h1 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">{heading}</h1>
            <p className="mb-5 text-port-gore/70 md:mb-6 md:text-lg">{description}</p>
            <ul className="grid grid-cols-1 gap-6 py-2">
              {features.map((feature, index) => (
                <li key={index} className="flex items-start">
                  <div className="mr-4 flex-none text-cardinal">
                    {feature.icon}
                  </div>
                  <span className="text-port-gore/70">{feature.paragraph}</span>
                </li>
              ))}
            </ul>
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

export const Layout16Defaults = {
  tagline: "MVP Development",
  heading: "Validate Your Ideas Fast",
  description:
    "Transform your business concept into a working prototype quickly and efficiently. Our MVP development approach helps you test market fit and iterate based on real user feedback.",
  features: [
    {
      icon: <Rocket className="size-8" />,
      paragraph: "Rapid development and deployment to get your product to market quickly.",
    },
    {
      icon: <Target className="size-8" />,
      paragraph: "Focus on core features that deliver maximum value to your users.",
    },
    {
      icon: <Clock className="size-8" />,
      paragraph: "Iterative development cycles for continuous improvement and refinement.",
    },
    {
      icon: <LineChart className="size-8" />,
      paragraph: "Data-driven decisions based on real user feedback and analytics.",
    },
  ],
  buttons: [
    { 
      title: "Start Your MVP", 
      variant: "primary" 
    },
    {
      title: "Learn More",
      variant: "link",
      size: "link",
    },
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "MVP Development Process",
  },
};
