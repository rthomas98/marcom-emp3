import React from 'react';
import { Link } from "@inertiajs/react";
import { ArrowRight } from 'lucide-react';

const Section = ({ image, tagline, heading, description, buttons }) => (
  <div className="group">
    <div className="rb-6 mb-6 overflow-hidden rounded-lg md:mb-8">
      <div className="aspect-[16/9] w-full">
        <img 
          src={image.src} 
          alt={image.alt} 
          className="h-full w-full object-cover transform transition-transform duration-300 group-hover:scale-105"
        />
      </div>
    </div>
    <p className="font-heading mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
    <h3 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
      {heading}
    </h3>
    <p className="font-sans text-port-gore/70 mt-5 md:mt-6">{description}</p>
    <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
      {buttons.map((button, index) => (
        <Link 
          key={index} 
          href={button.href}
          className={
            button.variant === "primary" 
              ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full font-sans px-6 py-3"
              : "text-cardinal hover:text-cardinal/80 group flex items-center gap-2 font-sans"
          }
        >
          {button.title}
          {button.variant === "link" && (
            <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
          )}
        </Link>
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
        src: "/images/emp/rob_thomas23_African_American_Designers_and_developers_collabor_074e0918-602f-489f-a994-549f9d1f62fa.png",
        alt: "Global team collaboration illustration",
      },
      tagline: "Remote-First Culture",
      heading: "Global Talent Network",
      description:
        "Our distributed team structure enables us to bring together the best talent from around the world, ensuring optimal expertise for every project while maintaining seamless collaboration and communication.",
      buttons: [
        { 
          title: "Meet Our Team", 
          variant: "primary",
          href: route('solutions'),
        },
        {
          title: "Learn About Our Process",
          variant: "link",
          href: route('solutions.custom'),
        },
      ],
    },
    {
      image: {
        src: "/images/emp/rob_thomas23_African_American_Project_Manager_Makes_a_Presentat_2d8255b5-eb2b-4d1c-b57d-58077e6d9d44.png",
        alt: "Agile delivery process illustration",
      },
      tagline: "Efficient Delivery",
      heading: "Agile Scalability",
      description:
        "Our remote-first approach allows for flexible scaling of resources and rapid deployment of solutions, adapting quickly to project needs while maintaining consistent quality and efficient delivery timelines.",
      buttons: [
        { 
          title: "View Case Studies", 
          variant: "primary",
          href: route('solutions.custom'),
        },
        {
          title: "Explore Methodology",
          variant: "link",
          href: route('solutions.fullstack'),
        },
      ],
    },
  ],
};
