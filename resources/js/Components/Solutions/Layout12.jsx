import React from 'react';
import { Database, Server, Shield, Code2 } from 'lucide-react';

export const Layout12 = (props) => {
  const { heading, description, image, subHeadings } = {
    ...Layout12Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h1 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h1>
            <p className="mb-6 text-port-gore/70 md:mb-8 md:text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mb-3 text-cardinal md:mb-4">
                    {subHeading.icon}
                  </div>
                  <h6 className="font-heading mb-3 text-md font-bold leading-[1.4] text-port-gore md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p className="text-port-gore/70">{subHeading.description}</p>
                </div>
              ))}
            </div>
          </div>
          <div>
            <img src={image.src} className="w-full rounded-2xl object-cover shadow-lg" alt={image.alt} />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout12Defaults = {
  heading: "Robust Backend Development Solutions",
  description:
    "Build scalable and secure backend systems that power your applications. Our expert team delivers high-performance solutions using modern technologies and best practices.",
  subHeadings: [
    {
      icon: <Database className="size-8 text-cardinal" />,
      title: "Database Architecture",
      description:
        "Optimized database design and implementation for efficient data management and scalability.",
    },
    {
      icon: <Server className="size-8 text-cardinal" />,
      title: "API Development",
      description:
        "RESTful and GraphQL APIs built with security and performance in mind.",
    },
    {
      icon: <Shield className="size-8 text-cardinal" />,
      title: "Security",
      description:
        "Robust security measures to protect your data and ensure compliance with standards.",
    },
    {
      icon: <Code2 className="size-8 text-cardinal" />,
      title: "Clean Architecture",
      description:
        "Well-structured code following SOLID principles and clean architecture patterns.",
    },
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "Backend Development Solutions",
  },
};
