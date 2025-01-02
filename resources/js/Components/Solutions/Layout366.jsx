import React from 'react';
import { Button } from "@relume_io/relume-ui";
import { ArrowRight, BarChart2, Users, MessageSquare } from 'lucide-react';

export const Layout366 = (props) => {
  const { tagline, heading, description, cardsSmall, cardBig } = {
    ...Layout366Defaults,
    ...props,
  };
  return (
    <section id="relume" className="bg-athens-gray px-[5%] py-16 md:py-24 lg:py-28">
      <div className="container">
        <div className="mb-12 md:mb-18 lg:mb-20">
          <div className="mx-auto max-w-lg text-center">
            <p className="mb-3 font-semibold text-cardinal md:mb-4">{tagline}</p>
            <h2 className="font-heading mb-5 text-5xl font-bold text-port-gore md:mb-6 md:text-7xl lg:text-8xl">
              {heading}
            </h2>
            <p className="text-port-gore/70 md:text-lg">{description}</p>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:gap-8">
          <div className="grid grid-cols-1 gap-6 md:gap-8 lg:grid-cols-2">
            <div className="order-first flex flex-col items-stretch rounded-2xl border border-cardinal/20 bg-white shadow-lg lg:order-none lg:col-start-1 lg:col-end-2 lg:row-start-1 lg:row-end-3">
              <div>
                <img
                  src={cardBig.image.src}
                  alt={cardBig.image.alt}
                  className="w-full rounded-t-2xl object-cover"
                />
              </div>
              <div className="block flex-1 flex-col items-stretch justify-center p-6 md:flex md:p-8 lg:p-12">
                <div>
                  <p className="mb-2 font-semibold text-cardinal">{cardBig.tagline}</p>
                  <h3 className="font-heading mb-5 text-4xl font-bold leading-[1.2] text-port-gore md:mb-6 md:text-5xl lg:text-6xl">
                    {cardBig.heading}
                  </h3>
                  <p className="text-port-gore/70">{cardBig.description}</p>
                </div>
                <div className="mt-6 flex items-center gap-4 md:mt-8">
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
            </div>
            {cardsSmall.map((card, index) => (
              <div
                key={index}
                className="order-last flex flex-col overflow-hidden rounded-2xl border border-cardinal/20 bg-white shadow-lg md:grid md:grid-cols-2 lg:order-none"
              >
                <div className="flex w-full items-center justify-center bg-port-gore/5 p-8">
                  {card.icon}
                </div>
                <div className="block flex-col justify-center p-6 md:flex">
                  <div>
                    <p className="mb-2 font-semibold text-cardinal">{card.tagline}</p>
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export const Layout366Defaults = {
  tagline: "HubSpot Development",
  heading: "Power Your Growth",
  description: "Transform your marketing and sales with advanced HubSpot integrations. Our solutions help you automate, analyze, and optimize your customer journey.",
  cardsSmall: [
    {
      tagline: "Marketing Hub",
      icon: <BarChart2 className="size-8 text-cardinal" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "Marketing Automation",
      },
      heading: "Marketing Automation",
      description:
        "Streamline your marketing efforts with powerful automation tools and analytics.",
      button: {
        title: "Explore Marketing Solutions",
        variant: "link",
        size: "link",
      },
    },
    {
      tagline: "Sales Hub",
      icon: <Users className="size-8 text-cardinal" />,
      image: {
        src: "/images/placeholder.svg",
        alt: "Sales Enablement",
      },
      heading: "Sales Enablement",
      description:
        "Empower your sales team with tools and insights to close more deals efficiently.",
      button: {
        title: "Discover Sales Tools",
        variant: "link",
        size: "link",
      },
    },
  ],
  cardBig: {
    tagline: "Service Hub",
    image: {
      src: "/images/placeholder.svg",
      alt: "Customer Service Excellence",
    },
    heading: "Customer Service Excellence",
    description:
      "Deliver exceptional customer service with integrated help desk, knowledge base, and customer feedback tools. Build lasting relationships with automated yet personal support.",
    buttons: [
      { 
        title: "Get Started", 
        variant: "primary" 
      },
      {
        title: "View Features",
        variant: "link",
        size: "link",
      },
    ],
  },
};
