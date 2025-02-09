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
    <section className="relative overflow-hidden bg-athens-gray px-[5%] py-24 md:py-32">
      {/* Background gradient effect */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_var(--tw-gradient-stops))] from-cardinal/5 via-transparent to-transparent"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-koromiko/5 via-transparent to-transparent"></div>

      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 gap-y-12 md:grid-flow-row md:grid-cols-2 md:items-center md:gap-x-12 lg:gap-x-20">
          <div className="relative">
            {/* Content */}
            <div className="relative z-10">
              <h2 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
                {heading}
              </h2>
              <p className="font-sans mb-8 text-lg text-port-gore/70 md:text-xl">
                {description}
              </p>
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                {subHeadings.map((subHeading, index) => (
                  <div 
                    key={index}
                    className="group relative"
                  >
                    <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-cardinal/20 to-koromiko/20 opacity-0 blur transition duration-300 group-hover:opacity-100"></div>
                    <div className="relative rounded-lg bg-white p-6 shadow-sm transition-all duration-300 group-hover:shadow-md">
                      <div className="mb-4 flex items-center gap-2">
                        <h6 className="font-heading text-xl font-bold text-port-gore">
                          {subHeading.title}
                        </h6>
                        <ArrowRight className="h-5 w-5 transform text-cardinal transition-transform group-hover:translate-x-1" />
                      </div>
                      <p className="font-sans text-port-gore/70">{subHeading.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            {/* Image container with floating effect */}
            <div className="relative">
              {/* Background blur effects */}
              <div className="absolute -inset-4 rounded-[2rem] bg-gradient-to-r from-cardinal/10 to-koromiko/10 blur-2xl"></div>
              
              {/* Main image */}
              <div className="relative rounded-[2rem] bg-white p-2 shadow-xl">
                <img 
                  src={image.src} 
                  className="w-full rounded-[1.75rem] object-cover shadow-sm transition-all" 
                  alt={image.alt}
                  loading="lazy" 
                  width="800"
                  height="600"
                />
              </div>

              {/* Floating decorative elements */}
              <div className="absolute -top-6 -right-6 h-24 w-24 animate-float rounded-full bg-gradient-to-br from-cardinal/20 to-cardinal/5 blur-xl"></div>
              <div className="absolute -bottom-8 -left-8 h-32 w-32 animate-float-delay rounded-full bg-gradient-to-br from-koromiko/20 to-koromiko/5 blur-xl"></div>
            </div>
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
