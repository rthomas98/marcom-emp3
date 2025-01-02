import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight } from 'lucide-react';

export const Layout51 = ({ 
  heading = Layout51Defaults.heading,
  description = Layout51Defaults.description,
  subHeadings = Layout51Defaults.subHeadings,
  tagline = Layout51Defaults.tagline,
  buttons = Layout51Defaults.buttons,
  ...props 
}) => {
  return (
    <section className="relative bg-port-gore px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 md:gap-x-12 md:gap-y-8 lg:gap-x-20">
          <div>
            <p className="font-heading mb-3 font-semibold text-white md:mb-4">{tagline}</p>
            <h2 className="font-heading text-5xl font-bold text-white md:text-7xl lg:text-8xl">
              {heading}
            </h2>
          </div>
          <div>
            <p className="font-sans mb-6 text-white/90 md:mb-8 md:text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2 sm:gap-y-8">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <h6 className="font-heading mb-3 text-md font-bold leading-[1.4] text-white md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p className="font-sans text-white/80">{subHeading.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button 
                  key={index} 
                  {...button}
                  className={
                    button.variant === "secondary-alt" 
                      ? "bg-white text-port-gore hover:bg-white/90 hover:shadow-md rounded-full font-sans"
                      : "text-white hover:text-white/80 group flex items-center gap-2 font-sans"
                  }
                >
                  {button.title}
                  {button.variant === "link-alt" && (
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  )}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-port-gore to-port-gore/90" />
      </div>
    </section>
  );
};

export const Layout51Defaults = {
  tagline: "Innovation Focus",
  heading: "Modern Tech Stack",
  description:
    "Embracing cutting-edge technologies and development practices to deliver innovative solutions that keep you ahead of the curve.",
  subHeadings: [
    {
      title: "Cloud-Native Architecture",
      description:
        "Building scalable, resilient applications using microservices, containerization, and serverless computing for optimal performance.",
    },
    {
      title: "AI Integration",
      description:
        "Leveraging machine learning and artificial intelligence to create intelligent solutions that automate processes and enhance decision-making.",
    },
    {
      title: "DevOps Excellence",
      description:
        "Implementing robust CI/CD pipelines, infrastructure as code, and automated testing for rapid, reliable deployments.",
    },
    {
      title: "Emerging Technologies",
      description:
        "Staying at the forefront of technology trends, from blockchain to edge computing, to deliver innovative solutions.",
    },
  ],
  buttons: [
    { 
      title: "Explore Technologies", 
      variant: "secondary-alt"
    },
    {
      title: "View Case Studies",
      variant: "link-alt",
      size: "link",
    },
  ],
};
