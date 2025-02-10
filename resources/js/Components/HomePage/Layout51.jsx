import React from 'react';
import { Link } from "@inertiajs/react";
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
                <Link 
                  key={index} 
                  href={button.href}
                  className={
                    button.variant === "secondary-alt" 
                      ? "bg-cardinal text-white hover:bg-white/90 hover:shadow-md hover:text-port-gore rounded-full font-sans px-6 py-3"
                      : "text-white hover:text-cardinal group flex items-center gap-2 font-sans"
                  }
                >
                  {button.title}
                  {button.variant === "link-alt" && (
                    <ArrowRight className="h-4 w-4 transform transition-transform group-hover:translate-x-1" />
                  )}
                </Link>
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
  tagline: "Development Expertise",
  heading: "Modern Solutions",
  description:
    "We leverage modern development practices and proven technologies to build scalable, secure, and maintainable software solutions.",
  subHeadings: [
    {
      title: "Custom Development",
      description:
        "Building tailored solutions using modern frameworks and architectures to meet your specific business requirements.",
    },
    {
      title: "Web Applications",
      description:
        "Creating responsive and performant web applications that deliver exceptional user experiences across all devices.",
    },
    {
      title: "Quality Assurance",
      description:
        "Implementing comprehensive testing strategies and automated quality checks to ensure reliable software delivery.",
    },
    {
      title: "Technical Excellence",
      description:
        "Following industry best practices and design patterns to create maintainable and scalable code bases.",
    },
  ],
  buttons: [
    { 
      title: "View Our Work", 
      variant: "secondary-alt",
      href: route('solutions'),
    },
    {
      title: "Learn More",
      variant: "link-alt",
      href: route('solutions.custom'),
    },
  ],
};
