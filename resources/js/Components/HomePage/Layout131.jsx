import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight } from 'lucide-react';

const Section = ({ image, tagline, heading, description, buttons }) => (
  <div className="group">
    <div className="rb-6 mb-6 overflow-hidden rounded-lg md:mb-8">
      <img 
        src={image.src} 
        alt={image.alt} 
        className="w-full transform transition-transform duration-300 group-hover:scale-105"
      />
    </div>
    <p className="font-heading mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
    <h3 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
      {heading}
    </h3>
    <p className="font-sans text-port-gore/70 mt-5 md:mt-6">{description}</p>
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
);

export const Layout131 = ({ sections = Layout131Defaults.sections }) => {
  return (
    <section className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-start gap-y-12 md:grid-cols-2 md:gap-x-8 md:gap-y-16 lg:gap-16">
          {sections.map((section, index) => (
            <Section key={index} {...section} />
          ))}
        </div>
      </div>
    </section>
  );
};

export const Layout131Defaults = {
  sections: [
    {
      image: {
        src: "/images/placeholder-remote.svg",
        alt: "Global team collaboration illustration",
      },
      tagline: "Remote-First Culture",
      heading: "Global Talent Network",
      description:
        "Our distributed team structure enables us to bring together the best talent from around the world, ensuring optimal expertise for every project while maintaining seamless collaboration and communication.",
      buttons: [
        { 
          title: "Meet Our Team", 
          variant: "primary"
        },
        {
          title: "Learn About Our Process",
          variant: "link",
          size: "link",
        },
      ],
    },
    {
      image: {
        src: "/images/placeholder-remote.svg",
        alt: "Agile delivery process illustration",
      },
      tagline: "Efficient Delivery",
      heading: "Agile Scalability",
      description:
        "Our remote-first approach allows for flexible scaling of resources and rapid deployment of solutions, adapting quickly to project needs while maintaining consistent quality and efficient delivery timelines.",
      buttons: [
        { 
          title: "View Case Studies", 
          variant: "primary"
        },
        {
          title: "Explore Methodology",
          variant: "link",
          size: "link",
        },
      ],
    },
  ],
};
