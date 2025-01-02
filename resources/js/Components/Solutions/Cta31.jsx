import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, Calendar, Mail } from 'lucide-react';

export const Cta31 = (props) => {
  const { heading, description, buttons, image } = {
    ...Cta31Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-port-gore px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container flex flex-col items-center">
        <div className="mb-12 max-w-lg text-center md:mb-18 lg:mb-20">
          <h2 className="font-heading mb-5 text-5xl font-bold text-white md:mb-6 md:text-7xl lg:text-8xl">
            {heading}
          </h2>
          <p className="text-white/70 md:text-lg">{description}</p>
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 md:mt-8">
            {buttons.map((button, index) => (
              <Button 
                key={index} 
                {...button}
                className={
                  button.variant === "primary" 
                    ? "bg-cardinal text-white hover:bg-cardinal/90 hover:shadow-md rounded-full"
                    : "bg-white/10 text-white hover:bg-white/20 hover:shadow-md rounded-full backdrop-blur-sm"
                }
              >
                {button.icon}
                {button.title}
              </Button>
            ))}
          </div>
        </div>
        <img 
          src={image.src} 
          className="w-full max-w-4xl rounded-2xl object-cover shadow-lg" 
          alt={image.alt} 
        />
      </div>
    </section>
  );
};

export const Cta31Defaults = {
  heading: "Let's Build Something Amazing",
  description:
    "Ready to transform your ideas into reality? Schedule a consultation with our experts or reach out to discuss your project needs.",
  buttons: [
    { 
      title: "Schedule Consultation",
      variant: "primary",
      icon: <Calendar className="size-5 mr-2" />
    }, 
    { 
      title: "Contact Us",
      variant: "secondary",
      icon: <Mail className="size-5 mr-2" />
    }
  ],
  image: {
    src: "/images/placeholder.svg",
    alt: "Team Collaboration",
  },
};
