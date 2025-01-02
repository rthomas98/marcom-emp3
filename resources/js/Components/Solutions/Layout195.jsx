import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Smartphone, Wifi, Zap } from 'lucide-react';

export const Layout195 = (props) => {
  const { tagline, heading, description, buttons, image, subHeadings } = {
    ...Layout195Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="grid grid-cols-1 items-center gap-12 md:grid-cols-2 lg:gap-x-20">
          <div className="order-2 md:order-1">
            <img 
              src={image.src} 
              className="w-full rounded-2xl object-cover shadow-lg" 
              alt={image.alt} 
            />
          </div>
          <div className="order-1 md:order-2">
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
            <p className="mb-6 text-port-gore/70 md:mb-8 md:text-lg">{description}</p>
            <div className="grid grid-cols-1 gap-6 py-2 sm:grid-cols-2">
              {subHeadings.map((subHeading, index) => (
                <div key={index}>
                  <div className="mb-3 text-cardinal">
                    {subHeading.icon}
                  </div>
                  <h6 className="font-heading mb-3 text-md font-bold leading-[1.4] text-port-gore md:mb-4 md:text-xl">
                    {subHeading.title}
                  </h6>
                  <p className="text-port-gore/70">{subHeading.description}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 flex flex-wrap gap-4 md:mt-8">
              {buttons.map((button, index) => (
                <Button 
                  key={index} 
                  {...button}
                  className={
                    button.variant === "primary" 
                      ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full"
                      : "text-cardinal hover:text-cardinal/80 flex items-center gap-2"
                  }
                >
                  {button.title}
                  {button.variant !== "primary" && <ArrowRight className="size-5" />}
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout195Defaults = {
  tagline: "Progressive Web Apps",
  heading: "Native App Experience",
  description:
    "Build high-performance web applications that deliver a native app experience. Our PWAs work offline, load instantly, and can be installed on any device.",
  buttons: [
    { 
      title: "Start Your PWA", 
      variant: "primary" 
    },
    {
      title: "View Features",
      variant: "link",
      size: "link",
    },
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "Progressive Web App Features",
  },
  subHeadings: [
    {
      icon: <Smartphone className="size-8" />,
      title: "Cross-Platform",
      description:
        "Works seamlessly across all devices and platforms with a single codebase.",
    },
    {
      icon: <Wifi className="size-8" />,
      title: "Offline First",
      description:
        "Full functionality even without internet connection using service workers.",
    },
    {
      icon: <Zap className="size-8" />,
      title: "Lightning Fast",
      description:
        "Optimized performance with instant loading and smooth interactions.",
    },
  ],
};
