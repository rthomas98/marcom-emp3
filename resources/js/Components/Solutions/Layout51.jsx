import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Code2, Blocks, Workflow, Lightbulb } from 'lucide-react';

export const Layout51 = (props) => {
  const { heading, description, subHeadings, tagline, buttons } = {
    ...Layout51Defaults,
    ...props,
  };
  return (
    <section id="relume" className="relative bg-port-gore px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container relative z-10">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div>
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading text-5xl font-bold text-white md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          </div>
          <div>
            <p className="mb-6 text-white/80 md:mb-8 md:text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 sm:gap-y-8">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mb-3 text-cardinal">
                    {subHeading.icon}
                  </div>
                  <h6 className="font-heading mb-3 text-md font-bold leading-[1.4] text-white md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p className="text-white/70">{subHeading.description}</p>
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
                      : "bg-white/10 text-white hover:bg-white/20 hover:shadow-md rounded-full backdrop-blur-sm"
                  }
                >
                  {button.title}
                  <ArrowRight className="size-5" />
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout51Defaults = {
  tagline: "Custom Software Development",
  heading: "Tailored Solutions for Your Business",
  description:
    "Transform your business challenges into opportunities with our custom software development services. We create bespoke solutions that perfectly align with your unique requirements and goals.",
  subHeadings: [
    {
      icon: <Code2 className="size-8 text-cardinal" />,
      title: "Custom Development",
      description:
        "Bespoke software solutions designed and built specifically for your business needs.",
    },
    {
      icon: <Blocks className="size-8 text-cardinal" />,
      title: "Scalable Architecture",
      description:
        "Future-proof solutions that grow with your business and adapt to changing requirements.",
    },
    {
      icon: <Workflow className="size-8 text-cardinal" />,
      title: "Agile Process",
      description:
        "Iterative development with regular feedback and adjustments to ensure optimal results.",
    },
    {
      icon: <Lightbulb className="size-8 text-cardinal" />,
      title: "Innovation Focus",
      description:
        "Cutting-edge technologies and innovative approaches to solve complex challenges.",
    },
  ],
  buttons: [
    { 
      title: "Start Your Project",
      variant: "primary"
    },
    { 
      title: "Learn More",
      variant: "secondary"
    }
  ]
};
