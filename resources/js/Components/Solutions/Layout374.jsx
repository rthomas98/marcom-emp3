import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Code, Palette, Database, Rocket } from 'lucide-react';

export const Layout374 = (props) => {
  const { tagline, heading, description, cardsSmall, cardBig } = {
    ...Layout374Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">{heading}</h2>
            <p className="text-port-gore/70 md:text-lg">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:gap-8 lg:grid-cols-4">
            <div className="flex flex-col overflow-hidden rounded-2xl border border-cardinal/20 bg-white shadow-lg sm:col-span-2 sm:row-span-2">
              <div className="flex flex-1 flex-col justify-center p-6 md:p-8 lg:p-12">
                <div>
                  <div className="mb-4 text-cardinal">
                    {cardBig.icon}
                  </div>
                  <p className="mb-2 text-sm font-semibold text-cardinal">{cardBig.tagline}</p>
                  <h3 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
                    {cardBig.heading}
                  </h3>
                  <p className="text-port-gore/70">{cardBig.description}</p>
                </div>
                <div className="mt-6 flex flex-wrap items-center gap-4 md:mt-8">
                  {cardBig.buttons.map((button, index) => (
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
              <div className="flex items-center justify-center">
                <img
                  src={cardBig.image.src}
                  alt={cardBig.image.alt}
                  className="w-full object-cover"
                />
              </div>
            </div>
            {cardsSmall.map((card, index) => (
              <div key={index} className="flex flex-col overflow-hidden rounded-2xl border border-cardinal/20 bg-white shadow-lg">
                <div className="flex flex-col justify-center p-6">
                  <div>
                    <div className="mb-4 text-cardinal">
                      {card.icon}
                    </div>
                    <p className="mb-2 text-sm font-semibold text-cardinal">{card.tagline}</p>
                    <h3 className="font-heading mb-2 text-xl font-bold text-port-gore md:text-2xl">{card.heading}</h3>
                    <p className="text-port-gore/70">{card.description}</p>
                  </div>
                  <div className="mt-5 flex items-center gap-4 md:mt-6">
                    <Button 
                      {...card.button}
                      className="text-cardinal hover:text-cardinal/80 flex items-center gap-2"
                    >
                      {card.button.title}
                      <ArrowRight className="size-5" />
                    </Button>
                  </div>
                </div>
                <div className="flex items-center justify-center bg-port-gore/5 p-4">
                  <img src={card.image.src} alt={card.image.alt} className="w-full object-cover" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout374Defaults = {
  tagline: "Software Development & Design",
  heading: "End-to-End Solutions",
  description: "From concept to deployment, we deliver comprehensive software solutions that combine beautiful design with powerful functionality.",
  cardsSmall: [
    {
      tagline: "Design",
      icon: <Palette className="size-8" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "UI/UX Design",
      },
      heading: "UI/UX Design",
      description: "Create intuitive and engaging user experiences.",
      button: {
        title: "Learn More",
        variant: "link",
        size: "link",
      },
    },
    {
      tagline: "Development",
      icon: <Code className="size-8" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "Clean Code",
      },
      heading: "Clean Code",
      description: "Maintainable and scalable code architecture.",
      button: {
        title: "View Process",
        variant: "link",
        size: "link",
      },
    },
    {
      tagline: "Backend",
      icon: <Database className="size-8" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "Robust Backend",
      },
      heading: "Robust Backend",
      description: "Secure and scalable server infrastructure.",
      button: {
        title: "Explore Features",
        variant: "link",
        size: "link",
      },
    },
    {
      tagline: "Deployment",
      icon: <Rocket className="size-8" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "Fast Deployment",
      },
      heading: "Fast Deployment",
      description: "Efficient deployment and monitoring.",
      button: {
        title: "See Details",
        variant: "link",
        size: "link",
      },
    },
  ],
  cardBig: {
    tagline: "Full Stack",
    icon: <Code className="size-8" />,
    image: {
      src: "/images/placeholder.svg",
      alt: "Full Stack Development",
    },
    heading: "Complete Software Solutions",
    description:
      "Our end-to-end development process ensures seamless integration between design, frontend, and backend components, delivering exceptional software solutions.",
    buttons: [
      { 
        title: "Start Your Project", 
        variant: "primary" 
      },
      {
        title: "Learn More",
        variant: "link",
        size: "link",
      },
    ],
  },
};
