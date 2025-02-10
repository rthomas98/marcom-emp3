import React from 'react';
import { ArrowRight } from 'lucide-react';

export const Layout6 = ({ 
  heading = "Expert Software Development Solutions",
  description = "Transform your ideas into powerful digital solutions with our expert development team. We deliver custom software that drives business growth and enhances user experience.",
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
      title: "Custom Development",
      description:
        "Tailored software solutions built with modern technologies to meet your unique business requirements.",
    },
    {
      title: "E-commerce Solutions",
      description:
        "Scalable online stores and marketplaces that deliver exceptional shopping experiences.",
    },
    {
      title: "Web Applications",
      description:
        "Responsive and performant web applications that work seamlessly across all devices.",
    },
    {
      title: "Technical Consulting",
      description:
        "Expert guidance on architecture, technology stack, and development best practices.",
    },
  ],
  image: {
    src: "/images/emp/rob_thomas23_African_American_developers_working_in_meetings_st_67cd8699-d588-4e33-901a-4b41eb725a0c.png",
    alt: "Development team collaborating on software project",
  },
};
