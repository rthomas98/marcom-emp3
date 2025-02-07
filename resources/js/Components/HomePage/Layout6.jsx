import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Layout6 = ({ 
  heading = "Unlock Your Business Potential",
  description = "Drive growth and engagement with our comprehensive suite of solutions designed to transform your digital presence and maximize your business impact.",
  subHeadings = Layout6Defaults.subHeadings,
  image = Layout6Defaults.image,
  ...props 
}) => {
  return (
    <section className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div>
            <h2 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
              {heading}
            </h2>
            <p className="font-sans mb-6 text-port-gore/80 md:mb-8 md:text-lg">
              {description}
            </p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div 
                  key={index}
                  className="group cursor-pointer transition-all hover:translate-y-[-2px]"
                >
                  <div className="mb-3 flex items-center gap-2">
                    <h6 className="font-heading text-md font-bold leading-[1.4] text-port-gore md:mb-0 md:text-xl">
                      {subHeading.title}
                    </h6>
                    <ArrowRight className="h-4 w-4 transform text-cardinal transition-transform group-hover:translate-x-1" />
                  </div>
                  <p className="font-sans text-port-gore/70">{subHeading.description}</p>
                </div>
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
              width="800"
              height="600"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout6Defaults = {
  subHeadings: [
    {
      title: "AI & ML Solutions",
      description:
        "Build and deploy custom AI models and foundation models tailored to your business needs.",
    },
    {
      title: "MLOps Excellence",
      description:
        "End-to-end ML infrastructure and deployment with comprehensive monitoring and scaling capabilities.",
    },
    {
      title: "Data-Driven Innovation",
      description:
        "Transform your business with AI-powered analytics and intelligent automation solutions.",
    },
    {
      title: "Full-Stack Development",
      description:
        "Create powerful web applications with modern frameworks and cloud-native architecture.",
    },
  ],
  image: {
    src: "/images/placeholder-dashboard.svg",
    alt: "AI-powered enterprise dashboard interface",
  },
};
