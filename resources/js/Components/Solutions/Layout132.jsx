import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Laptop, Layout } from 'lucide-react';

export const Layout132 = (props) => {
  const { sections } = { ...Layout132Defaults, ...props };
  return (
    <section id="relume" className="px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:gap-16">
          {sections.map((section, index) => (
            <div key={index} className="group">
              <div className="rb-6 mb-6 overflow-hidden rounded-2xl md:mb-8">
                <img 
                  src={section.image.src} 
                  alt={section.image.alt}
                  className="w-full transition-transform duration-300 group-hover:scale-105" 
                />
              </div>
              <div className="mb-4 text-cardinal">
                {section.icon}
              </div>
              <h3 className="font-heading mb-5 text-2xl font-bold text-port-gore md:mb-6 md:text-3xl md:leading-[1.3] lg:text-4xl">
                {section.heading}
              </h3>
              <p className="mt-5 text-port-gore/70 md:mt-6">{section.description}</p>
              <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                <Button 
                  {...section.button}
                  className="text-cardinal hover:text-cardinal/80 flex items-center gap-2"
                >
                  {section.button.title}
                  <ArrowRight className="size-5" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout132Defaults = {
  sections: [
    {
      image: {
        src: "/images/placeholder.svg",
        alt: "Responsive Web Development",
      },
      icon: <Laptop className="size-8 text-cardinal" />,
      heading: "Responsive Web Applications",
      description:
        "Create seamless user experiences across all devices with our responsive web development expertise. We build intuitive interfaces that adapt perfectly to any screen size.",
      button: {
        title: "Learn More",
        variant: "link",
        size: "link",
      },
    },
    {
      image: {
        src: "/images/placeholder.svg",
        alt: "Modern UI Development",
      },
      icon: <Layout className="size-8 text-cardinal" />,
      heading: "Modern UI Development",
      description:
        "Leverage the latest frontend technologies and frameworks to create stunning, high-performance user interfaces that engage and delight your users.",
      button: {
        title: "Learn More",
        variant: "link",
        size: "link",
      },
    },
  ],
};
